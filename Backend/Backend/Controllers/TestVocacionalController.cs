using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;

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
        public async Task<IActionResult> CreateTest([FromBody] TestVocacional test)
        {
            var tags = new List<Tag>();
            if (test.Realista >= 5)
            {
                var tag = await _context.tags.FirstOrDefaultAsync(t => t.Nombre == "Matematicas");
                if (tag != null) tags.Add(tag);
            }
            if (test.Investigador >= 5)
            {
                var tag = await _context.tags.FirstOrDefaultAsync(t => t.Nombre == "ciencia");
                if (tag != null) tags.Add(tag);
            }
            if (test.Artistico >= 5)
            {
                var tag = await _context.tags.FirstOrDefaultAsync(t => t.Nombre == "Creativo");
                if (tag != null) tags.Add(tag);
            }
            if (test.Social >= 5)
            {
                var tag = await _context.tags.FirstOrDefaultAsync(t => t.Nombre == "Sociales");
                if (tag != null) tags.Add(tag);
            }
             if (test.Emprendedor >= 5)
            {
                var tag = await _context.tags.FirstOrDefaultAsync(t => t.Nombre == "Empresa");
                if (tag != null) tags.Add(tag);
            }
             if (test.Convencional >= 5)
            {
                var tag = await _context.tags.FirstOrDefaultAsync(t => t.Nombre == "ingenieria industrial");
                if (tag != null) tags.Add(tag);
            }
            test.Tags = tags;
            _context.testVocacionales.Add(test);
            
            if (test.Tags.Count > 0 && test.Tags != null)
            {
                await _context.SaveChangesAsync();
            }
            else
            {
                return BadRequest("error de tags");
            }
            return CreatedAtAction(nameof(GetTest), new { id = test.Id }, test);
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
