import { call, put, takeLatest } from 'redux-saga/effects';
import roleService from '../api/roleService';
import { openNotification } from '../components/notice/notification';
import { roleAction } from '../features/role/roleSlice';
import { LisResponse, Respone, Role } from '../models';




function* getSearchRoleSaga(){
    try {
        const data:LisResponse<Role> = yield call(roleService.searchRole,{
            name: "",
            PageNumber:1,
            PageSize:11
        });
        //console.log("role saga : " + data);
        yield put(roleAction.searchroleSuccess(data));
      } catch (error) {
        //handle error
        console.log("Role saga error: " + error);
      }
}

export function* postSearchRole(){
    yield takeLatest(roleAction.searchrole.type ,getSearchRoleSaga);
}



function* getAllRoleSaga(){
  try {
      const data:Role[] = yield call(roleService.getAll);

      yield put(roleAction.getAllRoleSuccess(data));
    } catch (error) {
      //handle error
      console.log("Role saga error: " + error);

    }
}

export function* postGetAllRole(){
  yield takeLatest(roleAction.getAllRole.type ,getAllRoleSaga);
}




function* getAddRoleSaga(action : any) {
  try {
    const data : Respone  = yield call(roleService.addRoles, action.payload);

    console.log(" Role saga : ", data);
    yield put(roleAction.addRoleSuccess(data));
    openNotification("Tạo quyền thành công");
  } catch (error) {
    //handle error
    console.log("Role saga error: " + error);
    openNotification("Tạo quyền thất bại");
  }
}

export function* postAddRole() {
  yield takeLatest(roleAction.addRole.type, getAddRoleSaga);
}

function* getUpdateRoleSaga(action : any) {
  try {
    const data : Respone  = yield call(roleService.updateRole, action.payload);

    console.log(" Role saga : ", data);
    yield put(roleAction.updateRoleSuccess(data));
    openNotification("Sửa quyền thành công");
  } catch (error) {
    //handle error
    openNotification("Sửa quyền thất bại");
  }
}

export function* postUpdateRole() {
  yield takeLatest(roleAction.updateRole.type, getUpdateRoleSaga);
}


function* getDeleteRoleSaga(action : any) {
  try {
    const data : Respone  = yield call(roleService.deleteRoles, action.payload);

    console.log(" Role saga : ", data);
    yield put(roleAction.deleteRoleSuccess(data));
    openNotification("Xóa quyền thành công");
  } catch (error) {
    //handle error
    console.log("Role saga error: " + error);
    openNotification("Xóa quyền thất bại");
  }
}

export function* postDeleteRole() {
  yield takeLatest(roleAction.deleteRole.type, getDeleteRoleSaga);
}


