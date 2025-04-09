using Microsoft.AspNetCore.Identity;

namespace Intex2.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string first_name { get; set; }
        public string last_name { get; set; }
    }
}