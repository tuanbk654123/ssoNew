using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("Roles")]
    public class Roles : MongoIdentityRole<Guid>
    {
        public string Description { get; set; }
    }
}