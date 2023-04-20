using DataAccess.Constants;

namespace DataAccess.ExceptionFilter.Exceptions
{
    public class ForbidenException : HttpCodeException
    {
        public ForbidenException(string message) : base(message)
        {
        }

        protected override string GetErrorPrefix()
        {
            return ErrorConstants.ForbidenMessage;
        }

        protected override int GetStatusCode()
        {
            return ErrorConstants.ForbidenCode;
        }
    }
}
