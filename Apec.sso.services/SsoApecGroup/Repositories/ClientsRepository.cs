using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess.MongoDbHelper;

using MongoDB.Driver;
using DataAccess.Pagination.Base;
using DataAccess.Models.Dto;
using SsoGroup.Repositories.Interfaces;
using Microsoft.Extensions.Configuration;
using System.Linq;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace SsoGroup.Repositories
{
    internal sealed class ClientsRepository : MongoDbBase<Clients>, IClientsRepository
    {
        public ClientsRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IEnumerable<Clients>> GetAll()
        {
            var builder = Builders<Clients>.Filter;
            var filter = builder.Empty;
            return await Collection.Find(filter).ToListAsync();
        }

    }
}