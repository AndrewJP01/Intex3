using Microsoft.AspNetCore.Mvc;
using Intex2.API.Data;
using Intex2.API.Models;
using Microsoft.EntityFrameworkCore;


namespace Intex2.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // Example: GET all movies
        [HttpGet("movies")]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _context.Movies
                .Include(m => m.genres) // ✅ Include genre data
                .Select(m => new
                {
                    m.show_id,
                    m.title,
                    m.type,
                    m.director,
                    m.cast,
                    m.country,
                    m.release_year,
                    m.rating,
                    m.duration,
                    m.description,
                    genres = m.genres.Select(g => g.genre).ToList() // ✅ extract genre names
                })
                .ToListAsync();

            return Ok(movies);
        }



        // Example: DELETE a movie
        [HttpDelete("movies/{id}")]
        public IActionResult DeleteMovie(string id)
        {
            var movie = _context.Movies.Find(id);
            if (movie == null) return NotFound();

            _context.Movies.Remove(movie);
            _context.SaveChanges();

            return NoContent();
        }
        // GET: /api/admin/genres
        [HttpGet("genres")]
        public IActionResult GetAllGenres()
        {
            var genres = _context.MovieGenres.ToList();
            return Ok(genres);
        }

        // GET: /api/admin/users
        [HttpGet("users")]
        public IActionResult GetAllUsers()
        {
            var users = _context.MovieUsers.ToList();
            return Ok(users);
        }

        // GET: /api/admin/ratings
        [HttpGet("ratings")]
        public IActionResult GetAllRatings()
        {
            var ratings = _context.MovieRatings.ToList();
            return Ok(ratings);
        }
        // More admin routes here...
    }
}
