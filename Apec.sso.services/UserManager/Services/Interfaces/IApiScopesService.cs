using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IApiScopesService
    {

        Task<List<ApiScopes>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IPage<ApiScopes>> Search(IPageable pageable, SearchApiScopesDto searchApiScopesDto);
    }
}