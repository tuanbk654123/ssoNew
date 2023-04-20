using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class SearchUserLoginDto
    {
        public string UserName { get; set; } // tên đăng nhập
        public string Ip { get; set; } // Thông tin đăng nhập
        public DateTime? fromDate { get; set; } // 
        public DateTime? toDate { get; set; } // 
    }
}
