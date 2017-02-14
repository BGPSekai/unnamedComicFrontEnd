import {
	SIGNIN_USER,
	SIGNIN_USER_SUCCESS,
	SIGNIN_USER_FAILURE
} from 'actions/user';

const INITIAL_STATE = {user: null, status: null, msg: [], loading: false};

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case SIGNIN_USER:
			return {...state, user: null, loading: true, status: 'authenticating', msg: []}
		case SIGNIN_USER_SUCCESS:
			return {...state, user: action.payload, status: 'authenticated', loading: false, msg: ['登入成功']}
		case SIGNIN_USER_FAILURE:
		 	return {...state, user: null, msg: action.payload, loading: false, status: false}
		default:
			return state
	}
}
