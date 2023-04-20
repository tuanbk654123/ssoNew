using System;

namespace SsoGroup.Models
{
    public class ResetPasswordModel
    {
        public Guid UserId { get; set; }
        public string Token { get; set; }
        public string Password { get; set; }
    }
}
