

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SsoGroup.Repositories.Interfaces
{
    public interface IClientsRepository : IMongoDbBase<Clients>
    {
        public Task<IEnumerable<Clients>> GetAll();
    }
}