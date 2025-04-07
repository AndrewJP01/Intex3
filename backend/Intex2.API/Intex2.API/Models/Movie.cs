namespace Intex2.API.Models
{
    public class Movie
    {
        public string ShowId { get; set; }
        public string Title { get; set; }
        public string Type { get; set; }
        public string Director { get; set; }
        public string Cast { get; set; }
        public string Country { get; set; }
        public int ReleaseYear { get; set; }
        public string Rating { get; set; }
        public string Duration { get; set; }
        public string Description { get; set; }

        public ICollection<MovieGenre> Genres { get; set; }
        public ICollection<MovieRating> Ratings { get; set; }
    }
}
