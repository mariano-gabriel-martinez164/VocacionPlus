using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;
using Microsoft.AspNetCore.Authorization;
using VocacionPlus.Models.DTOs;

namespace VocacionPlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestVocacionalController : ControllerBase
    {
        private readonly AppDbContext _context;
        public TestVocacionalController(AppDbContext context)
        {
            _context = context;
        }

        // POST: /testVocacional/
        [HttpPost]
        public async Task<IActionResult> CreateTest(int usuarioId, [FromBody] TestVocacionalCreateRequest dto)
        {
            var usuario = await _context.usuarios.FindAsync(usuarioId);
            if (usuario == null) return NotFound("no encontrado");
            var test = new TestVocacional
            {
                UsuarioId = usuario.Id,
                Realista = dto.Realista,
                Investigador = dto.Investigador,
                Artistico = dto.Artistico,
                Social = dto.Social,
                Emprendedor = dto.Emprendedor,
                Convencional = dto.Convencional
            };
            _context.testVocacionales.Add(test);
            await _context.SaveChangesAsync();
            var tagsRecomendados = new List<string>();
            if(test.Realista >= 6) tagsRecomendados.Add("Realista");
            if(test.Artistico >= 6) tagsRecomendados.Add("Artistico");
            if(test.Social >= 6) tagsRecomendados.Add("Social");
            if(test.Investigador >= 6) tagsRecomendados.Add("Investigador");
            if(test.Emprendedor >= 6) tagsRecomendados.Add("Emprendedor");
            if(test.Convencional >= 6) tagsRecomendados.Add("Convencional");

            return Ok(new
            {
                test.Id,
                Usuario = usuario.Nombre,
                tagsRecomendados
            });
        }

        // GET: /testVocacional/{usuario_id}/
        [HttpGet("{usuario_id}")]
        public async Task<IActionResult> GetTest(int usuario_id)
        {
            var test = await _context.testVocacionales
            .FirstOrDefaultAsync(t => t.UsuarioId == usuario_id);
            if (test == null) return NotFound();
            return Ok(test);
        }

        // DELETE: /testVocacional/
        [HttpDelete]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteTest(int test_id)
        {
            var test = await _context.testVocacionales.FindAsync(test_id);
            if (test == null) return NotFound();
            _context.testVocacionales.Remove(test);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
