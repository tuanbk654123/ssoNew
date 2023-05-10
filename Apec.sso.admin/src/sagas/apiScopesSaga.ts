import { call, put, takeLatest } from 'redux-saga/effects';
import apiScopesService from '../api/apiScopesService';
import { openNotification } from '../components/notice/notification';
import { apiScopesAction } from '../features/apiScopes/apiScopesSlice';
import { LisResponse, Respone, ApiScopes } from '../models';




function* getSearchApiScopesSaga(){
    try {
        const data:LisResponse<ApiScopes> = yield call(apiScopesService.searchApiScopes,{
            ApiScopesId: "",
            Name:"",
            PageNumber:1,
            PageSize:11
        });
        //console.log("apiScopes saga : " + data);
        yield put(apiScopesAction.searchapiScopesSuccess(data));
      } catch (error) {
        //handle error
        console.log("ApiScopes saga error: " + error);
      }
}

export function* postSearchApiScopes(){
    yield takeLatest(apiScopesAction.searchapiScopes.type ,getSearchApiScopesSaga);
}



function* getAllApiScopesSaga(){
  try {
      const data:ApiScopes[] = yield call(apiScopesService.getAll);

      yield put(apiScopesAction.getAllApiScopesSuccess(data));
    } catch (error) {
      //handle error
      console.log("ApiScopes saga error: " + error);

    }
}

export function* postGetAllApiScopes(){
  yield takeLatest(apiScopesAction.getAllApiScopes.type ,getAllApiScopesSaga);
}




function* getAddApiScopesSaga(action : any) {
  try {
    const data : Respone  = yield call(apiScopesService.addApiScopes, action.payload);

    console.log(" ApiScopes saga : ", data);
    yield put(apiScopesAction.addApiScopesSuccess(data));
    openNotification("Tạo apiScopes thành công");
  } catch (error) {
    //handle error
    console.log("ApiScopes saga error: " + error);
    openNotification("Tạo apiScopes thất bại");
  }
}

export function* postAddApiScopes() {
  yield takeLatest(apiScopesAction.addApiScopes.type, getAddApiScopesSaga);
}

function* getUpdateApiScopesSaga(action : any) {
  try {
    const data : Respone  = yield call(apiScopesService.updateApiScopes, action.payload);

    console.log(" ApiScopes saga : ", data);
    yield put(apiScopesAction.updateApiScopesSuccess(data));
    openNotification("Sửa apiScopes thành công");
  } catch (error) {
    //handle error
    openNotification("Sửa apiScopes thất bại");
  }
}

export function* postUpdateApiScopes() {
  yield takeLatest(apiScopesAction.updateApiScopes.type, getUpdateApiScopesSaga);
}


function* getDeleteApiScopesSaga(action : any) {
  try {
    const data : Respone  = yield call(apiScopesService.deleteApiScopes, action.payload);

    console.log(" ApiScopes saga : ", data);
    yield put(apiScopesAction.deleteApiScopesSuccess(data));
    openNotification("Xóa apiScopes thành công");
  } catch (error) {
    //handle error
    console.log("ApiScopes saga error: " + error);
    openNotification("Xóa apiScopes thất bại");
  }
}

export function* postDeleteApiScopes() {
  yield takeLatest(apiScopesAction.deleteApiScopes.type, getDeleteApiScopesSaga);
}


