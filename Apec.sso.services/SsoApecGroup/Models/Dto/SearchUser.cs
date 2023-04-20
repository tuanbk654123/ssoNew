using System.ComponentModel.DataAnnotations;

namespace SsoGroup.Models
{
    public class SearchUser
    {

        public string UserName { get; set; }
        public string Email { get; set; }

        public int  NumberPage { get; set; }
        public string PageSize { get; set; }
    }
}
