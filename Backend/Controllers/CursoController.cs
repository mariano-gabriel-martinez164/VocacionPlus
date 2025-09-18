using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;

namespace VocacionPlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CursoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CursoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /curso/
        [HttpGet]
        public IActionResult GetCursos() { return Ok(); }

        // GET: /curso/{curso_id}/
        [HttpGet("{curso_id}")]
        public IActionResult GetCurso(int curso_id) { return Ok(); }

        // GET: /curso/nombre/{nombre}/
        [HttpGet("nombre/{nombre}")]
        public IActionResult BuscarCursoPorNombre(string nombre) { return Ok(); }

        // POST: /curso/
        [HttpPost]
        public IActionResult CrearCurso([FromBody] object curso) { return Ok(); }

        // PUT: /curso/{curso_id}/
        [HttpPut("{curso_id}")]
        public IActionResult EditarCurso(int curso_id, [FromBody] object curso) { return Ok(); }

        // DELETE: /curso/{curso_id}/
        [HttpDelete("{curso_id}")]
        public IActionResult EliminarCurso(int curso_id) { return Ok(); }
    }
}
