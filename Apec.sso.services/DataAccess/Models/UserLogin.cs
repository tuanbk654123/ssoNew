using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("UserLogin")]
    public class UserLogin
    {
        public string Id { set; get; } // Id
        //public string FullName { get; set; } // tên 
        public string UserName { get; set; } // tên đăng nhập
        public string Ip { get; set; } // Thông tin đăng nhập
        public DateTime? LoginTime { get; set; } // Thời gian đăng nhập

    }
}
