using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;
using Microsoft.AspNetCore.Identity;
using VocacionPlus.Models.DTOs;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.IdentityModel.Tokens;  
using System.IdentityModel.Tokens.Jwt; 
using System.Security.Claims;            
using System.Text;                       
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication;


namespace VocacionPlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsuarioController(AppDbContext context)
        {
            _context = context;
        }

        // POST: /usuario/
        [HttpPost]
        public async Task<IActionResult> RegistrarUsuario([FromBody] UsuarioCreateRequest dto)
        {
            if (!dto.esAdmin && dto.Test == null)
            {
               return BadRequest("el usuario normal debe incluir test");
            }

            var passwordHasher = new PasswordHasher<Usuario>();

            var usuario = new Usuario
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Mail = dto.Correo,
                Password = passwordHasher.HashPassword(null, dto.Password),
                Rol = dto.esAdmin ? TipoUsuario.Admin : TipoUsuario.Normal,
                Honor = dto.Honor ?? true
            };
            if(dto.Test != null)
            {
                usuario.TestVocacional = new TestVocacional
                {
                    Realista = dto.Test.Realista,
                    Investigador = dto.Test.Investigador,
                    Artistico = dto.Test.Artistico,
                    Social = dto.Test.Social,
                    Emprendedor = dto.Test.Emprendedor,
                    Convencional = dto.Test.Convencional
                };
            }

            _context.usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            var response = new UsuarioResponse
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Correo = usuario.Mail
            };

            return CreatedAtAction(nameof(GetUsuario), new { id = usuario.Id }, response);
        }

        // PUT: /usuario/{usuario_id}/clave/
        [HttpPut("{usuario_id}/clave")]
        public async Task<IActionResult> UpdatePassword(int usuario_id, [FromBody] ChangePasswordRequest request)
        {
            var usuario = await _context.usuarios.FindAsync(usuario_id);
            if (usuario == null) return NotFound("Usuario no encontrado");
            var passwordHasher = new PasswordHasher<Usuario>();
            var result = passwordHasher.VerifyHashedPassword(usuario, usuario.Password, request.PasswordActual);
            if (result == PasswordVerificationResult.Failed)
            {
                return BadRequest("la contraseña actual es incorrecta");
            }
            usuario.Password = passwordHasher.HashPassword(usuario, request.PasswordNueva);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: /usuario/
        [HttpPut("{id}")]
        public async Task<IActionResult> CambiarDatosUsuario(int id, [FromBody] UsuarioUpdateRequest dto)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            usuario.Nombre = dto.Nombre;
            usuario.Apellido = dto.Apellido;
            await _context.SaveChangesAsync();
            var response = new UsuarioResponse
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Correo = usuario.Mail
            };
            return Ok(response);
        }

        //put : /id/banear/
        [HttpPut("{id}/banear")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> BanearUsuario(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            usuario.Honor = false; // o cualquier otra restricción
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{id}/activar")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ActivarUsuario(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            usuario.Honor = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: /usuario/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuario(int id)
        {
            var usuario = await _context.usuarios.FindAsync(id);
            if (usuario == null) return NotFound();
            var response = new UsuarioResponse
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Correo = usuario.Mail
            };
            return Ok(response);
        }

        // GET: /usuario/buscar/
        [HttpGet("buscar")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsuarioPorNombre(
            [FromQuery] string nombre,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var usuarios = await _context.usuarios
            .Where(u => u.Nombre.ToLower().Contains(nombre.ToLower()))
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new UsuarioResponse
            {
                Id = u.Id,
                Nombre = u.Nombre,
                Apellido = u.Apellido,
                Correo = u.Mail
            })
            .ToListAsync();

            return Ok(new { usuarios });
        }

        //post /usuario/iniciar-sesion/
        [HttpPost("iniciar-sesion")]
        public async Task<IActionResult> IniciarSesion([FromBody] VocacionPlus.Models.DTOs.LoginRequest dto)
        {
            var usuario = await _context.usuarios.FirstOrDefaultAsync(u => u.Mail == dto.Correo);
            if (usuario == null) return Unauthorized("usuario o contraseña incorrecta");
            var passwordHasher = new PasswordHasher<Usuario>();
            var result = passwordHasher.VerifyHashedPassword(usuario, usuario.Password, dto.Password);
            if (result == PasswordVerificationResult.Failed) return Unauthorized("usuario o contraseña incorrecta");

            var claims = new List<Claim>
            {
                new Claim("role", usuario.Rol.ToString()),
                new Claim("nombre", usuario.Nombre)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("EstaEsUnaClaveMuySeguraDeAlMenos16Bytes"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            
            var token = new JwtSecurityToken(
                issuer: "TuApp",
                audience: "TuApp",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return Ok(new { usuario.Id, usuario.Nombre, usuario.Mail, Token = jwt});
        }

        // GET: /usuario/cerrar-sesion/
        [HttpPost("cerrar-sesion")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return NoContent();
        }
    }
}
