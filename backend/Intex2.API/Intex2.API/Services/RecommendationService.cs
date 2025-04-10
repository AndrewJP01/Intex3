using System;
using System.Collections.Generic;
using System.Data;
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

            // 🔁 Load hybrid_cosine_similarity.csv
            var recommendationPath = Path.Combine(basePath, "App_Data", "hybrid_cosine_similarity.csv");
            _recommendationMap = LoadRecommendations(recommendationPath);

            // 🔁 Load final_recommendations.csv
            var finalRecsPath = Path.Combine(basePath, "App_Data", "final_recommendations.csv");
            _finalRecs = LoadFinalRecommendations(finalRecsPath);
        }

        // 📦 Load hybrid recommendations (collab/content filtering)
        private Dictionary<string, List<string>> LoadRecommendations(string path)
        {
            var map = new Dictionary<string, List<string>>();

            using (TextFieldParser csvParser = new TextFieldParser(path))
            {
                csvParser.SetDelimiters(new[] { "," });
                csvParser.HasFieldsEnclosedInQuotes = true;

                string[] headers = csvParser.ReadFields(); // Skip header

                while (!csvParser.EndOfData)
                {
                    string[] fields = csvParser.ReadFields();
                    if (fields.Length < 2) continue;

                    var showId = fields[0];
                    var recs = fields.Skip(1).Where(f => !string.IsNullOrWhiteSpace(f)).ToList();

                    if (!string.IsNullOrEmpty(showId))
                        map[showId] = recs;
                }
            }

            return map;
        }

        // 🔥 Used by your buddy’s model
        public List<string> GetRecommendations(string showId, int count = 5)
        {
            if (_recommendationMap.TryGetValue(showId, out var recs))
            {
                return recs.Take(count).ToList();
            }

            return new List<string>(); // No recommendations found
        }

        // 🔄 Load personalized movie groups by user & category
        public List<FinalRecommendation> GetRecommendationsByCategory(int userId, string category)
        {
            return _finalRecs
                .Where(r => r.UserId == userId && r.Category.Equals(category, StringComparison.OrdinalIgnoreCase))
                .ToList();
        }

        // 🔎 Load entire CSV for final_recommendations
        private List<FinalRecommendation> LoadFinalRecommendations(string path)
        {
            var recs = new List<FinalRecommendation>();

            using (TextFieldParser parser = new TextFieldParser(path))
            {
                parser.SetDelimiters(new[] { "," });
                parser.HasFieldsEnclosedInQuotes = true;

                string[] headers = parser.ReadFields(); // Skip header

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
            }

            return recs;
        }
    }

    // 📌 Used to model rows in final_recommendations.csv
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
