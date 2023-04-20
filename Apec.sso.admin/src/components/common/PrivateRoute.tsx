// import React from 'react'
import {  Redirect, Route, RouteProps  } from 'react-router-dom';
//import Login from '../../features/auth/pages/login/Login';


export function PrivateRoute (props: RouteProps) {

  const isLoggedIn = Boolean( localStorage.getItem('access_token') && localStorage.getItem('access_token')!== 'undefined')
 
 //console.log(isLoggedIn);
  if( !isLoggedIn)
    return  (<Redirect to = "login" />);
    else
  return  <Route {...props}/>
}

