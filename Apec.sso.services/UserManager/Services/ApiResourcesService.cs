using UserManager.Repositories.Interfaces;

namespace UserManager.Services
{
    using DataAccess.ExceptionFilter.Exceptions;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using Mapster;
    using System;


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

        public async Task<List<ApiResources>> GetByName(string name, CancellationToken cancellationToken = default)
        {
            var Clients = await apiResourcesRepository.GetByName(name);
            return Clients;
        }
        public async Task<bool> Create(CreateApiResourceDto createApiResourceDto, CancellationToken cancellationToken = default)
        {

            ApiResources? apiResources = new ApiResources();
            apiResources = createApiResourceDto?.Adapt<ApiResources>();
            apiResources.Id = Guid.NewGuid().ToString();
            var result = await apiResourcesRepository.UpdateAsync(x => x.Id, apiResources, true);
            return result;
        }


        public async Task<ApiResources> GetById(string id, CancellationToken cancellationToken = default)
        {
            var ExportPrice = await apiResourcesRepository.GetByIndexAsync(x => x.Id, id);

            return ExportPrice;

        }
        public async Task<bool> Update(ApiResources apiScopes, CancellationToken cancellationToken = default)
        {
            //var Client = updateExportPriceDto.Adapt<Clients>();
            return await apiResourcesRepository.UpdateAsync(x => x.Id, apiScopes, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ExportPrice = await apiResourcesRepository.GetByIndexAsync(x => x.Id, id);
            if (ExportPrice != null)
            {
                return await apiResourcesRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
    }
}