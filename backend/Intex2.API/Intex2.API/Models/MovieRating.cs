namespace Intex2.API.Models
{
    public class MovieRating
    {
        public int UserId { get; set; }
        public string ShowId { get; set; }
        public int Rating { get; set; }

        public MovieUser User { get; set; }
        public Movie Movie { get; set; }
    }
}
