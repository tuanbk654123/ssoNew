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
    internal sealed class RoleRepository : MongoDbBase<Roles>, IRoleRepository
    {
        public RoleRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IPage<Roles>> Search(IPageable pageable, SearchRoleDto searchRoleDto)
        {
            var builder = Builders<Roles>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(searchRoleDto.Name))
            {
                filter &= builder.Where(x => x.Name.Contains(searchRoleDto.Name) );
            }
           
            var result = await Collection.Find(filter).Skip((pageable.PageNumber -1)* pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<Roles>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }
    }
}