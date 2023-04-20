using AspNetCore.Identity.MongoDbCore.Models;
using IdentityServer4.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("Clients")]
    public class Clients : Client
    {
        public string Id { set; get; } // Id
    }
}