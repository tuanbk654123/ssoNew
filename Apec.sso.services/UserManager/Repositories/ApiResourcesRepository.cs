using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper;
using DataAccess.Pagination.Base;
using MongoDB.Driver;
using UserManager.Repositories.Interfaces;

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
                filter &= builder.Where(x => x.Name.Contains(searchApiResourceDto.Name));
            }

            var result = await Collection.Find(filter).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ApiResources>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }
        public async Task<List<ApiResources>> GetByName(string name, CancellationToken cancellationToken = default)
        {
            var builder = Builders<ApiResources>.Filter;
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
            var builder = Builders<ApiResources>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
    }
}