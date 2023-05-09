import { LisResponse, SearchRoleDto, Role } from "../models";
import axiosClient from "./axiosClient";


const roleService = {
    getAll(): Promise<LisResponse<Role>>{
        const url = '/api/Roles';
        return axiosClient.get(url);
    },

    searchRole( search: SearchRoleDto): Promise<LisResponse<Role>>{
        const url = '/api/Roles/Search';
        return axiosClient.get(url, {params:{
            PageNumber:search.PageNumber,
            PageSize:search.PageSize,
            Name: search.name, 
        }});
    },

    
    addRoles( lstRoles: Role[]): Promise<any>{
        const url = '/api/Roles/CreateListRole';
        return axiosClient.post(url,lstRoles );
    },

    updateRole( Role: Role): Promise<any>{
        const url = '/api/Roles/UpdateRole';
        return axiosClient.post(url,Role );
    },

    deleteRoles( lstId: string[]): Promise<any>{
        const url = '/api/Roles/DeleteRole';
        return axiosClient.post(url,lstId );
    },


}


export default roleService;