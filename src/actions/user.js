import FetchModule from 'module/FetchModule';
import apiUrl from 'res/apiUrl';
//sign in user
export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE'

//使用者登出
export const LOGOUT_USER = 'LOGOUT_USER'

export const signInUser = (formValues) => {
  let request = new FetchModule().sendAuthPost(apiUrl.auth, formValues)
  return {
    type: SIGNIN_USER,
    payload: request
  }
}

//登入成功
export const signInUserSuccess = (currentUser) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: currentUser
  };
}

export const signInUserFailure = (message) => {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: message
  };
}

export const logOut = () => {
  return {
    type: LOGOUT_USER
  }
}
