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

            // Fetch full Movie records for those recommended IDs
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
            // Step 1: Get top 3 movies rated by the user
            var topRated = await _context.MovieRatings
                .Where(r => r.user_id == userId)
                .OrderByDescending(r => r.rating)
                .Select(r => r.show_id)
                .Take(3)
                .ToListAsync();

            if (!topRated.Any())
                return NotFound("User has no rated movies.");

            // Step 2: Use recommendation service for each top movie
            var recommendedShowIds = new HashSet<string>();
            foreach (var showId in topRated)
            {
                var recs = _recommendationService.GetRecommendations(showId, 5);
                foreach (var r in recs)
                    recommendedShowIds.Add(r);
            }

            // Step 3: Get the full movie details
            var recommendedMovies = await _context.Movies
                .Where(m => recommendedShowIds.Contains(m.show_id!))
                .Include(m => m.genres)
                .Include(m => m.ratings)
                .ToListAsync();

            return Ok(recommendedMovies);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error fetching personalized recommendations: {ex.Message}");
        }
    }
}
