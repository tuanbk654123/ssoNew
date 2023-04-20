using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class UpdateUserDto
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        //public string Password { get; set; }
        public List<string> RoleIds { get; set; } // List RoleID
        public string Email { get; set; }
        public string PhoneNumber { get; set; }

        public bool? IsActive { get; set; }
        //Email
        //      PasswordHash
        //      PhoneNumber
        //      Roles
    }
}
