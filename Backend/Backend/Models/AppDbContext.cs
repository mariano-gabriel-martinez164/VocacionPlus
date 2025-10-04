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

    }
}