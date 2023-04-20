namespace DataAccess.Pagination.Base
{
    public class Pageable : IPageable
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
