import { LisResponse, SearchApiResourcesDto, ApiResources } from "../models";
import axiosApiResources from "./axiosClient";


const apiResourcesService = {
    getAll(): Promise<LisResponse<ApiResources>>{
        const url = '/api/ApiResources';
        return axiosApiResources.get(url);
    },

    searchApiResources( search: SearchApiResourcesDto): Promise<LisResponse<ApiResources>>{
        const url = '/api/ApiResources/Search';
        return axiosApiResources.get(url, {params:{
            PageNumber:search.PageNumber,
            PageSize:search.PageSize,
            name: search.Name, 
        }});
    },

    
    addApiResources( lstApiResources: ApiResources[]): Promise<any>{
        const url = '/api/ApiResources/CreateListApiResources';
        return axiosApiResources.post(url,lstApiResources );
    },

    updateApiResources( ApiResources: ApiResources): Promise<any>{
        const url = '/api/ApiResources/UpdateApiResources';
        return axiosApiResources.post(url,ApiResources );
    },

    deleteApiResources( lstId: string[]): Promise<any>{
        const url = '/api/ApiResources/DeleteApiResources';
        return axiosApiResources.post(url,lstId );
    },


}


export default apiResourcesService;