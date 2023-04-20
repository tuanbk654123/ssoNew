using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class SearchClientDto
    {
        public string ClientName { get; set; }

        public string ClientId { get; set; }

    }
}
