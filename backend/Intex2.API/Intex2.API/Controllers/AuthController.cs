using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Intex2.API.Models;
using Intex2.API.Dtos;
using Intex2.API.Data;

namespace Intex2.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly AppDbContext _context;

        public AuthController(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            SignInManager<ApplicationUser> signInManager,
            AppDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            // ✅ Safely get next MLUserId from AspNetUsers
            int nextMLUserId = 1;
            try
            {
                var maxId = await _context.Users
                    .Where(u => u.MLUserId != null)
                    .MaxAsync(u => (int?)u.MLUserId);

                nextMLUserId = (maxId ?? 0) + 1;
            }
            catch
            {
                nextMLUserId = 1;
            }

            Console.WriteLine($"➡️ Assigning MLUserId: {nextMLUserId}");

            var user = new ApplicationUser
            {
                UserName = dto.Email,
                Email = dto.Email,
                first_name = dto.FirstName,
                last_name = dto.LastName,
                EmailConfirmed = true,
                MLUserId = nextMLUserId
            };

            var result = await _userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            await _userManager.AddToRoleAsync(user, "Customer");

            return Ok("User registered successfully");
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return Unauthorized("Invalid email or password");
            }

            var result = await _signInManager.CheckPasswordSignInAsync(
                user, dto.Password, lockoutOnFailure: true);

            if (result.Succeeded)
            {
                // Explicitly sign in and issue auth cookie
                await _signInManager.SignInAsync(user, isPersistent: true);

                var roles = await _userManager.GetRolesAsync(user);

                return Ok(new
                {
                    message = "Login successful",
                    username = user.UserName,
                    email = user.Email,
                    roles = roles
                });
            }

            return Unauthorized("Invalid email or password");
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok("Logged out");
        }

        [HttpGet("pingauth")]
        public async Task<IActionResult> PingAuth()
        {
            if (!User.Identity?.IsAuthenticated ?? true)
            {
                return Unauthorized(new { message = "Not authenticated" });
            }

            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                userId = user.Id,
                mlUserId = user.MLUserId,
                username = user.UserName,
                roles
            });
        }


        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> Me()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var roles = await _userManager.GetRolesAsync(user);

            return Ok(new
            {
                username = user.UserName,
                email = user.Email,
                roles = roles
            });
        }
    }
}
