import axios from "axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import configData from "./../config.json";
const axiosClient = axios.create({
  baseURL: configData.SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
  }
})

// Add a request interceptor
axiosClient.interceptors.request.use(function (config: AxiosRequestConfig) {
  // Do something before request is sent

  config.headers!.Authorization =  'Bearer ' + localStorage.getItem('access_token');
   
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(function (response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  console.log("client :", response.status);
  if (response.status === 200)
    return response.data;
  else return response
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});



export default axiosClient;