using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using VocacionPlus.Database;
using Microsoft.AspNetCore.Authorization;


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

       // GET: /carrera?pageNumber=1
/// Obtiene una lista paginada de todas las carreras.
[HttpGet]
public async Task<IActionResult> GetCarreras(int pageNumber = 1)
{
    // Tamaño de página fijo en 10.
    const int pageSize = 10;

    if (pageNumber < 1)
    {
        pageNumber = 1;
    }
    
    // Contamos el total para poder informar al cliente cuántas páginas hay.
    var totalItems = await _context.carreras.CountAsync();

    // Aplicamos la lógica de paginación a la consulta de la base de datos.
    var carreras = await _context.carreras
                                 .OrderBy(c => c.Nombre) 
                                 .Skip((pageNumber - 1) * pageSize)
                                 .Take(pageSize) 
                                 .ToListAsync();
    
    // Creamos un objeto del tipo respuesta que incluye los datos y la información de paginación.
    var response = new
    {
        TotalItems = totalItems,
        TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
        CurrentPage = pageNumber,
        Data = carreras
    };

    return Ok(response);
}
        // GET: /carrera/{carrera_id}/
        /// Obtiene una carrera específica por su ID.
        [HttpGet("{carrera_id}")]
        public async Task<IActionResult> GetCarrera(int carrera_id)
        {
            var carrera = await _context.carreras.FindAsync(carrera_id);  //busca por una coincidencia, en este caso por el id de carrera

            if (carrera == null)
            {
                return NotFound($"No se encontró la carrera con el ID {carrera_id}.");
            }

            return Ok(carrera);
        }


       // GET: /carrera/facultad/{facultad_id}?pageNumber=1
[HttpGet("facultad/{facultad_id}")]
public async Task<IActionResult> GetCarrerasPorFacultad(int facultad_id, int pageNumber = 1)
{
    const int pageSize = 10;

    if (pageNumber < 1)
    {
        pageNumber = 1;
    }

    var query = _context.carreras.Where(c => c.FacultadId == facultad_id);

    // Contamos el total de items que coinciden con el filtro.
    var totalItems = await query.CountAsync();

    // Aplicamos ordenamiento y paginación a la consulta ya filtrada.
    var carreras = await query.OrderBy(c => c.Nombre)
                              .Skip((pageNumber - 1) * pageSize)
                              .Take(pageSize)
                              .ToListAsync();

    // Creamos el mismo objeto de respuesta que en el otro método de paginación.
    var response = new
    {
        TotalItems = totalItems,
        TotalPages = (int)Math.Ceiling(totalItems / (double)pageSize),
        CurrentPage = pageNumber,
        Data = carreras
    };

    return Ok(response);
}
        // POST: /carrera/
        /// Crea una nueva carrera.
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CrearCarrera([FromBody] Carrera nuevaCarrera)
        {
            if (nuevaCarrera == null)
            {
                return BadRequest("Los datos de la carrera no pueden ser nulos.");
            }
            nuevaCarrera.Tags = new List<Tag>();
            
           _context.carreras.Add(nuevaCarrera);
            await _context.SaveChangesAsync();

            // Devuelve una respuesta 201 Created con la ubicación del nuevo recurso y el objeto creado.
            return CreatedAtAction(nameof(GetCarrera), new { carrera_id = nuevaCarrera.Id }, nuevaCarrera);
        }

        // PUT: /carrera/{carrera_id}/
        /// Actualiza una carrera existente.
        [HttpPut("{carrera_id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EditarCarrera(int carrera_id, [FromBody] Carrera carreraActualizada)
        {
            if (carrera_id != carreraActualizada.Id)
            {
                return BadRequest("El ID de la ruta no coincide con el ID del cuerpo de la solicitud.");
            }

            _context.Entry(carreraActualizada).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Esta excepción ocurre si alguien más eliminó el registro mientras intentábamos guardarlo.
                if (!_context.carreras.Any(e => e.Id == carrera_id))
                {
                    return NotFound();
                }
                else
                {
                    throw; 
                }
            }

            return NoContent(); // Estándar para una actualización exitosa.
        }

        // DELETE: /carrera/{carrera_id}/
        /// Elimina una carrera por su ID.
        [HttpDelete("{carrera_id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> EliminarCarrera(int carrera_id)
        {
            var carrera = await _context.carreras.FindAsync(carrera_id);
            if (carrera == null)
            {
                return NotFound($"No se encontró la carrera con el ID {carrera_id} para eliminar.");
            }

            _context.carreras.Remove(carrera);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }
}
