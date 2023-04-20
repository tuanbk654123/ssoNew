import { LisResponse, SearchUserDto, User } from "../models";
import axiosClient from "./axiosClient";


const userService = {
    getAll(): Promise<LisResponse<User>>{
        const url = '/api/users';
        return axiosClient.get(url, {params:{
            PageNumber:1,
            PageSize:10,
        }});
    },

    searchUser( search: SearchUserDto): Promise<LisResponse<User>>{
        const url = '/api/users/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.PageNumber,
                PageSize:search.PageSize,
                UserName: search.username,
                PhoneNumber: search.phonenumber,
                Email: search.email,
            }
        });
    },

    addUsers( lstUsers: User[]): Promise<any>{
        const url = '/api/users/CreateListUser';
        return axiosClient.post(url,lstUsers );
    },

    updateUser( user: User): Promise<any>{
        const url = '/api/users/UpdateUser';
        return axiosClient.put(url,user );
    },

    deleteUsers( lstId: string[]): Promise<any>{
        const url = '/api/users/DeleteListUser';
        return axiosClient.post(url,lstId );
    },

}


export default userService;