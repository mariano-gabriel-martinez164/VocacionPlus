using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false)
    .AddJsonFile("appsettings.DataBaseUser.json", optional: false)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

var DB_Server = builder.Configuration.GetConnectionString("Server");
var DB_Port = builder.Configuration.GetConnectionString("Port");
var DB_Name = builder.Configuration.GetConnectionString("Database");
var DB_UserName = builder.Configuration.GetConnectionString("User");
var DB_UserPasswrod = builder.Configuration.GetConnectionString("Password");
var DB_ConfigurationString = $"server={DB_Server};port={DB_Port};database={DB_Name};user={DB_UserName};password={DB_UserPasswrod}";


var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.Run();

builder.Services.AddDbContext<DbContext>(options =>
    options.UseMySql(
        DB_ConfigurationString,
        ServerVersion.AutoDetect(DB_ConfigurationString)
        ));