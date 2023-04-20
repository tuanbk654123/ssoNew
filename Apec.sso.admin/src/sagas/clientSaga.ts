import { call, put, takeLatest } from 'redux-saga/effects';
import clientService from '../api/clientService';
import { openNotification } from '../components/notice/notification';
import { clientAction } from '../features/client/clientSlice';
import { LisResponse, Respone, Client } from '../models';




function* getSearchClientSaga(){
    try {
        const data:LisResponse<Client> = yield call(clientService.searchClient,{
            ClientId: "",
            ClientName: "",
            ClientUri: "",
            PageNumber:1,
            PageSize:11
        });
        //console.log("client saga : " + data);
        yield put(clientAction.searchclientSuccess(data));
      } catch (error) {
        //handle error
        console.log("Client saga error: " + error);
      }
}

export function* postSearchClient(){
    yield takeLatest(clientAction.searchclient.type ,getSearchClientSaga);
}



function* getAllClientSaga(){
  try {
      const data:Client[] = yield call(clientService.getAll);

      yield put(clientAction.getAllClientSuccess(data));
    } catch (error) {
      //handle error
      console.log("Client saga error: " + error);

    }
}

export function* postGetAllClient(){
  yield takeLatest(clientAction.getAllClient.type ,getAllClientSaga);
}




function* getAddClientSaga(action : any) {
  try {
    const data : Respone  = yield call(clientService.addClients, action.payload);

    console.log(" Client saga : ", data);
    yield put(clientAction.addClientSuccess(data));
    openNotification("Tạo quyền thành công");
  } catch (error) {
    //handle error
    console.log("Client saga error: " + error);
    openNotification("Tạo quyền thất bại");
  }
}

export function* postAddClient() {
  yield takeLatest(clientAction.addClient.type, getAddClientSaga);
}

function* getUpdateClientSaga(action : any) {
  try {
    const data : Respone  = yield call(clientService.updateClient, action.payload);

    console.log(" Client saga : ", data);
    yield put(clientAction.updateClientSuccess(data));
    openNotification("Sửa quyền thành công");
  } catch (error) {
    //handle error
    openNotification("Sửa quyền thất bại");
  }
}

export function* postUpdateClient() {
  yield takeLatest(clientAction.updateClient.type, getUpdateClientSaga);
}


function* getDeleteClientSaga(action : any) {
  try {
    const data : Respone  = yield call(clientService.deleteClients, action.payload);

    console.log(" Client saga : ", data);
    yield put(clientAction.deleteClientSuccess(data));
    openNotification("Xóa quyền thành công");
  } catch (error) {
    //handle error
    console.log("Client saga error: " + error);
    openNotification("Xóa quyền thất bại");
  }
}

export function* postDeleteClient() {
  yield takeLatest(clientAction.deleteClient.type, getDeleteClientSaga);
}


