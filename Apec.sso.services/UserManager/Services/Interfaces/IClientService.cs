using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace UserManager.Services.Interfaces
{
    public interface IClientService
    {

        Task<List<Clients>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<List<Clients>> GetByName(string name, CancellationToken cancellationToken = default);
        Task<Clients> GetById(string id, CancellationToken cancellationToken = default);
        Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto);
        Task<bool> Create(CreateClientDto createClientDto, CancellationToken cancellationToken = default);
        Task<bool> Update(Clients updateClientDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}