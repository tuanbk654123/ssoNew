using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserManager.Services.Interfaces;

namespace UserManager.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/ApiResourcess")]
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
        //[HttpPost("CreateListApiResources")]
        //public async Task<IActionResult> CreateListApiResources(List<CreateApiResourcesDto> createApiResourcesDtos , CancellationToken cancellationToken)
        //{
        //    // Check trùng  Name
        //    foreach(var ApiResources in createApiResourcesDtos)
        //    {
        //        // kiểm tra ApiResources name có trùng chưa
        //        ApiResourcess ApiResourcesCreateCheck = await ssoGroupService.FindApiResourcesByName(ApiResources.Name);
        //        if (ApiResourcesCreateCheck != null) return BadRequest("Tên quyền đã tồn tại");
        //    }
        //    // Tạo Quyền
        //    foreach (var ApiResources in createApiResourcesDtos)
        //    {
        //        ApiResourcess appApiResources = new ApiResourcess
        //        {
        //            Name = ApiResources.Name
        //        };

        //        bool result = await ssoGroupService.CreateApiResourcess(appApiResources);

        //        if (result)
        //            return Ok("Tạo quyền thành công");
        //        else
        //            return BadRequest("Tạo quyền thất bại");
        //    }
        //    return Ok();
        //}


        //[HttpPost("UpdateApiResources")]
        //public async Task<IActionResult> UpdateApiResources(UpdateApiResourcesDto updateApiResourcesDto, CancellationToken cancellationToken)
        //{
        //   // Kiển tra ApiResources có tồn tại hay không
        //    ApiResourcess ApiResourcesUpdate = await ssoGroupService.FindApiResourcesById(updateApiResourcesDto.Id);
        //    if (ApiResourcesUpdate == null) return NotFound("Không tìm thấy Quyền");
        //    // kiểm tra user name có trùng chưa
        //    ApiResourcess ApiResourcesUpdateCheck = await ssoGroupService.FindApiResourcesByName(updateApiResourcesDto.Name);
        //    if (updateApiResourcesDto.Name != ApiResourcesUpdate.Name && ApiResourcesUpdateCheck != null)
        //    {
        //        return BadRequest("Tên người dùng đã tồn tại");
        //    }

        //    //Map các trường update
        //    ApiResourcesUpdate.Name = updateApiResourcesDto.Name;


        //    bool result = await ssoGroupService.UpdateApiResourcess(ApiResourcesUpdate);
        //    if (result)
        //        return Ok("Sửa quyền thành công");
        //    else
        //        return BadRequest("Sửa quyền thất bại");

        //}



        //[HttpPost("DeleteApiResources")]
        //public async Task<IActionResult> DeleteListUser(List<string> ListId, CancellationToken cancellationToken)
        //{
        //    foreach (var item in ListId)
        //    {
        //        // Kiểm tra người dùng có tồn tại hay không
        //        var ApiResourcesDelete = await ssoGroupService.FindApiResourcesById(item);
        //        if (ApiResourcesDelete == null) return BadRequest("Quyền id: " + item + " không tồn tại");
        //    }
        //    // Xoá người dùng
        //    foreach (var item in ListId)
        //    {
        //        var ApiResourcesDelete = await ssoGroupService.FindApiResourcesById(item);
        //        await ssoGroupService.DeleteApiResourcess(ApiResourcesDelete);
        //    }

        //    return Ok("Xoá thành công");
        //}

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchApiResourceDto searchApiResourcesDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await ApiResourcesService.Search(pageable, searchApiResourcesDto));

        }
    }
}
