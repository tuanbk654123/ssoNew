using AspNetCore.Identity.MongoDbCore.Models;
using IdentityServer4.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("ApiScopes")]
    public class ApiScopes : ApiScope
    {
        public string Id { set; get; } // Id
    }
}