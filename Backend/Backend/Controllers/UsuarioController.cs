using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;

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
        public async Task<IActionResult> RegistrarUsuario([FromBody] Usuario usuario)
        {
            _context.usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUsuario), new {id = usuario.Id}, usuario);
        }

        // PUT: /usuario/{usuario_id}/clave/
        [HttpPut("{usuario_id}/clave")]
        public IActionResult CambiarClave(int usuario_id, [FromBody] object datos) { return Ok(); }

        // PUT: /usuario/
        [HttpPut]
        public IActionResult CambiarDatosUsuario([FromBody] object datos) { return Ok(); }
        //GET: /usuario/{}
        [HttpGet]
        public async Task<IActionResult> GetUsuario
        // GET: /usuario/{nombre}/
        [HttpGet("{nombre}")]
        public IActionResult BuscarUsuarioPorNombre(string nombre) { return Ok(); }

        // GET: /usuario/iniciar-sesion/
        [HttpGet("iniciar-sesion")]
        public IActionResult IniciarSesion() { return Ok(); }

        // GET: /usuario/cerrar-sesion/
        [HttpGet("cerrar-sesion")]
        public IActionResult CerrarSesion() { return Ok(); }
    }
}
