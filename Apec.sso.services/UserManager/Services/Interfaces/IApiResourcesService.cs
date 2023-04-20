using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IApiResourcesService
    {

        Task<List<ApiResources>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IPage<ApiResources>> Search(IPageable pageable, SearchApiResourceDto searchApiResourceDto);
    }
}