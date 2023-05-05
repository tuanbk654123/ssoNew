using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper;
using DataAccess.Pagination.Base;
using MongoDB.Driver;
using UserManager.Repositories.Interfaces;

namespace UserManager.Repositories
{
    internal sealed class ClientRepository : MongoDbBase<Clients>, IClientRepository
    {
        public ClientRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<List<Clients>> GetByName(string name, CancellationToken cancellationToken = default)
        {
            var builder = Builders<Clients>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(name))
            {
                filter &= builder.Where(x => x.ClientName.Contains(name));
            }

            var result = await Collection.Find(filter).ToListAsync();

            return result;
        }

        public async Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto)
        {
            var builder = Builders<Clients>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(searchClientDto.ClientName))
            {
                filter &= builder.Where(x => x.ClientName.Contains(searchClientDto.ClientName));
            }

            var result = await Collection.Find(filter).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<Clients>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<Clients>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
    }
}