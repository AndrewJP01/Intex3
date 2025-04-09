using Intex2.API.Data;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Intex2.API.Models;
using Intex2.API.Services;


var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

// builder.Services.Configure<MvcOptions>(options =>
// {
//     options.Filters.Add(new RequireHttpsAttribute());
// });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// :white_check_mark: Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});
// :white_check_mark: Add EF Core DbContext
var connectionString = builder.Configuration.GetConnectionString("MovieConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

// ✅ Add Identity
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

// THis adds the Recommendation model for requirement one based on shows and shows similar to that show
builder.Services.AddSingleton<RecommendationService>(provider =>
{
    var env = provider.GetRequiredService<IWebHostEnvironment>();
    return new RecommendationService(env);
});
var app = builder.Build();
// :white_check_mark: Enable Swagger
app.UseSwagger();
app.UseSwaggerUI();

// if (!app.Environment.IsDevelopment())
// {
//     app.UseHttpsRedirection();
// }

// ✅ Use CORS BEFORE authorization
app.UseCors("AllowAll");
app.UseStaticFiles();

app.UseStaticFiles();

// app.UseAuthorization();

app.MapControllers();
// :white_check_mark: Optional: test SQL connection on startup
try
{
    using (var connection = new SqlConnection(connectionString))
    {
        connection.Open();
        Console.WriteLine(":white_check_mark: Connected to SQL Server successfully!");
    }
}
catch (Exception ex)
{
    Console.WriteLine($":x: Failed to connect to SQL Server: {ex.Message}");
}

await SeedRolesAndAdminAsync(app);

app.Run();

async Task SeedRolesAndAdminAsync(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

    // Create roles if they don't exist
    string[] roles = { "Admin", "Customer" };
    foreach (var role in roles)
    {
        if (!await roleManager.RoleExistsAsync(role))
            await roleManager.CreateAsync(new IdentityRole(role));
    }

    // Create default admin user
    string adminEmail = "admin@cineniche.com";
    string adminPassword = "SecurePass123!";

    if (await userManager.FindByEmailAsync(adminEmail) == null)
    {
        var admin = new ApplicationUser
        {
            UserName = adminEmail,
            Email = adminEmail,
            first_name = "Admin",
            last_name = "User",
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(admin, adminPassword);
        if (result.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}
