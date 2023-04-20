using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IClientService
    {

        Task<List<Clients>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto);
    }
}