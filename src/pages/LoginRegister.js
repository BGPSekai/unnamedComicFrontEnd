import { connect } from 'react-redux'
import { signInUser, signInUserSuccess, signInUserFailure, signUpUser, signUpUserSuccess, signUpUserFailure } from 'actions/user'
import UserModule from 'module/UserModule'
import LoginRegister from 'views/LoginRegister'

const mapStateToProps = (state, stateProps = {}) => {
	return state;
}

const mapDispatchToProps = (dispatch) => {
	return {
		signInUser: (formValues) => {
				dispatch(signInUser(formValues))
				.then((response) => {
					let res = response.payload;
					if (res.status === 'success') {

						UserModule.setUserInfo(Object.assign({}, {
							remeber: formValues.remeber,
							timeStamp: Math.floor(new Date().getTime() / 1000),
							jwt: res.token,
							...formValues
						}))

						UserModule.updateInfo().then((data) => {
							dispatch(signInUserSuccess(data.user))
						})

					}
					else
						dispatch(signInUserFailure(res.message))
				})
		},
		signUpUser: (formValues) => {
			dispatch(signUpUser(formValues))
			.then((response) => {
				let res = response.payload;
				if (res.status === 'success') {
					dispatch(signUpUserSuccess())
				}
				else {
					dispatch(signUpUserFailure(res.message))
				}
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister)
