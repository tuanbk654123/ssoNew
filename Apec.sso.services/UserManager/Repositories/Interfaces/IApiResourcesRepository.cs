

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace UserManager.Repositories.Interfaces
{
    public interface IApiResourcesRepository : IMongoDbBase<ApiResources>
    {
        public Task<IPage<ApiResources>> Search(IPageable pageable, SearchApiResourceDto searchRoleDto);
        public Task<List<ApiResources>> GetByName(string name, CancellationToken cancellationToken = default);
        public Task<bool> Delete(string id);
    }
}