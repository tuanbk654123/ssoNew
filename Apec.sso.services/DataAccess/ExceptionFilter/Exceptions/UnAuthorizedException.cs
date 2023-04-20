using DataAccess.Constants;

namespace DataAccess.ExceptionFilter.Exceptions
{
    public class UnAuthorizedException : HttpCodeException
    {
        public UnAuthorizedException(string message) : base(message)
        {
        }

        protected override string GetErrorPrefix()
        {
            return ErrorConstants.UnAuthorizedMessage;
        }

        protected override int GetStatusCode()
        {
            return ErrorConstants.UnAuthorizedCode;
        }
    }
}
