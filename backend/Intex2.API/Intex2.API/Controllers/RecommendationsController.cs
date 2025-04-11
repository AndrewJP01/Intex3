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
                .Select(m => new
                {
                    m.show_id,
                    m.title,
                    m.description,
                    m.release_year,
                    m.duration,
                    m.rating,
                    imageUrl = $"https://posterstorage13.blob.core.windows.net/posters/renamed_posters/{Uri.EscapeDataString(m.show_id)}.jpg",

                })
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
                    var topRatedShowIds = await _context.MovieRatings
                        .Where(r => r.user_id == userId)
                        .OrderByDescending(r => r.rating)
                        .Select(r => r.show_id)
                        .Take(3)
                        .ToListAsync();

                    if (!topRatedShowIds.Any())
                        return NotFound("User has no rated movies.");

                    var finalResult = new List<object>();

                    foreach (var showId in topRatedShowIds)
                    {
                        var movieTitle = await _context.Movies
                            .Where(m => m.show_id == showId)
                            .Select(m => m.title)
                            .FirstOrDefaultAsync() ?? $"Movie {showId}";

                        var recs = _recommendationService.GetRecommendations(showId);

                        var recommendedMovies = await _context.Movies
                            .Where(m => recs.Contains(m.show_id!))
                            .Select(m => new
                            {
                                m.show_id,
                                m.title,
                                m.description,
                                m.release_year,
                                m.duration,
                                m.rating,
                                imageUrl = $"https://posterstorage13.blob.core.windows.net/posters/renamed_posters/{Uri.EscapeDataString(m.show_id)}.jpg"
                            })
                            .ToListAsync();

                        finalResult.Add(new
                        {
                            category = $"Because You Liked {movieTitle}",
                            movies = recommendedMovies
                        });
                    }

                    return Ok(finalResult);
                }
                catch (Exception ex)
                {
                    return BadRequest($"Error fetching personalized recommendations: {ex.Message}");
                }
            }


    [HttpGet("category/{userId}/{category}")]
    public async Task<IActionResult> GetRecommendationsByCategory(int userId, string category)
    {
        try
        {
            var recs = await Task.FromResult(_recommendationService.GetRecommendationsByCategory(userId, category));

            if (recs == null || !recs.Any())
                return NotFound("No recommendations found for this category.");

            var movieIds = recs.Select(r => r.ShowId).ToList();

            var movies = await _context.Movies
                .Where(m => movieIds.Contains(m.show_id!))
                .Select(m => new
                {
                    m.show_id,
                    m.title,
                    m.description,
                    m.release_year,
                    m.duration,
                    m.rating,
                    imageUrl = $"https://posterstorage13.blob.core.windows.net/posters/renamed_posters/{Uri.EscapeDataString(m.show_id)}.jpg"
                })
                .ToListAsync();

            return Ok(movies);
        }
        catch (Exception ex)
        {
            return BadRequest($"Error loading recommendations: {ex.Message}");
        }
    }
}
