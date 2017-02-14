import FetchModule from 'module/FetchModule';
import apiUrl from 'res/apiUrl';
//signIn user
export const SIGNIN_USER = 'SIGNIN_USER'
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS'
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE'

//signUp user
export const SIGNUP_USER = 'SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE'

//使用者登出
export const LOGOUT_USER = 'LOGOUT_USER'
//登入
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
  }
}
//登入失敗
export const signInUserFailure = (message) => {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: message
  }
}
//註冊
export const signUpUser = (formValues) => {
  let request = new FetchModule().sendAuthPost(apiUrl.register, formValues)
  return {
    type: SIGNUP_USER,
    payload: request
  }
}

export const signUpUserSuccess = () => {
  return {
    type: SIGNUP_USER_SUCCESS
  }
}

export const signUpUserFailure = (message) => {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: message
  }
}

//登出
export const logOut = () => {
  return {
    type: LOGOUT_USER
  }
}
