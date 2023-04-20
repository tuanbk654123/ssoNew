import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LisResponse, SearchRoleDto, Role,Respone } from "../../models";


export interface RoleState{
    lstRespone: LisResponse<Role>,
    respone:{
    status: number,
    data:string
    },

    roles: Role[]
}

const initialState : RoleState = {
    lstRespone: {
        pageIndex: 0,
        totalItem: 0,
        content : []
      },
      respone:{
        status: 0,
        data:""
      },
    roles: []

  };
  

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers:{
        searchrole(state, action: PayloadAction<SearchRoleDto>){
            // state.lstRespone = action.payload;
            // state.isLoggedIn = true;
            
        },
        searchroleSuccess(state, action: PayloadAction<LisResponse<Role>>){
            state.lstRespone = action.payload;
        },

        getAllRole(state){

        },
        getAllRoleSuccess(state, action: PayloadAction<Role[]>){
            state.roles = action.payload;
        },

                
        addRole (state, action: PayloadAction<Role[]>){
        },
        
        addRoleSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateRole (state, action: PayloadAction<Role>){
        },

        updateRoleSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteRole (state, action: PayloadAction<string[]>){
        },

        deleteRoleSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
      
    }

})

//Action
export const roleAction = roleSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.role.isLoggedIn 
// export const selectIsLogging = (state: any) => state.role.logging 

//reducer
export const roleReducer = roleSlice.reducer;

export default roleReducer;