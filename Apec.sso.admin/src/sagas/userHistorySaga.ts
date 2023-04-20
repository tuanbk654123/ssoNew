import { call, put, takeLatest } from 'redux-saga/effects';
import userLoginService from '../api/userLoginService';
import { UserHistoryAction } from '../features/history/historySlice';
import { LisResponse, userHistory } from '../models';

function* getSearchUserHistorySaga(action : any){
    try {
        const data:LisResponse<userHistory> = yield call(userLoginService.searchUserLogin,action.payload);
        yield put(UserHistoryAction.searchUserHistorySuccess(data));
      } catch (error) {
        //handle error
        console.log("user history saga error: " + error);
      }
}

export function* postSearchUserHistory(){
    yield takeLatest(UserHistoryAction.searchUserHistory.type ,getSearchUserHistorySaga);
}

