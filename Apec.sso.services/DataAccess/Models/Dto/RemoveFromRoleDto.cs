using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class RemoveFromRoleDto
    {
        public string RoleNameRemove { get; set; }

        public Users Users { get; set; }
    }
}
