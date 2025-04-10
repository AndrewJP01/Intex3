using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Intex2.API.Data;
using Intex2.API.Models;

namespace Intex2.API.Controllers
{
    [Authorize] // ✅ All routes require authentication by default
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Logged-in user
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovie(string id)
        {
            var movie = await _context.Movies
                .Where(m => m.show_id == id)
                .Select(m => new
                {
                    m.show_id,
                    title = m.title ?? "No Title Provided",
                    director = m.director ?? "Unknown",
                    cast = m.cast ?? "Not listed",
                    country = m.country ?? "Unknown",
                    m.release_year,
                    rating = m.rating ?? "NR",
                    duration = m.duration ?? "Unknown",
                    description = m.description ?? "No description available.",
                    Genres = m.genres.Select(g => g.genre ?? "Uncategorized"),
                    Ratings = new double[]
                    {
                        m.ratings.Any() ? Math.Round(m.ratings.Average(r => r.rating), 2) : 0,
                        m.ratings.Count()
                    }
                })
                .FirstOrDefaultAsync();

            if (movie == null)
                return NotFound();

            return Ok(movie);
        }

        // ✅ Logged-in user
        [HttpGet("top-rated")]
        public async Task<IActionResult> GetTopRatedMovies()
        {
            var topMovies = await _context.Movies
                .Include(m => m.ratings)
                .Include(m => m.genres)
                .Where(m => m.ratings != null && m.ratings.Any())
                .OrderByDescending(m => m.ratings.Count)
                .Take(15)
                .Select(m => new
                {
                    m.show_id,
                    m.title,
                    m.description,
                    genre = m.genres.Select(g => g.genre).FirstOrDefault() ?? "Uncategorized",
                    rating = m.rating,
                    duration = m.duration,
                    releaseDate = m.release_year,
                    imageUrl = $"https://localhost:5166/Movie%20Posters/{Uri.EscapeDataString(m.title ?? "")}.jpg",
                    ratingsCount = m.ratings.Count,
                    averageRating = m.ratings.Average(r => (double)r.rating)
                })
                .ToListAsync();

            return Ok(topMovies);
        }

        // ✅ Logged-in user
        [HttpPost("{id}/rate")]
        public async Task<IActionResult> RateMovie(string id, [FromBody] RatingDto ratingDto)
        {
            if (ratingDto.rating < 1 || ratingDto.rating > 5)
                return BadRequest("Rating must be between 1 and 5.");

            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.show_id == id);

            if (movie == null)
                return NotFound();

            var newRating = new MovieRating
            {
                show_id = id,
                user_id = ratingDto.user_id,
                rating = ratingDto.rating
            };

            _context.MovieRatings.Add(newRating);
            await _context.SaveChangesAsync();

            return Ok();
        }

        public class RatingDto
        {
            public int user_id { get; set; }
            public int rating { get; set; }
        }

        // ✅ Logged-in user
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

        // 🔒 Admin only
        [Authorize(Roles = "Admin")]
        [HttpDelete("movies/{id}")]
        public IActionResult DeleteMovie(string id)
        {
            var movie = _context.Movies.Find(id);
            if (movie == null) return NotFound();
            _context.Movies.Remove(movie);
            _context.SaveChanges();
            return NoContent();
        }

        // 🔒 Admin only
        [Authorize]
        [HttpGet("genres")]
        public IActionResult GetAllGenres() => Ok(_context.MovieGenres.ToList());

        // 🔒 Admin only
        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public IActionResult GetAllUsers() => Ok(_context.MovieUsers.ToList());

        
        [HttpGet("ratings")]
        public IActionResult GetAllRatings() => Ok(_context.MovieRatings.ToList());

        [Authorize(Roles = "Admin")]
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

        // 🔒 Admin only
        [Authorize(Roles = "Admin")]
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

            var result = new
            {
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
