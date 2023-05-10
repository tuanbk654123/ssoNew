import { LisResponse, SearchApiScopesDto, ApiScopes } from "../models";
import axiosApiScopes from "./axiosClient";


const apiScopesService = {
    getAll(): Promise<LisResponse<ApiScopes>>{
        const url = '/api/ApiScopes';
        return axiosApiScopes.get(url);
    },

    searchApiScopes( search: SearchApiScopesDto): Promise<LisResponse<ApiScopes>>{
        const url = '/api/ApiScopes/Search';
        return axiosApiScopes.get(url, {params:{
            PageNumber:search.PageNumber,
            PageSize:search.PageSize,
            ApiScopesId: search.ApiScopesId, 
            name: search.Name, 
        }});
    },

    
    addApiScopes( lstApiScopes: ApiScopes[]): Promise<any>{
        const url = '/api/ApiScopes/CreateListApiScopes';
        return axiosApiScopes.post(url,lstApiScopes );
    },

    updateApiScopes( ApiScopes: ApiScopes): Promise<any>{
        const url = '/api/ApiScopes/UpdateApiScopes';
        return axiosApiScopes.post(url,ApiScopes );
    },

    deleteApiScopes( lstId: string[]): Promise<any>{
        const url = '/api/ApiScopes/DeleteApiScopes';
        return axiosApiScopes.post(url,lstId );
    },


}


export default apiScopesService;