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
    internal sealed class ApiResourcesRepository : MongoDbBase<ApiResources>, IApiResourcesRepository
    {
        public ApiResourcesRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IPage<ApiResources>> Search(IPageable pageable, SearchApiResourceDto searchApiResourceDto)
        {
            var builder = Builders<ApiResources>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(searchApiResourceDto.Name))
            {
                filter &= builder.Where(x => x.Name.Contains(searchApiResourceDto.Name) );
            }
           
            var result = await Collection.Find(filter).Skip((pageable.PageNumber -1)* pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ApiResources>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }
    }
}