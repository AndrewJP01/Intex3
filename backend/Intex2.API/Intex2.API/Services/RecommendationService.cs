using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.Extensions.Hosting;
using Microsoft.VisualBasic.FileIO;

namespace Intex2.API.Services
{
    public class RecommendationService
    {
        private readonly Dictionary<string, List<string>> _recommendationMap;
        private readonly List<FinalRecommendation> _finalRecs;

        public RecommendationService(IWebHostEnvironment env)
        {
            var basePath = env.ContentRootPath;

            // Load hybrid_cosine_similarity.csv
            var recommendationPath = Path.Combine(basePath, "App_Data", "hybrid_cosine_similarity.csv");
            _recommendationMap = LoadRecommendations(recommendationPath);

            // Load final_recommendations.csv
            var finalRecsPath = Path.Combine(basePath, "App_Data", "final_recommendations.csv");
            _finalRecs = LoadFinalRecommendations(finalRecsPath);
        }

        // Load hybrid recommendations (collaborative + content-based filtering)
        private Dictionary<string, List<string>> LoadRecommendations(string path)
        {
            var map = new Dictionary<string, List<string>>();

            using var csvParser = new TextFieldParser(path)
            {
                Delimiters = new[] { "," },
                HasFieldsEnclosedInQuotes = true
            };

            _ = csvParser.ReadFields(); // Skip header

            while (!csvParser.EndOfData)
            {
                var fields = csvParser.ReadFields();
                if (fields.Length < 2) continue;

                var showId = fields[0];
                var recs = fields.Skip(1)
                                 .Where(f => !string.IsNullOrWhiteSpace(f))
                                 .ToList();

                if (!string.IsNullOrEmpty(showId))
                    map[showId] = recs;
            }

            return map;
        }

        // Get all recommendations for a given showId
        public List<string> GetRecommendations(string showId)
        {
            return _recommendationMap.TryGetValue(showId, out var recs)
                ? recs.ToList() // Defensive copy
                : new List<string>(); // No recommendations found
        }

        // Get personalized recommendations for a user & category
        public List<FinalRecommendation> GetRecommendationsByCategory(int userId, string category)
        {
            return _finalRecs
                .Where(r => r.UserId == userId && r.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        // Load final_recommendations.csv into memory
        private List<FinalRecommendation> LoadFinalRecommendations(string path)
        {
            var recs = new List<FinalRecommendation>();

            using var parser = new TextFieldParser(path)
            {
                Delimiters = new[] { "," },
                HasFieldsEnclosedInQuotes = true
            };

            _ = parser.ReadFields(); // Skip header

            while (!parser.EndOfData)
            {
                var fields = parser.ReadFields();
                if (fields.Length < 6) continue;

                recs.Add(new FinalRecommendation
                {
                    UserId = int.TryParse(fields[0], out var uid) ? uid : 0,
                    ShowId = fields[1] ?? "",
                    Title = fields[2] ?? "",
                    Category = fields[3] ?? "",
                    Score = float.TryParse(fields[4], out var score) ? score : 0,
                    Genre = fields[5] ?? ""
                });
            }

            return recs;
        }

        // Model for final_recommendations.csv rows
        public class FinalRecommendation
        {
            public int UserId { get; set; }
            public string ShowId { get; set; } = "";
            public string Title { get; set; } = "";
            public string Category { get; set; } = "";
            public float Score { get; set; }
            public string Genre { get; set; } = "";
        }
    }
}
