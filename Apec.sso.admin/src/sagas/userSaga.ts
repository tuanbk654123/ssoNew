//import {PayloadAction} from '@reduxjs/toolkit'

import { call, put, takeLatest } from 'redux-saga/effects';
import userService from '../api/userService';
import { openNotification } from '../components/notice/notification';
import { userAction } from '../features/user/userSlice';
import { LisResponse, User, Respone } from '../models';


function* getSearchUserSaga(action : any){
    try {
        const data:LisResponse<User> = yield call(userService.searchUser,action.payload);
        yield put(userAction.searchUserSuccess(data));
      } catch (error) {
        //handle error
        console.log("user saga error: " + error);
      }
}

export function* postSearchUser(){
    yield takeLatest(userAction.searchUser.type ,getSearchUserSaga);
}


function* getAddUserSaga(action : any) {
  try {
    const data : Respone  = yield call(userService.addUsers, action.payload);

    console.log(" user saga : ", data);
    openNotification(data);
    //yield put(userAction.addUserSuccess(data));
  } catch (error) {
    //handle error
    // yield put(userAction.updateUserSuccess({
    //   data: "Lỗi tạo người dùng",
    //   status: 500
    // }));
    // console.log("user saga error: " + error);

    openNotification("tạo người dùng thất bại");
  }
}

export function* postAddUser() {
  yield takeLatest(userAction.addUser.type, getAddUserSaga);
}

function* getUpdateUserSaga(action : any) {
  try {
    const data : Respone  = yield call(userService.updateUser, action.payload);
    openNotification(data);
    console.log(" user saga : ", data);
    yield put(userAction.updateUserSuccess(data));
  } catch (error) {
    //handle error
    //yield put(userAction.updateUserSuccess(data));
    openNotification("Sửa người dùng thất bại");
  }
}

export function* postUpdateUser() {
  yield takeLatest(userAction.updateUser.type, getUpdateUserSaga);
}


function* getDeleteUserSaga(action : any) {
  try {
    const data : Respone  = yield call(userService.deleteUsers, action.payload);

    console.log(" user saga : ", data);
    yield put(userAction.deleteUserSuccess(data));
    openNotification("Xoá người dùng thành công");
  } catch (error) {
    //handle error
    console.log("user saga error: " + error);
    openNotification("Xoá người dùng thất bại");
  }
}

export function* postDeleteUser() {
  yield takeLatest(userAction.deleteUser.type, getDeleteUserSaga);
}


