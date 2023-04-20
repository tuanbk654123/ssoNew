import React, { useEffect, useRef } from 'react';
import { authAction } from '../features/auth/authSlice';
import { setAuthHeader } from './axiosHeaders';
import { useAppDispatch } from '../app/hooks';
import { history } from './history';

export default function AuthProvider({ userManager: manager, store, children }) {
  const dispatch = useAppDispatch();
  let userManager = useRef();

  useEffect(() => {
    userManager.current = manager
    //let a = children;

    const onUserLoaded = (user) => {
      console.log(`user loaded: ${user}`)
      dispatch(
        authAction.loginSuccess(user)
      )
      //store.dispatch(storeUser(user))
    }

    const onUserUnloaded = () => {
      setAuthHeader(null)
      console.log(`user unloaded`)
    }

    const onAccessTokenExpiring = () => {
      console.log(`user token expiring`)
    }

    const onAccessTokenExpired = () => {
      console.log(`user token expired`)
      localStorage.removeItem("access_token");
      history.push("/login");
    }

    const onUserSignedOut = () => {
      console.log(`user signed out1`)
    }

    // events for user
    userManager.current.events.addUserLoaded(onUserLoaded)
    userManager.current.events.addUserUnloaded(onUserUnloaded)
    userManager.current.events.addAccessTokenExpiring(onAccessTokenExpiring)
    userManager.current.events.addAccessTokenExpired(onAccessTokenExpired)
    userManager.current.events.addUserSignedOut(onUserSignedOut)

    // Specify how to clean up after this effect:
    return function cleanup() {
      userManager.current.events.removeUserLoaded(onUserLoaded);
      userManager.current.events.removeUserUnloaded(onUserUnloaded);
      userManager.current.events.removeAccessTokenExpiring(onAccessTokenExpiring)
      userManager.current.events.removeAccessTokenExpired(onAccessTokenExpired)
      userManager.current.events.removeUserSignedOut(onUserSignedOut)
    };
  }, [manager, store,dispatch]);

  return (
    React.Children.only(children)
  )
}