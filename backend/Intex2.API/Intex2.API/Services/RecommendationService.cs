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

        public RecommendationService(IWebHostEnvironment env)
        {
            var basePath = env.ContentRootPath;
            var recommendationPath = Path.Combine(basePath, "App_Data", "hybrid_cosine_similarity.csv");
            _recommendationMap = LoadRecommendations(recommendationPath);
        }

        private Dictionary<string, List<string>> LoadRecommendations(string path)
        {
            var map = new Dictionary<string, List<string>>();

            using (TextFieldParser csvParser = new TextFieldParser(path))
            {
                csvParser.SetDelimiters(new[] { "," });
                csvParser.HasFieldsEnclosedInQuotes = true;

                // Skip header
                string[] headers = csvParser.ReadFields();

                while (!csvParser.EndOfData)
                {
                    string[] fields = csvParser.ReadFields();
                    if (fields.Length < 2) continue; // Need at least 1 recommendation

                    var showId = fields[0];
                    var recs = fields.Skip(1).Where(f => !string.IsNullOrWhiteSpace(f)).ToList();

                    if (!string.IsNullOrEmpty(showId))
                        map[showId] = recs;
                }
            }

            return map;
        }

        public List<string> GetRecommendations(string showId, int count = 5)
        {
            if (_recommendationMap.TryGetValue(showId, out var recs))
            {
                return recs.Take(count).ToList();
            }

            return new List<string>(); // No recommendations found
        }
    }
}
