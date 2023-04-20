using RestSharp;
using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;

namespace DataAccess.Services.Interfaces
{
    public interface IInternalService
    {
        Task<(HttpStatusCode, T)> SendRequest<T>(string url, Object body, Method method, Dictionary<string, string> headers = null, Dictionary<string, object> parameters = null);
        Exception CreateException(string message);
    }
}
