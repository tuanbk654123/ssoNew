using System.Collections.Generic;

namespace DataAccess.Models.Dto
{
    public class UpdateFromRoleDto
    {
        public List<string> RoleIdUpdate { get; set; }
        public List<string> RoleIdDelete { get; set; }
        public Users Users { get; set; }
    }
}
