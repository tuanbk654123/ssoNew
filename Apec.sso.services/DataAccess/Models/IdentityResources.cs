using AspNetCore.Identity.MongoDbCore.Models;
using IdentityServer4.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("IdentityResources")]
    public class IdentityResources : IdentityResource
    {
        public string Id { set; get; } // Id
    }
}