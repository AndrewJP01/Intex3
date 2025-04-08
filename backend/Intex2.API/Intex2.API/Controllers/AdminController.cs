using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2.API.Data;
using Intex2.API.Models;


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

        [HttpGet("movies")]
        public async Task<IActionResult> GetMovies()
        {
            var movies = await _context.Movies
                .Include(m => m.genres)
                .Select(m => new
                {
                    show_id = m.show_id,
                    title = m.title ?? "",
                    type = m.type ?? "",
                    director = m.director ?? "",
                    cast = m.cast ?? "",
                    country = m.country ?? "",
                    release_year = m.release_year,
                    rating = m.rating ?? "Unrated",
                    duration = m.duration ?? "",
                    description = m.description ?? "",
                    genres = m.genres
                        .Select(g => string.IsNullOrWhiteSpace(g.genre) ? "No Genres Added" : g.genre)
                        .ToList()

                })
                .ToListAsync();

            return Ok(movies);
        }


        [HttpDelete("movies/{id}")]
        public IActionResult DeleteMovie(string id)
        {
            var movie = _context.Movies.Find(id);
            if (movie == null) return NotFound();

            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return NoContent();
        }

        [HttpGet("genres")]
        public IActionResult GetAllGenres() => Ok(_context.MovieGenres.ToList());

        [HttpGet("users")]
        public IActionResult GetAllUsers() => Ok(_context.MovieUsers.ToList());

        [HttpGet("ratings")]
        public IActionResult GetAllRatings() => Ok(_context.MovieRatings.ToList());

        // ✅ UPDATED PUT method
        [HttpPut("movies/{show_id}")]
        public IActionResult UpdateMovie(string show_id, [FromBody] MovieUpdateDto dto)
        {
            if (show_id != dto.show_id)
                return BadRequest("ID in URL does not match ID in body");

            var existingMovie = _context.Movies
                .Include(m => m.genres)
                .FirstOrDefault(m => m.show_id == show_id);

            if (existingMovie == null)
                return NotFound();

            existingMovie.title = dto.title;
            existingMovie.type = dto.type;
            existingMovie.director = dto.director;
            existingMovie.cast = dto.cast;
            existingMovie.country = dto.country;
            existingMovie.release_year = dto.release_year;
            existingMovie.rating = dto.rating;
            existingMovie.duration = dto.duration;
            existingMovie.description = dto.description;

            // ✅ FIXED: Remove tracked genres and re-add new ones
            var existingGenres = _context.MovieGenres
                .Where(g => g.show_id == show_id)
                .ToList();

            _context.MovieGenres.RemoveRange(existingGenres);

            var newGenres = dto.genres.Select(g => new MovieGenre
            {
                show_id = dto.show_id,
                genre = g
            });

            _context.MovieGenres.AddRange(newGenres);

            _context.SaveChanges();

            var result = new
            {
                show_id = existingMovie.show_id,
                title = existingMovie.title,
                type = existingMovie.type,
                director = existingMovie.director,
                cast = existingMovie.cast,
                country = existingMovie.country,
                release_year = existingMovie.release_year,
                rating = existingMovie.rating,
                duration = existingMovie.duration,
                description = existingMovie.description,
                genres = newGenres.Select(g => g.genre).ToList()
            };
            return Ok(result);
        }


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

            var result = new {
                show_id = newMovie.show_id,
                title = newMovie.title,
                type = newMovie.type,
                director = newMovie.director,
                cast = newMovie.cast,
                country = newMovie.country,
                release_year = newMovie.release_year,
                rating = newMovie.rating,
                duration = newMovie.duration,
                description = newMovie.description,
                genres = newMovie.genres.Select(g => g.genre).ToList()
            };

            return CreatedAtAction(nameof(GetMovies), new { id = newMovie.show_id }, result);

        }
    }
}
