import { call, put, takeLatest } from 'redux-saga/effects';
import apiResourcesService from '../api/apiResourcesService';
import { openNotification } from '../components/notice/notification';
import { apiResourcesAction } from '../features/apiResources/apiResourcesSlice';
import { LisResponse, Respone, ApiResources } from '../models';




function* getSearchApiResourcesSaga(){
    try {
        const data:LisResponse<ApiResources> = yield call(apiResourcesService.searchApiResources,{
            Name:"",
            PageNumber:1,
            PageSize:11
        });
        //console.log("apiResources saga : " + data);
        yield put(apiResourcesAction.searchapiResourcesSuccess(data));
      } catch (error) {
        //handle error
        console.log("ApiResources saga error: " + error);
      }
}

export function* postSearchApiResources(){
    yield takeLatest(apiResourcesAction.searchapiResources.type ,getSearchApiResourcesSaga);
}



function* getAllApiResourcesSaga(){
  try {
      const data:ApiResources[] = yield call(apiResourcesService.getAll);

      yield put(apiResourcesAction.getAllApiResourcesSuccess(data));
    } catch (error) {
      //handle error
      console.log("ApiResources saga error: " + error);

    }
}

export function* postGetAllApiResources(){
  yield takeLatest(apiResourcesAction.getAllApiResources.type ,getAllApiResourcesSaga);
}




function* getAddApiResourcesSaga(action : any) {
  try {
    const data : Respone  = yield call(apiResourcesService.addApiResources, action.payload);

    console.log(" ApiResources saga : ", data);
    yield put(apiResourcesAction.addApiResourcesSuccess(data));
    openNotification("Tạo apiResources thành công");
  } catch (error) {
    //handle error
    console.log("ApiResources saga error: " + error);
    openNotification("Tạo apiResources thất bại");
  }
}

export function* postAddApiResources() {
  yield takeLatest(apiResourcesAction.addApiResources.type, getAddApiResourcesSaga);
}

function* getUpdateApiResourcesSaga(action : any) {
  try {
    const data : Respone  = yield call(apiResourcesService.updateApiResources, action.payload);

    console.log(" ApiResources saga : ", data);
    yield put(apiResourcesAction.updateApiResourcesSuccess(data));
    openNotification("Sửa apiResources thành công");
  } catch (error) {
    //handle error
    openNotification("Sửa apiResources thất bại");
  }
}

export function* postUpdateApiResources() {
  yield takeLatest(apiResourcesAction.updateApiResources.type, getUpdateApiResourcesSaga);
}


function* getDeleteApiResourcesSaga(action : any) {
  try {
    const data : Respone  = yield call(apiResourcesService.deleteApiResources, action.payload);

    console.log(" ApiResources saga : ", data);
    yield put(apiResourcesAction.deleteApiResourcesSuccess(data));
    openNotification("Xóa apiResources thành công");
  } catch (error) {
    //handle error
    console.log("ApiResources saga error: " + error);
    openNotification("Xóa apiResources thất bại");
  }
}

export function* postDeleteApiResources() {
  yield takeLatest(apiResourcesAction.deleteApiResources.type, getDeleteApiResourcesSaga);
}


