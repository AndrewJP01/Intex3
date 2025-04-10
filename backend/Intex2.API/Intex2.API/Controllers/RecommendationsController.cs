using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Intex2.API.Data;
using Intex2.API.Models;
using Intex2.API.Services;

namespace Intex2.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RecommendationsController : ControllerBase
{
    private readonly RecommendationService _recommendationService;
    private readonly AppDbContext _context;

    public RecommendationsController(
        RecommendationService recommendationService,
        AppDbContext context)
    {
        _recommendationService = recommendationService;
        _context = context;
    }

    [HttpGet("{showId}")]
    public async Task<IActionResult> GetRecommendations(string showId)
    {
        try
        {
            var recommendedIds = _recommendationService.GetRecommendations(showId);

            if (recommendedIds == null || !recommendedIds.Any())
                return NotFound("No recommendations found.");

            var recommendedMovies = await _context.Movies
                .Where(m => recommendedIds.Contains(m.show_id!))
                .Include(m => m.genres)
                .Include(m => m.ratings)
                .ToListAsync();

            return Ok(recommendedMovies);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error getting recommendations: {ex.Message}");
        }
    }

    [HttpGet("topRated/{userId}")]
    public async Task<IActionResult> GetTopRatedRecommendations(int userId)
    {
        try
        {
            var topRated = await _context.MovieRatings
                .Where(r => r.user_id == userId && r.rating == 5)
                .OrderByDescending(r => r.rating)
                .Select(r => r.show_id)
                .Distinct()
                .Take(3)
                .ToListAsync();

            var result = new List<object>();

            foreach (var showId in topRated)
            {
                var baseMovie = await _context.Movies
                    .Where(m => m.show_id == showId)
                    .Select(m => m.title)
                    .FirstOrDefaultAsync();

                var recs = _recommendationService.GetRecommendations(showId, 18);

                var recMovies = await _context.Movies
                    .Where(m => recs.Contains(m.show_id!))
                    .Include(m => m.genres)
                    .Include(m => m.ratings)
                    .ToListAsync();

                result.Add(new
                {
                    category = $"Since you liked {baseMovie}",
                    movies = recMovies
                });
            }

            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error getting since-you-liked recommendations: {ex.Message}");
        }
    }

    [HttpGet("category/{userId}/{category}")]
    public IActionResult GetRecommendationsByCategory(int userId, string category)
    {
        try
        {
            var recs = _recommendationService.GetRecommendationsByCategory(userId, category);

            if (recs == null || !recs.Any())
                return NotFound("No recommendations found for this category.");

            return Ok(recs);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error loading recommendations: {ex.Message}");
        }
    }
}