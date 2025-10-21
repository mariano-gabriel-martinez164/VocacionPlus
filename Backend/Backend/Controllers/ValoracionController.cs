using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;
using Microsoft.AspNetCore.Authorization;

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
        public async Task<IActionResult> CreateValoracion([FromBody] Valoracion valoracion)
        {
            _context.valoraciones.Add(valoracion);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetValoracion), new {id = valoracion.Id}, valoracion);
        }

        // GET: /valoracion/{facultad_id}/
        [HttpGet("facultad/{facultad_id}")]
        public IActionResult GetValoracionFacultad(int facultad_id) { return Ok(); }

        // GET: /valoracion/{valoracion_id}/
        [HttpGet("{valoracion_id}")]
        public async Task<IActionResult> GetValoracion(int valoracion_id)
        {
            var valoracion = await _context.valoraciones.FindAsync(valoracion_id);
            if (valoracion == null) return NotFound();

            return Ok(valoracion);
        }

        // GET: /valoracion/carrera/{carrera_id}/
        [HttpGet("carrera/{carrera_id}")]
        public async Task<IActionResult> GetValoracionesCarrera(int carrera_id, int page = 1, int pageSize = 10)
        {
            var valoraciones = await _context.valoraciones
            .Where(v => v.CarreraId == carrera_id)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
            return Ok( new { valoraciones });
        }

        // DELETE: /valoracion/{valoracion_id}/
        [HttpDelete("{valoracion_id}")]
        public async Task<IActionResult> DeleteComentario(int valoracion_id)
        {
            var valoracion = await _context.valoraciones.FindAsync(valoracion_id);
            if (valoracion == null) return NotFound();
            var userId = User.FindFirst("sub")?.Value;

            if (User.IsInRole("Admin"))
            {
                _context.valoraciones.Remove(valoracion);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            if (valoracion.AutorId.ToString() == userId)
            {
                _context.valoraciones.Remove(valoracion);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            return Forbid();
        }
    }
}
