using System.ComponentModel.DataAnnotations;

public class MovieUser
{
    [Key]
    public int UserId { get; set; }
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
    public string Gender { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public int Zip { get; set; }

    public bool Netflix { get; set; }
    public bool AmazonPrime { get; set; }
    public bool DisneyPlus { get; set; }
    public bool ParamountPlus { get; set; }
    public bool Max { get; set; }
    public bool Hulu { get; set; }
    public bool AppleTVPlus { get; set; }
    public bool Peacock { get; set; }

    public ICollection<MovieRating> Ratings { get; set; }
}

