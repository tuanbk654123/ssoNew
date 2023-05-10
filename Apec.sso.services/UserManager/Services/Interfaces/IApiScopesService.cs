using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IApiScopesService
    {

        Task<List<ApiScopes>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<List<ApiScopes>> GetByName(string name, CancellationToken cancellationToken = default);
        Task<ApiScopes> GetById(string id, CancellationToken cancellationToken = default);
        Task<bool> Create(CreateApiScopesDto createApiScopesDto, CancellationToken cancellationToken = default);
        Task<bool> Update(ApiScopes apiScopes, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
        Task<IPage<ApiScopes>> Search(IPageable pageable, SearchApiScopesDto searchApiScopesDto);
    }
}