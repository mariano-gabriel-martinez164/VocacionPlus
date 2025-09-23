using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;
using System.IO.Compression;

namespace VocacionPlus.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TagController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TagController(AppDbContext context)
        {
            _context = context;
        }

        //post: /tag
        [HttpPost]
        public async Task<IActionResult> CreateTag([FromBody] Tag tag)
        {
            _context.tags.Add(tag);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTag), new { id = tag.Id }, tag);
        }

        //vincular un tag con una carrera
        [HttpPost("{carreraId}/tags/{tagId}")]
        public async Task<IActionResult> AddTagToCarrera(int carreraId, int tagId)
        {
            var carrera = await _context.carreras
            .Include(c => c.Tags)
            .FirstOrDefaultAsync(c => c.Id == carreraId);
            if (carrera == null) return NotFound();

            var tag = await _context.tags.FindAsync(tagId);
            if (tag == null) return NotFound();

            if (!carrera.Tags.Contains(tag))
            {
                carrera.Tags.Add(tag);
                await _context.SaveChangesAsync();
            }

            return NoContent();
        }
        //get /tag/
        [HttpGet]
        public async Task<IActionResult> GetTags()
        {
            var tags = await _context.tags.ToListAsync();
            return Ok(tags);
        }

        //get /tag/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTag(int id)
        {
            var tag = await _context.tags
            .Include(t => t.Carreras) //dudoso
            .FirstOrDefaultAsync(t => t.Id == id);

            if (tag == null) return NotFound();
            return Ok(tag);
        }

        // get :/tag/byCarrera/{carreraId} conseguir los tags de x carrera , por id
        [HttpGet("byCarrera/{carreraId}")]
        public async Task<IActionResult> GetTagsByCarrera(int carreraId)
        {
            var carrera = await _context.carreras
            .Include(c => c.Tags)
            .FirstOrDefaultAsync(c => c.Id == carreraId);

            if (carrera == null) return NotFound();
            return Ok(carrera.Tags);
        }

        //put
        [HttpPut("{tag_id}")]
        public async Task<IActionResult> UpdateTag(int tag_id, [FromBody] Tag tag)
        {
            if (tag_id != tag.Id) return BadRequest();
            _context.Entry(tag).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
        
        //delete
        [HttpDelete("{tag_id}")]
        public async Task<IActionResult> DeleteTag(int tag_id)
        {
            var tag = await _context.tags.FindAsync(tag_id);
            if (tag == null) return NotFound();
            _context.tags.Remove(tag);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

}