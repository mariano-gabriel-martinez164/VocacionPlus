using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VocacionPlus.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace VocacionPlus.Database
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Facultad> facultades { get; set; }
        public DbSet<Usuario> usuarios { get; set; }
        public DbSet<TestVocacional> testVocacionales { get; set; }
        public DbSet<Tag> tags { get; set; }
        public DbSet<Carrera> carreras { get; set; }
        public DbSet<Valoracion> valoraciones { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Relación uno a uno entre Usuario y TestVocacional
            modelBuilder.Entity<Usuario>()
                .HasOne(u => u.TestVocacional)
                .WithOne(t => t.Usuario)
                .HasForeignKey<TestVocacional>(t => t.UsuarioId);
        }
    }
}