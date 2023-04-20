using System.Threading;
using System.Threading.Tasks;
using UserManager.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Linq;

using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System;

using Microsoft.Extensions.Caching.Distributed;
using System.Net;

using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;

using System.Text;
using DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using UserManager.Services;
using DataAccess.ExceptionFilter.Exceptions;
using DataAccess.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace UserManager.Controllers
{
    [ApiController]
    //[Authorize]
    [Route("api/Clients")]
    public class ClientController : ControllerBase
    {
        private readonly IClientService ClientService;
        public ClientController(IClientService ClientService)
        {
            this.ClientService = ClientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetClient(CancellationToken cancellationToken)
        {
            var Clients = await ClientService.GetAllAsync(cancellationToken);
            return Ok(Clients);
        }
        //[HttpPost("CreateListClient")]
        //public async Task<IActionResult> CreateListClient(List<CreateClientDto> createClientDtos , CancellationToken cancellationToken)
        //{
        //    // Check trùng  Name
        //    foreach(var Client in createClientDtos)
        //    {
        //        // kiểm tra Client name có trùng chưa
        //        Clients ClientCreateCheck = await ssoGroupService.FindClientByName(Client.Name);
        //        if (ClientCreateCheck != null) return BadRequest("Tên quyền đã tồn tại");
        //    }
        //    // Tạo Quyền
        //    foreach (var Client in createClientDtos)
        //    {
        //        Clients appClient = new Clients
        //        {
        //            Name = Client.Name
        //        };

        //        bool result = await ssoGroupService.CreateClients(appClient);

        //        if (result)
        //            return Ok("Tạo quyền thành công");
        //        else
        //            return BadRequest("Tạo quyền thất bại");
        //    }
        //    return Ok();
        //}


        //[HttpPost("UpdateClient")]
        //public async Task<IActionResult> UpdateClient(UpdateClientDto updateClientDto, CancellationToken cancellationToken)
        //{
        //   // Kiển tra Client có tồn tại hay không
        //    Clients ClientUpdate = await ssoGroupService.FindClientById(updateClientDto.Id);
        //    if (ClientUpdate == null) return NotFound("Không tìm thấy Quyền");
        //    // kiểm tra user name có trùng chưa
        //    Clients ClientUpdateCheck = await ssoGroupService.FindClientByName(updateClientDto.Name);
        //    if (updateClientDto.Name != ClientUpdate.Name && ClientUpdateCheck != null)
        //    {
        //        return BadRequest("Tên người dùng đã tồn tại");
        //    }

        //    //Map các trường update
        //    ClientUpdate.Name = updateClientDto.Name;


        //    bool result = await ssoGroupService.UpdateClients(ClientUpdate);
        //    if (result)
        //        return Ok("Sửa quyền thành công");
        //    else
        //        return BadRequest("Sửa quyền thất bại");

        //}



        //[HttpPost("DeleteClient")]
        //public async Task<IActionResult> DeleteListUser(List<string> ListId, CancellationToken cancellationToken)
        //{
        //    foreach (var item in ListId)
        //    {
        //        // Kiểm tra người dùng có tồn tại hay không
        //        var ClientDelete = await ssoGroupService.FindClientById(item);
        //        if (ClientDelete == null) return BadRequest("Quyền id: " + item + " không tồn tại");
        //    }
        //    // Xoá người dùng
        //    foreach (var item in ListId)
        //    {
        //        var ClientDelete = await ssoGroupService.FindClientById(item);
        //        await ssoGroupService.DeleteClients(ClientDelete);
        //    }

        //    return Ok("Xoá thành công");
        //}

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchClientDto searchClientDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok(await ClientService.Search(pageable, searchClientDto));

        }
    }
}
