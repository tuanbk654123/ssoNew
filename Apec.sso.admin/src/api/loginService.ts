import { UserManager } from 'oidc-client';
import configData from "./../config.json";
import axiosClient from './axiosClient';
const config = {
  authority: configData.authority,
  client_id: configData.client_id,//wewantdoughnuts
  redirect_uri: configData.redirect_uri,
  response_type: configData.response_type,
  scope: configData.scope,
  post_logout_redirect_uri: configData.post_logout_redirect_uri,
};

const userManager = new UserManager(config)

// export async function signoutRedirect(store) {
//   try {
//     let user = await userManager.getUser()
//     if (!user) { return store.dispatch(storeUserError()) }
//     store.dispatch(storeUser(user))
//   } catch (e) {
//     console.error(`User not found: ${e}`)
//     store.dispatch(storeUserError())
//   }
// }
export async function getUser() {
  return  await userManager.getUser()
}

export async function signinRedirect() {
  return await userManager.signinRedirect()
}

export function signinRedirectCallback() {
  return userManager.signinRedirectCallback()
  .then((user) => {
    console.log(`user loaded: ${user}`)

    // window.location.href = 'http://localhost:3000';
  })   
}

export function signoutRedirect() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirect()
}

export function signoutRedirectCallback() {
  userManager.clearStaleState()
  userManager.removeUser()
  return userManager.signoutRedirectCallback()
}

export default userManager