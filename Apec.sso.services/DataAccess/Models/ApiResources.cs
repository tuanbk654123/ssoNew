using AspNetCore.Identity.MongoDbCore.Models;
using IdentityServer4.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("ApiResources")]
    public class ApiResources : ApiResource
    {
        public string Id { set; get; } // Id
    }
}