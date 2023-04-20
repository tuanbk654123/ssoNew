using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("Users")]
    public class Users : MongoIdentityUser<Guid>
    {
        //public bool DeleteFlag { get; set; }
        public bool? IsActive { get; set; }
    }
}
