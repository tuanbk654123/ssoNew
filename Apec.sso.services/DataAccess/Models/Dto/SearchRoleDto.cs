using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class SearchRoleDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
