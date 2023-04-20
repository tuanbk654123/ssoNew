using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccess.Pagination.Base
{
    public class Page<T> : IPage<T> where T : class
    {
        public int PageIndex { get; set; }
        public long TotalItem { get; set; }
        public IEnumerable<T> Content { get; set; }
    }
}
