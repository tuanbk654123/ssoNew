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
    internal sealed class ApiScopesRepository : MongoDbBase<ApiScopes>, IApiScopesRepository
    {
        public ApiScopesRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IPage<ApiScopes>> Search(IPageable pageable, SearchApiScopesDto searchApiScopesDto)
        {
            var builder = Builders<ApiScopes>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(searchApiScopesDto.Name))
            {
                filter &= builder.Where(x => x.Name.Contains(searchApiScopesDto.Name) );
            }
           
            var result = await Collection.Find(filter).Skip((pageable.PageNumber -1)* pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ApiScopes>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }
    }
}