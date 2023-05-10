using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using Mapster;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManager.Services.Interfaces;

namespace UserManager.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/ApiResources")]
    public class ApiResourcesController : ControllerBase
    {
        private readonly IApiResourcesService ApiResourcesService;
        public ApiResourcesController(IApiResourcesService ApiResourcesService)
        {
            this.ApiResourcesService = ApiResourcesService;
        }

        [HttpGet]
        public async Task<IActionResult> GetApiResources(CancellationToken cancellationToken)
        {
            var ApiResourcess = await ApiResourcesService.GetAllAsync(cancellationToken);
            return Ok(ApiResourcess);
        }
        [HttpPost("CreateListApiResources")]
        public async Task<IActionResult> Create(List<CreateApiResourceDto> createApiResourcesDtos, CancellationToken cancellationToken)
        {
            // Check trùng  Name
            foreach (var apiResources in createApiResourcesDtos)
            {
                // kiểm tra ApiResources name có trùng chưa
                List<ApiResources> ApiResourcesCreateCheck = await ApiResourcesService.GetByName(apiResources.Name);
                if (ApiResourcesCreateCheck != null && ApiResourcesCreateCheck.Count > 0) return BadRequest("Tên ApiResources đã tồn tại");
            }
            // Tạo ApiResources
            foreach (var ApiResources in createApiResourcesDtos)
            {

                bool result = await ApiResourcesService.Create(ApiResources);

                if (result)
                    return Ok("Tạo ApiResources thành công");
                else
                    return BadRequest("Tạo ApiResources thất bại");
            }
            return Ok();
        }


        [HttpPost("UpdateApiResources")]
        public async Task<IActionResult> Update(UpdateApiResourceDto updateApiResourcesDto, CancellationToken cancellationToken)
        {

            ApiResources ApiResourcesCreateCheck = await ApiResourcesService.GetById(updateApiResourcesDto.Id);
            //ApiResourcesCreateCheck.Description = updateApiResourcesDto.Description;
            //ApiResourcesCreateCheck.ApiResourcesName = updateApiResourcesDto.ApiResourcesName;
            ApiResourcesCreateCheck = updateApiResourcesDto.Adapt<ApiResources>();
            // Sửa ApiResources

            bool result = await ApiResourcesService.Update(ApiResourcesCreateCheck);

            if (result)
                return Ok("Sửa ApiResources thành công");
            else
                return BadRequest("Sửa ApiResources thất bại");
        }



        [HttpPost("DeleteApiResources")]
        public async Task<IActionResult> Delete(List<string> ListId, CancellationToken cancellationToken)
        {
            //foreach (var item in ListId)
            //{
            //    // Kiểm tra người dùng có tồn tại hay không
            //    var ApiResourcesDelete = await ssoGroupService.FindApiResourcesById(item);
            //    if (ApiResourcesDelete == null) return BadRequest("Quyền id: " + item + " không tồn tại");
            //}
            // Xoá ApiResources
            foreach (var item in ListId)
            {
                await ApiResourcesService.Delete(item);
            }

            return Ok("Xoá thành công");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchApiResourceDto searchApiResourcesDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await ApiResourcesService.Search(pageable, searchApiResourcesDto));

        }
    }
}
