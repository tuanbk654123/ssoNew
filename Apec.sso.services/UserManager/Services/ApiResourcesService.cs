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


    internal sealed class ApiResourcesService : IApiResourcesService
    {
        private readonly IApiResourcesRepository apiResourcesRepository;


        public ApiResourcesService(IApiResourcesRepository ApiResourcesRepository)
        {
            this.apiResourcesRepository = ApiResourcesRepository;

        }

        public async Task<List<ApiResources>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var apiResources = await apiResourcesRepository.GetAllAsync();
            return apiResources;
        }

        public async Task<IPage<ApiResources>> Search(IPageable pageable, SearchApiResourceDto searchApiResourceDto)
        {
            return await apiResourcesRepository.Search(pageable, searchApiResourceDto);
        }
    }
}