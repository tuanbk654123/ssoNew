using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using UserManager.Repositories.Interfaces;

namespace UserManager.Services
{
    using System;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using Microsoft.AspNetCore.DataProtection.KeyManagement;
    using Microsoft.AspNetCore.Http;
    using UserManager.Repositories;


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

        public async Task<IPage<Clients>> Search(IPageable pageable, SearchClientDto searchClientDto)
        {
            return await clientRepository.Search(pageable, searchClientDto);
        }
    }
}