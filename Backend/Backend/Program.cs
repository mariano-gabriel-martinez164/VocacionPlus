using Microsoft.EntityFrameworkCore;
using VocacionPlus.Database;
using VocacionPlus.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile("appsettings.User.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

// cadena de conexion
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors()
);

var app = builder.Build();
app.MapGet("/", () => $"Backend funcionando en modo {builder.Environment.EnvironmentName}");
app.MapGet("/facultades", async (AppDbContext db) =>
{
    var facultades = await db.facultades.ToListAsync();
    return facultades is not null ?
        Results.Ok(facultades) :
        Results.NotFound("No se encontraron facultades");
});

app.MapPost("/facultades", async (AppDbContext db, Facultad facultad) =>
{
    if (facultad is null)
        return Results.BadRequest("No se recibio la facultad");
    await db.facultades.AddAsync(facultad);
    await db.SaveChangesAsync();
    return Results.Created($"/facultades/{facultad.Id}", facultad);
});

app.Run();
