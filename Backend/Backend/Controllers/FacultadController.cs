using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;

namespace VocacionPlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FacultadController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FacultadController(AppDbContext context)
        {
            _context = context;
        }

        // GET: /facultad/
        [HttpGet]
        public async Task<IActionResult> GetFacultades(int page = 1, int pageSize = 10)
        {
            var facultades = await _context.facultades
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
            return Ok(new { facultades });
        }

        // GET: /facultad/{facultad_id}/
        [HttpGet("{facultad_id}")]
        public async Task<IActionResult> GetFacultad(int facultad_id)
        {
            var facultad = await _context.facultades.FindAsync(facultad_id);
            if (facultad == null) return NotFound();
            return Ok(facultad);
        }
        // get: /facultad/{facultad_nombre}/
        [HttpGet("buscar")]
        public async Task<IActionResult> GetFacultadByName(
            [FromQuery] string nombre,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(nombre))
                return BadRequest("debe especificar un nombre.");

            var query = _context.facultades
            .Where(f => f.Nombre.ToLower().Contains(nombre.ToLower()));

            var total = await query.CountAsync();
            var facultades = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
            
            return Ok(new
            {
                total,
                page,
                pageSize,
                results = facultades
            });
        }

        // POST: /facultad/
        [HttpPost]
        public async Task<IActionResult> CreateFacultad([FromBody] Facultad facultad)
        {
            _context.facultades.Add(facultad);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetFacultad), new { facultad_id = facultad.Id }, facultad);
        }

        // PUT: /facultad/{facultad_id}/
        [HttpPut("{facultad_id}")]
        public async Task<IActionResult> UpdateFacultad(int facultad_id, [FromBody] Facultad facultad)
        {
            if (facultad_id != facultad.Id) return BadRequest();
            _context.Entry(facultad).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: /facultad/{facultad_id}/
        [HttpDelete("{facultad_id}")]
        public async Task<IActionResult> DeleteFacultad(int facultad_id)
        {
            var facultad = await _context.facultades.FindAsync(facultad_id);
            if (facultad == null) return NotFound();
            _context.facultades.Remove(facultad);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
