

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace UserManager.Repositories.Interfaces
{
    public interface IApiScopesRepository : IMongoDbBase<ApiScopes>
    {
        public Task<IPage<ApiScopes>> Search(IPageable pageable, SearchApiScopesDto searchApiScopesDto);
    }
}