using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;
using Microsoft.AspNetCore.Authorization;
using VocacionPlus.Models.DTOs; // 👈 espacio de nombres donde pondremos los DTOs

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
        public async Task<IActionResult> CreateValoracion([FromBody] CrearValoracionDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var valoracion = new Valoracion
            {
                Comentario = dto.Comentario,
                Puntuacion = dto.Puntuacion,
                AutorId = dto.AutorId,
                CarreraId = dto.CarreraId
            };

            _context.valoraciones.Add(valoracion);
            await _context.SaveChangesAsync();

            var result = new ValoracionDTO
            {
                Id = valoracion.Id,
                Comentario = valoracion.Comentario,
                Puntuacion = valoracion.Puntuacion,
                AutorId = valoracion.AutorId,
                CarreraId = valoracion.CarreraId,
                AutorNombre = (await _context.usuarios
                    .Where(u => u.Id == dto.AutorId)
                    .Select(u => u.Nombre + " " + u.Apellido)
                    .FirstOrDefaultAsync()) ?? "Desconocido"
            };

            return CreatedAtAction(nameof(GetValoracion), new { valoracion_id = valoracion.Id }, result);
        }
        // GET: /valoracion/autor/{autor_id}?page=1&pageSize=10
        [HttpGet("autor/{autor_id}")]
        public async Task<IActionResult> GetValoracionesAutor(int autor_id, int page = 1, int pageSize = 10)
        {
            var query = _context.valoraciones
                .Where(v => v.AutorId == autor_id);

            var total = await query.CountAsync();

            var valoraciones = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                total,
                page,
                pageSize,
                results = valoraciones
            });
        }

        // GET: /valoracion/{valoracion_id}
        [HttpGet("{valoracion_id}")]
        public async Task<IActionResult> GetValoracion(int valoracion_id)
        {
            var valoracion = await _context.valoraciones
                .Include(v => v.Autor)
                .FirstOrDefaultAsync(v => v.Id == valoracion_id);

            if (valoracion == null)
                return NotFound();

            var dto = new ValoracionDTO
            {
                Id = valoracion.Id,
                Comentario = valoracion.Comentario,
                Puntuacion = valoracion.Puntuacion,
                AutorId = valoracion.AutorId,
                AutorNombre = valoracion.Autor?.Nombre + " " + valoracion.Autor?.Apellido,
                CarreraId = valoracion.CarreraId
            };

            return Ok(dto);
        }

        // GET: /valoracion/carrera/{carrera_id}
        [HttpGet("carrera/{carrera_id}")]
        public async Task<IActionResult> GetValoracionesCarrera(int carrera_id, int page = 1, int pageSize = 10)
        {
            var valoraciones = await _context.valoraciones
                .Where(v => v.CarreraId == carrera_id)
                .Include(v => v.Autor)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(v => new ValoracionDTO
                {
                    Id = v.Id,
                    Comentario = v.Comentario,
                    Puntuacion = v.Puntuacion,
                    AutorId = v.AutorId,
                    AutorNombre = v.Autor.Nombre + " " + v.Autor.Apellido,
                    CarreraId = v.CarreraId
                })
                .ToListAsync();

            var total = await _context.valoraciones.CountAsync(v => v.CarreraId == carrera_id);

            return Ok(new { total, valoraciones });
        }

        //DELETE: /valoracion/{valoracion_id}
        [HttpDelete("{valoracion_id}")]
        [Authorize]
        public async Task<IActionResult> DeleteComentario(int valoracion_id)
        {
            var valoracion = await _context.valoraciones.FindAsync(valoracion_id);
            if (valoracion == null)
                return NotFound();

            var userId = User.FindFirst("sub")?.Value;

            if (User.IsInRole("Admin") || valoracion.AutorId.ToString() == userId)
            {
                _context.valoraciones.Remove(valoracion);
                await _context.SaveChangesAsync();
                return NoContent();
            }

            return Forbid();
        }
    }
}
