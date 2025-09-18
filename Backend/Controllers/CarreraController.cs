using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;

namespace VocacionPlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CarreraController : ControllerBase
    {
        private readonly AppDbContext _context;
        public CarreraController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /carrera/
        [HttpGet]
        public IActionResult GetCarreras() { return Ok(); }

        // GET: /carrera/{carrera_id}/
        [HttpGet("{carrera_id}")]
        public IActionResult GetCarrera(int carrera_id) { return Ok(); }

        // GET: /carrera/nombre/{nombre}/
        [HttpGet("nombre/{nombre}")]
        public IActionResult GetCarreraPorNombre(string nombre) { return Ok(); }

        // GET: /carrera/facultad/{facultad_id}/
        [HttpGet("facultad/{facultad_id}")]
        public IActionResult GetCarrerasPorFacultad(int facultad_id) { return Ok(); }

        // POST: /carrera/
        [HttpPost]
        public IActionResult CrearCarrera([FromBody] object carrera) { return Ok(); }

        // PUT: /carrera/{carrera_id}/
        [HttpPut("{carrera_id}")]
        public IActionResult EditarCarrera(int carrera_id, [FromBody] object carrera) { return Ok(); }

        // DELETE: /carrera/{carrera_id}/
        [HttpDelete("{carrera_id}")]
        public IActionResult EliminarCarrera(int carrera_id) { return Ok(); }
    }
}
