

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace UserManager.Repositories.Interfaces
{
    public interface IRoleRepository : IMongoDbBase<Roles>
    {
        public Task<IPage<Roles>> Search(IPageable pageable, SearchRoleDto searchRoleDto);
    }
}