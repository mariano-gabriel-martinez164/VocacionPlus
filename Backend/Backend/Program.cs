using Microsoft.EntityFrameworkCore;
using VocacionPlus.DB;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();


var DB_Server = builder.Configuration.GetConnectionString("Server");
var DB_Port = builder.Configuration.GetConnectionString("Port");
var DB_Name = builder.Configuration.GetConnectionString("Database");
var DB_ConfigurationString = $"server={DB_Server};port={DB_Port};database={DB_Name};user={DB_User.UserName};password={DB_User.Password}";


var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

builder.Services.AddDbContext<DbContext>(options =>
    options.UseMySql(
        DB_ConfigurationString,
        ServerVersion.AutoDetect(DB_ConfigurationString)
        ));