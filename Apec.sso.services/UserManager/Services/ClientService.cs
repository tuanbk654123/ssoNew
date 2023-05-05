using UserManager.Repositories.Interfaces;

namespace UserManager.Services
{
    using DataAccess.ExceptionFilter.Exceptions;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using Mapster;

    internal sealed class ClientService : IClientService
    {
        private readonly IClientRepository clientRepository;


        public ClientService(IClientRepository ClientRepository)
        {
            this.clientRepository = ClientRepository;

        }

        public async Task<List<Clients>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var Clients = await clientRepository.GetAllAsync();
            return Clients;
        }

        public async Task<List<Clients>> GetByName(string name, CancellationToken cancellationToken = default)
        {
            var Clients = await clientRepository.GetByName(name);
            return Clients;
        }
        public async Task<bool> Create(CreateClientDto createClientDto, CancellationToken cancellationToken = default)
        {

            Clients? Client = new Clients();
            Client = createClientDto?.Adapt<Clients>();
            Client.Id = Guid.NewGuid().ToString();
            var result = await clientRepository.UpdateAsync(x => x.Id, Client, true);
            return result;
        }

        public async Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto)
        {
            return await clientRepository.Search(pageable, searchClientDto);
        }
        public async Task<bool> Update(Clients updateExportPriceDto, CancellationToken cancellationToken = default)
        {
            //var Client = updateExportPriceDto.Adapt<Clients>();
            return await clientRepository.UpdateAsync(x => x.Id, updateExportPriceDto, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ExportPrice = await clientRepository.GetByIndexAsync(x => x.Id, id);
            if (ExportPrice != null)
            {
                return await clientRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }

        public async Task<Clients> GetById(string id, CancellationToken cancellationToken = default)
        {
            var ExportPrice = await clientRepository.GetByIndexAsync(x => x.Id, id);

            return ExportPrice;

        }
    }
}