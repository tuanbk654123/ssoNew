

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace UserManager.Repositories.Interfaces
{
    public interface IClientRepository : IMongoDbBase<Clients>
    {
        public Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto);
        public Task<List<Clients>> GetByName(string name, CancellationToken cancellationToken = default);
        public Task<bool> Delete(string id);
    }
}