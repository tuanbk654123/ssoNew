import { LisResponse, searchUserHistoryDto,userHistory } from "../models";
import axiosClient from "./axiosClient";


const userLoginService = {

    searchUserLogin( search: searchUserHistoryDto): Promise<LisResponse<userHistory>>{
        const url = '/api/usersLogin/Search';
        return axiosClient.get(url, {
            params:{
                PageNumber:search.pageNumber,
                PageSize:search.pageSize,
                UserName: search.userName,
                ip: search.ip,
                fromDate: search.fromDate,
                toDate: search.toDate,
            }
        });
    },

 

}


export default userLoginService;