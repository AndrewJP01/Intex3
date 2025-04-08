namespace Intex2.API.Controllers
{
    using Microsoft.AspNetCore.Mvc;

    [ApiController]
    [Route("api/[controller]")]
    public class MoviesController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public MoviesController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public IActionResult GetMovies()
        {
            var moviePath = Path.Combine(_env.WebRootPath, "Movie Posters");
            var movies = Directory.GetFiles(moviePath)
                .Select(Path.GetFileName)
                .ToList();

            return Ok(movies);
        }

    }
}
