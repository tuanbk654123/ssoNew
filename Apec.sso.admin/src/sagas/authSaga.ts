//import {PayloadAction} from '@reduxjs/toolkit'

import { take,call, put } from 'redux-saga/effects';
import { authAction } from '../features/auth/authSlice';
import { signinRedirect,signoutRedirect} from '../api/loginService'
//import { push } from 'connected-react-router';
import { history } from '../utils/history';

 function* handleLogin(){
    try {
        yield call( signinRedirect);
        // var user = getUser();
        // console.log("handle login :",user);
        // redirect to home 
        history.push('home');
    //yield put(push('/home'));
    } catch (error) {
        yield put(
            authAction.loginFalse("Lỗi đăng nhập"));
    }
}

export function* Login(){
    yield take(authAction.login.type );
    yield call(handleLogin);
}

function* handleLogout(){
    signoutRedirect();
    console.log("handle logout");
    localStorage.removeItem('access_token');
    // redirect to login page

     //yield put(push('/login'));
     yield history.push('login'); // bỏ yield đi
}

export function* Logout(){
    yield take(authAction.logout.type );
    yield call(handleLogout);
}


// function* watchLoginFolow(){
//     while(true){
//         const isLoggedIn = localStorage.getItem('access_token');
//         if(!isLoggedIn ){
//             //const action: PayloadAction<any> = yield take(authAction.login.type);
//             yield take(authAction.login.type);
//             yield call(handleLogin);
        
//         }

        
//         yield take(authAction.logout.type);
//         yield call(handleLogout);
//     }
//     }
  

// export default function* authSaga(){
//     yield call(watchLoginFolow);
// }

