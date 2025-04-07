using Microsoft.AspNetCore.Mvc;
using Intex2.API.Models; // Ensure this namespace is correct
using Intex2.API.Data; // Ensure this namespace is correct
namespace Intex2.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("movies")]
        public IActionResult GetMovies()
        {
            var movies = _context.Movies.Take(10).ToList();
            return Ok(movies);
        }
    }
}