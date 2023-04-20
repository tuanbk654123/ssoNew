using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess.MongoDbHelper;

using UserManager.Repositories.Interfaces;
using MongoDB.Driver;
using DataAccess.Pagination.Base;
using DataAccess.Models.Dto;

namespace UserManager.Repositories
{
    internal sealed class ClientRepository : MongoDbBase<Clients>, IClientRepository
    {
        public ClientRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto)
        {
            var builder = Builders<Clients>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(searchClientDto.ClientName))
            {
                filter &= builder.Where(x => x.ClientName.Contains(searchClientDto.ClientName) );
            }
           
            var result = await Collection.Find(filter).Skip((pageable.PageNumber -1)* pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<Clients>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }
    }
}