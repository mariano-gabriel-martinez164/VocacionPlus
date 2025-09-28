using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VocacionPlus.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// agregar el contexto de la base de datos
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseSqlite(connectionString)
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging()
    .EnableDetailedErrors()
);

// === INICIO: CONFIGURACIÓN DE IDENTIDAD Y JWT ===

// 1. Añadir Identity para manejar usuarios, roles y la seguridad de contraseñas.
// Identity usará tu AppDbContext para guardar sus tablas (AspNetUsers, AspNetRoles, etc.).
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// 2. Añadir Autenticación y configurar el esquema de JWT Bearer.
// Esto le dice a la aplicación cómo debe validar los tokens que recibe.
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false; // En producción, deberías ponerlo en true.
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"]))
    };
});

// === FIN: CONFIGURACIÓN DE IDENTIDAD Y JWT ===

// inicio del swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ¡IMPORTANTE! El orden de estos dos es fundamental.
app.UseAuthentication(); // Primero, determina quién es el usuario (lee el token).
app.UseAuthorization();  // Después, verifica si ese usuario tiene permiso para acceder.

app.MapControllers();

app.Run();