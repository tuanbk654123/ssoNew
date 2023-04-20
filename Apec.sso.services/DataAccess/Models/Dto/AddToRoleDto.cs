using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class AddToRoleDto
    {
        public string RoleIdAdd { get; set; }

        public Users Users { get; set; }
    }
}
