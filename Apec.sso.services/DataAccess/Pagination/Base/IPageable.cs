namespace DataAccess.Pagination.Base
{
    public interface IPageable
    {
        int PageNumber { set; get; }
        int PageSize { set; get; }
    }
}
