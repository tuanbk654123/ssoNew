import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LisResponse, SearchApiResourcesDto, ApiResources,Respone } from "../../models";


export interface ApiResourcesState{
    lstRespone: LisResponse<ApiResources>,
    respone:{
    status: number,
    data:string
    },

    apiResourcess: ApiResources[]
}

const initialState : ApiResourcesState = {
    lstRespone: {
        pageIndex: 0,
        totalItem: 0,
        content : []
      },
      respone:{
        status: 0,
        data:""
      },
    apiResourcess: []

  };
  

const apiResourcesSlice = createSlice({
    name: 'apiResources',
    initialState,
    reducers:{
        searchapiResources(state, action: PayloadAction<SearchApiResourcesDto>){
            // state.lstRespone = action.payload;
            // state.isLoggedIn = true;
            
        },
        searchapiResourcesSuccess(state, action: PayloadAction<LisResponse<ApiResources>>){
            state.lstRespone = action.payload;
        },

        getAllApiResources(state){

        },
        getAllApiResourcesSuccess(state, action: PayloadAction<ApiResources[]>){
            state.apiResourcess = action.payload;
        },

                
        addApiResources (state, action: PayloadAction<ApiResources[]>){
        },
        
        addApiResourcesSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateApiResources (state, action: PayloadAction<ApiResources>){
        },

        updateApiResourcesSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteApiResources (state, action: PayloadAction<string[]>){
        },

        deleteApiResourcesSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
      
    }

})

//Action
export const apiResourcesAction = apiResourcesSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.apiResources.isLoggedIn 
// export const selectIsLogging = (state: any) => state.apiResources.logging 

//reducer
export const apiResourcesReducer = apiResourcesSlice.reducer;

export default apiResourcesReducer;