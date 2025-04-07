namespace Intex2.API.Models
{
    public class MovieRating
    {
        public int user_id { get; set; }
        public string show_id { get; set; }
        public int rating { get; set; }

        public MovieUser user { get; set; }
        public Movie movie { get; set; }
    }
}
