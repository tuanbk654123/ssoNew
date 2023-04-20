import { all } from 'redux-saga/effects';
import { Login, Logout } from './authSaga';
import { postGetAllRole, postSearchRole, postAddRole, postUpdateRole, postDeleteRole } from './roleSaga';
import { postGetAllClient, postSearchClient, postAddClient, postUpdateClient, postDeleteClient } from './clientSaga';
import { postSearchUserHistory } from './userHistorySaga';
import { postSearchUser, postAddUser, postDeleteUser, postUpdateUser } from './userSaga';

export default function* rootSaga() {
     yield all([ // gọi nhiều saga
          Login(),
          Logout(),

          // user
          postSearchUser(),
          postAddUser(),
          postDeleteUser(),
          postUpdateUser(),

          //role
          postGetAllRole(),
          postSearchRole(),
          postAddRole(),
          postUpdateRole(),
          postDeleteRole(),

          // history 
          postSearchUserHistory(),

          //client
          postGetAllClient(),
          postSearchClient(),
          postAddClient(),
          postUpdateClient(),
          postDeleteClient(),
     ]);
}
