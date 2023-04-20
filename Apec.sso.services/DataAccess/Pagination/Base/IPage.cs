using System.Collections.Generic;

namespace DataAccess.Pagination.Base
{
    public interface IPage<T> where T : class
    {
        public int PageIndex { get; set; }
        public long TotalItem { get; set; }
        public IEnumerable<T> Content { get; set; }
    }
}
