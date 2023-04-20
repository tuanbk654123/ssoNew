

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace UserManager.Repositories.Interfaces
{
    public interface IClientRepository : IMongoDbBase<Clients>
    {
        public Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto);
    }
}