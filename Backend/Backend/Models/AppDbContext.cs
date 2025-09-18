using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;

namespace VocacionPlus.Database
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Facultad> facultades { get; set; }
        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<TestVocacional> testVocacionales { get; set; }
        public DbSet<Carrera> carreras { get; set; }
        public DbSet<Curso> cursos { get; set; }
        public DbSet<Valoracion> valoraciones { get; set; }
    }
}