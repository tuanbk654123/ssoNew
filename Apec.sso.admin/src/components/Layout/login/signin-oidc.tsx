import React, { useEffect } from 'react'
import { signinRedirectCallback } from '../../../api/loginService'
//  import { Redirect  } from 'react-router-dom'
import {    history  } from '../../../utils/history'
// import { useAppDispatch } from '../../../app/hooks';
// import { authAction } from '../../../features/auth/authSlice';

function SigninOidc() {
  // const dispatch = useAppDispatch();
  useEffect(() => {
    async function signinAsync() {
      await signinRedirectCallback()
      history.push('/home');
    }
    signinAsync()
  }, [])

  return (
        <div>Redirect...</div>
        // <Redirect to = "home" />

  )
}

export default SigninOidc
