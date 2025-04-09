using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2.API.Data;
using Intex2.API.Models;
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

        // PUT: /api/admin/movies/{show_id}
        [HttpPut("movies/{show_id}")]
        public IActionResult UpdateMovie(string show_id, [FromBody] Movie updatedMovie)
        {
            if (show_id != updatedMovie.show_id)
                return BadRequest("ID in URL does not match ID in body");

            var existingMovie = _context.Movies.Find(show_id);
            if (existingMovie == null)
                return NotFound();

            _context.Entry(existingMovie).CurrentValues.SetValues(updatedMovie);
            _context.SaveChanges();

            return NoContent();
        }

        // POST: /api/admin/movies
        [HttpPost("movies")]
        public IActionResult AddMovie([FromBody] MovieCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.genres == null || !dto.genres.Any())
                return BadRequest("At least one genre is required.");

            if (_context.Movies.Any(m => m.show_id == dto.show_id))
                return Conflict("Movie already exists.");

            var newMovie = new Movie
            {
                show_id = dto.show_id,
                type = dto.type,
                title = dto.title,
                director = dto.director,
                cast = dto.cast,
                country = dto.country,
                release_year = dto.release_year,
                rating = dto.rating,
                duration = dto.duration,
                description = dto.description,
                genres = dto.genres.Select(g => new MovieGenre
                {
                    show_id = dto.show_id,
                    genre = g
                }).ToList()
            };

            _context.Movies.Add(newMovie);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetMovies), new { id = newMovie.show_id }, newMovie);
        }

        // More admin routes here...
    }
}
