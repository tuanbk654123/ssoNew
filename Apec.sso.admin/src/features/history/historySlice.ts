import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LisResponse, searchUserHistoryDto,userHistory } from "../../models";


export interface UserHistoryState{
    lstRespone: LisResponse<userHistory>,
    respone:{
    status: number,
    data:string
    }
}

const initialState : UserHistoryState = {
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
  

const UserHistorySlice = createSlice({
    name: 'UserHistory',
    initialState,
    reducers:{
        searchUserHistory(state, action: PayloadAction<searchUserHistoryDto>){
            // state.lstRespone = action.payload;
            // state.isLoggedIn = true;
            
        },
        searchUserHistorySuccess(state, action: PayloadAction<LisResponse<userHistory>>){
            state.lstRespone = action.payload;
        },

    }

})

//Action
export const UserHistoryAction = UserHistorySlice.actions;

//selecttor
// export const selectIsLoggedIn = (state: any) => state.UserHistory.isLoggedIn 
// export const selectIsLogging = (state: any) => state.UserHistory.logging 

//reducer
export const userHistoryReducer = UserHistorySlice.reducer;

export default userHistoryReducer;