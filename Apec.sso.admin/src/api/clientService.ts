import { LisResponse, SearchClientDto, Client } from "../models";
import axiosClient from "./axiosClient";


const clientService = {
    getAll(): Promise<LisResponse<Client>>{
        const url = '/api/Clients';
        return axiosClient.get(url);
    },

    searchClient( search: SearchClientDto): Promise<LisResponse<Client>>{
        const url = '/api/Clients/Search';
        return axiosClient.get(url, {params:{
            PageNumber:search.PageNumber,
            PageSize:search.PageSize,
            ClientId: search.ClientId, 
        }});
    },

    
    addClients( lstClients: Client[]): Promise<any>{
        const url = '/api/Clients/CreateListClient';
        return axiosClient.post(url,lstClients );
    },

    updateClient( Client: Client): Promise<any>{
        const url = '/api/Clients/UpdateClient';
        return axiosClient.post(url,Client );
    },

    deleteClients( lstId: string[]): Promise<any>{
        const url = '/api/Clients/DeleteClient';
        return axiosClient.post(url,lstId );
    },


}


export default clientService;