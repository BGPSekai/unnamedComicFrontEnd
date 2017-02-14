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
				dispatch(signInUser(formValues)).payload
				.then((response) => {
					if (response.status === 'success') {

						UserModule.setUserInfo(Object.assign({}, {
							remeber: formValues.remeber,
							timeStamp: Math.floor(new Date().getTime() / 1000),
							jwt: response.token,
							from: false,
							...formValues
						}))

						UserModule.updateInfo().then((data) => {
							dispatch(signInUserSuccess(data.user))
						})

					}
					else
						dispatch(signInUserFailure(response.message))
				})
		},
		signUpUser: (formValues) => {
			dispatch(signUpUser(formValues)).payload
			.then((response) => {
				if (response.status === 'success') {
					dispatch(signUpUserSuccess())
				}
				else {
					dispatch(signUpUserFailure(response.message))
				}
			})
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister)
