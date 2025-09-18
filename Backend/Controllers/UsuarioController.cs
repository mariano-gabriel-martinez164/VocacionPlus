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
        public IActionResult RegistrarUsuario([FromBody] object usuario) { return Ok(); }

        // PUT: /usuario/{usuario_id}/clave/
        [HttpPut("{usuario_id}/clave")]
        public IActionResult CambiarClave(int usuario_id, [FromBody] object datos) { return Ok(); }

        // PUT: /usuario/
        [HttpPut]
        public IActionResult CambiarDatosUsuario([FromBody] object datos) { return Ok(); }

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
