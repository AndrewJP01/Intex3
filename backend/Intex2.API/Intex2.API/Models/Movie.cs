using System.ComponentModel.DataAnnotations;

namespace Intex2.API.Models
{
    public class Movie
    {
        [Key]
        public string? show_id { get; set; }
        public string? type { get; set; }
        public string? title { get; set; }
        public string? director { get; set; }
        public string? cast { get; set; }
        public string? country { get; set; }
        public int release_year { get; set; }
        public string? rating { get; set; }
        public string? duration { get; set; }
        public string? description { get; set; }

        public ICollection<MovieGenre> genres { get; set; }
        public ICollection<MovieRating>? ratings { get; set; }
    }
}
