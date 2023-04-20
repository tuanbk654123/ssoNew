
import axiosClient from '../api/axiosClient'

export function setAuthHeader( token : string) {
  console.log("setAuthHeader token: "+ token);
  axiosClient.defaults.headers.common['Authorization'] = token ? 'Bearer ' + token : '';
  axiosClient.defaults.headers.common['Content-Type'] =  'application/json'
  
}

