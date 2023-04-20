import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LisResponse, Respone, SearchUserDto, User } from "../../models";


export interface UserState{
    lstRespone: LisResponse<User>,
    respone:{
    status: number,
    data:string
    }
}

const initialState : UserState = {
    lstRespone: {
        pageIndex: 0,
        totalItem: 0,
        content : []
      },
    respone:{
    status: 0,
    data:""
    }
  };
  

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        searchUser(state, action: PayloadAction<SearchUserDto>){
            // state.lstRespone = action.payload;
            // state.isLoggedIn = true;
            
        },
        searchUserSuccess(state, action: PayloadAction<LisResponse<User>>){
            state.lstRespone = action.payload;
        },
        
        addUser (state, action: PayloadAction<User[]>){
        },
        
        addUserSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        updateUser (state, action: PayloadAction<User>){
        },

        updateUserSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        },

        deleteUser (state, action: PayloadAction<string[]>){
        },

        deleteUserSuccess (state, action: PayloadAction<Respone>){
            state.respone = action.payload;
        }
    }

})

//Action
export const userAction = userSlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.user.isLoggedIn 
// export const selectIsLogging = (state: any) => state.user.logging 

//reducer
export const userReducer = userSlice.reducer;

export default userReducer;