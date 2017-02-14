import {
	SIGNIN_USER,
	SIGNIN_USER_SUCCESS,
	SIGNIN_USER_FAILURE,
	SIGNUP_USER,
	SIGNUP_USER_SUCCESS,
	SIGNUP_USER_FAILURE
} from 'actions/user';

const INITIAL_STATE = {user: null, status: null, msg: [], loading: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SIGNIN_USER:
			return {...state, user: null, loading: true, status: 'signin', msg: []}
		case SIGNIN_USER_SUCCESS:
			return {...state, user: action.payload, status: 'authenticated', loading: false, msg: ['登入成功']}
		case SIGNIN_USER_FAILURE:
		 	return {...state, user: null, msg: action.payload, loading: false, status: false}

		case SIGNUP_USER:
			return {...state, loading: true, status: 'signup', msg: []}
		case SIGNUP_USER_SUCCESS:
			return {...state, loading: false, status: 'registered', msg: ['註冊成功']}
		case SIGNUP_USER_FAILURE:
			return {...state, loading: false, status: false, msg: action.payload}
		default:
			return state
	}
}
