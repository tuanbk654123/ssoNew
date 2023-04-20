import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LisResponse, SearchClientDto, Client,Respone } from "../../models";


export interface ClientState{
    lstRespone: LisResponse<Client>,
    respone:{
    status: number,
    data:string
    },

    clients: Client[]
}

const initialState : ClientState = {
    lstRespone: {
        pageIndex: 0,
        totalItem: 0,
        content : []
      },
      respone:{
        status: 0,
        data:""
      },
    clients: []

  };
  

const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers:{
        searchclient(state, action: PayloadAction<SearchClientDto>){
            // state.lstRespone = action.payload;
            // state.isLoggedIn = true;
            
        },
        searchclientSuccess(state, action: PayloadAction<LisResponse<Client>>){
            state.lstRespone = action.payload;
        },

        getAllClient(state){

        },
        getAllClientSuccess(state, action: PayloadAction<Client[]>){
            state.clients = action.payload;
        },

                
        addClient (state, action: PayloadAction<Client[]>){
        },
        
        addClientSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateClient (state, action: PayloadAction<Client>){
        },

        updateClientSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteClient (state, action: PayloadAction<string[]>){
        },

        deleteClientSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
      
    }

})

//Action
export const clientAction = clientSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.client.isLoggedIn 
// export const selectIsLogging = (state: any) => state.client.logging 

//reducer
export const clientReducer = clientSlice.reducer;

export default clientReducer;