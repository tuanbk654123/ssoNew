import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LisResponse, SearchApiScopesDto, ApiScopes,Respone } from "../../models";


export interface ApiScopesState{
    lstRespone: LisResponse<ApiScopes>,
    respone:{
    status: number,
    data:string
    },

    apiScopess: ApiScopes[]
}

const initialState : ApiScopesState = {
    lstRespone: {
        pageIndex: 0,
        totalItem: 0,
        content : []
      },
      respone:{
        status: 0,
        data:""
      },
    apiScopess: []

  };
  

const apiScopesSlice = createSlice({
    name: 'apiScopes',
    initialState,
    reducers:{
        searchapiScopes(state, action: PayloadAction<SearchApiScopesDto>){
            // state.lstRespone = action.payload;
            // state.isLoggedIn = true;
            
        },
        searchapiScopesSuccess(state, action: PayloadAction<LisResponse<ApiScopes>>){
            state.lstRespone = action.payload;
        },

        getAllApiScopes(state){

        },
        getAllApiScopesSuccess(state, action: PayloadAction<ApiScopes[]>){
            state.apiScopess = action.payload;
        },

                
        addApiScopes (state, action: PayloadAction<ApiScopes[]>){
        },
        
        addApiScopesSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateApiScopes (state, action: PayloadAction<ApiScopes>){
        },

        updateApiScopesSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteApiScopes (state, action: PayloadAction<string[]>){
        },

        deleteApiScopesSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
      
    }

})

//Action
export const apiScopesAction = apiScopesSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.apiScopes.isLoggedIn 
// export const selectIsLogging = (state: any) => state.apiScopes.logging 

//reducer
export const apiScopesReducer = apiScopesSlice.reducer;

export default apiScopesReducer;