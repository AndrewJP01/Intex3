using Intex2.API.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// ✅ Add EF Core DbContext
var connectionString = builder.Configuration.GetConnectionString("MovieConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

var app = builder.Build();

// ✅ Enable Swagger
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

// ✅ Use CORS BEFORE authorization
app.UseCors("AllowAll");
app.UseStaticFiles();


app.UseAuthorization();

app.MapControllers();

// ✅ Optional: test SQL connection on startup
try
{
    using (var connection = new SqlConnection(connectionString))
    {
        connection.Open();
        Console.WriteLine("✅ Connected to SQL Server successfully!");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"❌ Failed to connect to SQL Server: {ex.Message}");
}

app.Run();



