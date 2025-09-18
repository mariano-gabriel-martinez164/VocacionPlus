using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;

namespace VocacionPlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValoracionController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ValoracionController(AppDbContext context)
        {
            _context = context;
        }

        // POST: /valoracion/
        [HttpPost]
        public IActionResult CrearValoracion([FromBody] object valoracion) { return Ok(); }

        // GET: /valoracion/{facultad_id}/
        [HttpGet("facultad/{facultad_id}")]
        public IActionResult ObtenerValoracionFacultad(int facultad_id) { return Ok(); }

        // GET: /valoracion/{valoracion_id}/
        [HttpGet("{valoracion_id}")]
        public IActionResult ObtenerValoracion(int valoracion_id) { return Ok(); }

        // GET: /valoracion/curso/{curso_id}/
        [HttpGet("curso/{curso_id}")]
        public IActionResult ObtenerValoracionCurso(int curso_id) { return Ok(); }

        // GET: /valoracion/carrera/{carrera_id}/
        [HttpGet("carrera/{carrera_id}")]
        public IActionResult ObtenerValoracionCarrera(int carrera_id) { return Ok(); }

        // DELETE: /valoracion/{valoracion_id}/
        [HttpDelete("{valoracion_id}")]
        public IActionResult OcultarComentario(int valoracion_id) { return Ok(); }

        // DELETE: /valoracion/
        [HttpDelete]
        public IActionResult OcultarVariosComentarios([FromBody] object valoraciones) { return Ok(); }
    }
}
