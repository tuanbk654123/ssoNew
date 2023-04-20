using System.ComponentModel.DataAnnotations;

namespace SsoGroup.Models
{
    public class User
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email")]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        public bool? IsActive { get; set; }

        public string TypeLogin { get; set; }

    }
}
