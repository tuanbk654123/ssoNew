using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper;
using DataAccess.Pagination.Base;
using MongoDB.Driver;
using UserManager.Repositories.Interfaces;

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
                filter &= builder.Where(x => x.Name.Contains(searchApiScopesDto.Name));
            }

            var result = await Collection.Find(filter).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ApiScopes>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

        public async Task<List<ApiScopes>> GetByName(string name, CancellationToken cancellationToken = default)
        {
            var builder = Builders<ApiScopes>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(name))
            {
                filter &= builder.Where(x => x.Name.Contains(name));
            }

            var result = await Collection.Find(filter).ToListAsync();

            return result;
        }


        public async Task<bool> Delete(string id)
        {
            var builder = Builders<ApiScopes>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
    }
}