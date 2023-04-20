using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class UpdateUserLoginDto
    {
        public string UserName { get; set; } // tên đăng nhập
        public string Ip { get; set; } // Thông tin đăng nhập
        public DateTime? LoginTime { get; set; } // Thời gian đăng nhập

    }
}
