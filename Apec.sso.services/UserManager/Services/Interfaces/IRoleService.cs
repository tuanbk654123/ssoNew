using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IRoleService
    {

        Task<List<Roles>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IPage<Roles>> Search(IPageable pageable, SearchRoleDto searchRoleDto);
    }
}