using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IApiResourcesService
    {

        Task<List<ApiResources>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IPage<ApiResources>> Search(IPageable pageable, SearchApiResourceDto searchApiResourceDto);
        Task<List<ApiResources>> GetByName(string name, CancellationToken cancellationToken = default);
        Task<ApiResources> GetById(string id, CancellationToken cancellationToken = default);
        Task<bool> Create(CreateApiResourceDto createApiResourceDto, CancellationToken cancellationToken = default);
        Task<bool> Update(ApiResources apiResources, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}