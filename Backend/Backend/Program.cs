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
var DB_Server = builder.Configuration.GetConnectionString("Server");
var DB_Port = builder.Configuration.GetConnectionString("Port");
var DB_Name = builder.Configuration.GetConnectionString("Database");
var DB_UserName = builder.Configuration.GetConnectionString("Username");
var DB_UserPasswrod = builder.Configuration.GetConnectionString("Password");
var DB_ConfigurationString = $"server={DB_Server};port={DB_Port};database={DB_Name};user={DB_UserName};password={DB_UserPasswrod}";

// agregar el contexto de la base de datos
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseMySql(DB_ConfigurationString, ServerVersion.AutoDetect(DB_ConfigurationString))
    // las proximas 3 lineas son para el desarrollo y debugging,
    // deberian ser eliminadas o cambiadas para produccion
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging()
    .EnableDetailedErrors()
);

var app = builder.Build();

app.MapGet("/", () => $"conectando a {DB_Name} en {DB_Server}:{DB_Port} con el usuario {DB_UserName} en modo {builder.Environment.EnvironmentName}");
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