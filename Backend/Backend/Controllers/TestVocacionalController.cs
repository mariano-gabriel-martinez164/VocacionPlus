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
        public IActionResult CrearTest([FromBody] object test) { return Ok(); }

        // GET: /testVocacional/{usuario_id}/
        [HttpGet("{usuario_id}")]
        public IActionResult ObtenerTestUsuario(int usuario_id) { return Ok(); }

        // DELETE: /testVocacional/
        [HttpDelete]
        public IActionResult BorrarTest([FromBody] object test) { return Ok(); }
    }
}
