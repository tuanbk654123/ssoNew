using System;
using System.Collections.Generic;

using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
//using System.Text.Json.Nodes;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

using DataAccess.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using RestSharp;


namespace DataAccess.Services
{
    public abstract class Base : IInternalService
    {
        protected readonly IConfiguration Configuration;        
        protected string BaseUrl;
        protected byte[] JwtSecretToken;

        protected Base(IConfiguration configuration)
        {
            Configuration = configuration;

            JwtSecretToken = Encoding.ASCII.GetBytes(configuration.GetValue<string>("Jwt:Key", "0"));
        }

        protected string GenerateToken()
        {
    
            return $"Bear ";
        }


        public async Task<(HttpStatusCode, T)> SendRequest<T>(string url, Object body, Method method, Dictionary<string, string> headers = null, 
            Dictionary<string, object> parameters = null)
        {
            //var client = new RestClient(BaseUrl);
            var options = new RestClientOptions(BaseUrl)
            {
                RemoteCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true
            };
            var client = new RestClient(options);

            var request = new RestRequest(url, method);
            request.RequestFormat = DataFormat.Json;
            
            if (headers != null)
            {
                foreach (var header in headers) request.AddHeader(header.Key, header.Value);
            }

            if(parameters != null)
            {
                foreach (var parameter in parameters) request.AddParameter(parameter.Key, parameter.Value);
            }

            if (body != null) request.AddJsonBody(body);

            var response = await client.ExecuteAsync(request);

            try
            {
                if(typeof(T) == typeof(NullClass)) 
                {
                    return (response.StatusCode, default(T));
                }
                else if(response.StatusCode == HttpStatusCode.OK)
                {
                    var option = new JsonSerializerOptions();
                    option.PropertyNameCaseInsensitive = true;
                    option.Converters.Add(new JsonStringEnumConverter());
                    if(typeof(T) == typeof(string))
                    {
                        return (response.StatusCode, (T)(object)response.Content);
                    }
                    if (IsValidJson(response.Content))
                    {
                        var result = JsonSerializer.Deserialize<T>(response.Content, option);

                        return (response.StatusCode, result);
                    } else
                    {
                        return (response.StatusCode, default(T));
                    }

                }
            }
            catch (Exception e)
            {
                Console.WriteLine("BaseService : "+ e);
                //Log.Error(e, $"${BaseUrl}{url}, ({response.StatusCode}), response: {response.Content}");
            }

            return (response.StatusCode, default(T));
        }

        private static bool IsValidJson(string strInput)
        {
            if (string.IsNullOrWhiteSpace(strInput)) { return false; }
            strInput = strInput.Trim();
            if ((strInput.StartsWith("{") && strInput.EndsWith("}")) || //For object
                (strInput.StartsWith("[") && strInput.EndsWith("]"))) //For array
            {
                try
                {
                    var tmpObj = JToken.Parse(strInput);
                    return true;
                }
                catch (Exception ex) 
                {
                    Console.WriteLine("BaseService : " + ex);
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public abstract Exception CreateException(string message);
    }

    public class NullClass
    {
    }

}