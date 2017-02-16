import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
import LinearProgress from 'material-ui/LinearProgress';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import Checkbox from 'material-ui/Checkbox';
import GoogleLogin from 'react-google-login';
import ContextualBg from 'components/ContextualBg';
import Container from 'components/Container';
import TextInput from 'components/TextInput';
import styles from './styles';

class LoginRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: Number(this.props.location.pathname !== '/login'),
			registerButtonColor: styles.defaultColor,
			loginButtonColor: styles.defaultColor,
			loading: false,
			msg: [],
			warrning: false
		};
		
		this.responseGoogle = this.responseGoogle.bind(this);
	}

	handleBackAcation() {
		if (this.props.routes.length <= 1)
			browserHistory.push('/');
		else
			this.props.history.goBack();
	}

	_handleEnterClick(e, ref) {
		if (e.keyCode === 13) {
			// if (ele.constructor.name === 'Checkbox') {
			// 	// e.target.blur();
			// 	// ele.refs.enhancedSwitch.setState({isKeyboardFocused: true});
			// 	// ele.refs.enhancedSwitch.handleFocus(e);
			// }
			// if (ele.handleKeyboardFocus) {
			// 	e.target.blur();
			// 	ele.handleKeyboardFocus( e, true);
			// 	console.log(ele);
			// }
			// else 
			if (ref === 'login') {
				this.onSubmit.call(this, 'login.')
			} else if (ref === 'register') {
				this.onSubmit.call(this, 'register.')
			} else {
				let ele = this.refs[ref];
				if (ele.focus())
					ele.focus();
			}
		};
		this.setState({ msg: null}); //去除警告
	}

  //處理輸入更換事件
	handleRegisterClear() {
    for (let i in this.refs) {
			if (i.match('register')) {
				 this.refs[i].clear();
			}
		};
	}

	onSubmit(type) {
		let tempUserData = {};

		for (let i in this.refs) {
			if (i.match(type)) {
				tempUserData[i.replace(type, '')] = this.refs[i].getValue();
			}
		};

		tempUserData['from'] = null;

		if (type === 'login.') {
      tempUserData['remeber'] = this.refs.remeber.isChecked();
			this.props.signInUser(tempUserData);
		} else {
			this.props.signUpUser(tempUserData);
		};
	}

	componentWillMount() {
		let UserReducer = this.props.UserReducer;
		console.log(UserReducer)
		if (UserReducer.status === 'authenticated' && UserReducer.user) {
			browserHistory.push('/');
		}
	}
	
	componentWillReceiveProps(nextProps) {
		let UserReducer = nextProps.UserReducer;

		this.setState({
			msg: UserReducer.msg,
			loading: UserReducer.loading,
			warrning: UserReducer.status === false,
			loginButtonColor: UserReducer.status === false ? styles.warrningColor : styles.defaultColor,
			registerButtonColor: UserReducer.status === false ? styles.warrningColor : styles.defaultColor
		});

		if (UserReducer.status === 'authenticated' && UserReducer.user) {
			browserHistory.push('/');
		}

		if(UserReducer.status === 'registered') {
			this.handleRegisterClear();
		}
	}

	responseGoogle(response) {
		let userData = {}, profileObj = response.profileObj;
    
		if (response.profileObj) {
			//console.log('取得 user google 資訊');
			userData = {
				email: profileObj.email,
				password: profileObj.googleId + profileObj.email,
				password_confirmation: profileObj.googleId + profileObj.email,
				name: profileObj.name,
        from: 'Google'
			};

			this.props.signInUser(userData);
		}
	}

	render() {
		if (this.state.loading) {
			styles.LinearProgress.display = 'block';
		} else {
			styles.LinearProgress.display = 'none';
		}

		return (
			<MuiThemeProvider muiTheme={getMuiTheme(baseTheme) }>
				<div style={styles.root}>
					<Container style={styles.controllBar}>
						<IconButton onTouchTap={this.handleBackAcation.bind(this) }>
							<ArrowBackIcon color={styles.backIcon.color}/>
						</IconButton>
					</Container>
					<div style={styles.Box}>
						<Tabs
							initialSelectedIndex={this.state.tabIndex}
							tabItemContainerStyle={styles.Tabs}
							contentContainerStyle={styles.Tab}
							>
							<Tab label="登入">
								<TextInput
									floatingLabelText="E-Mail"
									ref="login.email"
									hintText="填入您的電子郵件"
									fullWidth
									onKeyDown={(e) => this._handleEnterClick(e, 'login.password') }
									/>
								<TextInput
									floatingLabelText="密碼"
									type="password"
									ref="login.password"
									hintText="填入您的密碼"
									fullWidth
									onKeyDown={(e) => this._handleEnterClick(e, 'login') }
									/>
								<Checkbox
									ref="remeber"
									label="自動登入(無勾選則維持一小時)"
									defaultChecked={true}
									/>
								<RaisedButton
									label="登入"
									fullWidth
									labelColor="#fff"
									style={styles.comfirmButton}
									backgroundColor={this.state.loginButtonColor}
									onMouseDown={this.onSubmit.bind(this, 'login.') }
									onKeyDown={this.onSubmit.bind(this, 'login.') }
									/>
								<GoogleLogin
									ref="GoogleLoginButton"
									clientId="889218336554-qt4ge5mk4l9tijl7avfsmu8juv3l6v4r.apps.googleusercontent.com"
									buttonText="Login with Google"
									scope="profile"
									fetchBasicProfile={true}
									onSuccess={this.responseGoogle}
									onFailure={this.responseGoogle}
									style={styles.GoogleLogin}
									/>
								<RaisedButton 
									fullWidth 
									label="Google 帳號登入"
									icon={<img style={{borderRadius: '100%'}} src={'https://google-developers.appspot.com/identity/sign-in/g-normal.png'} alt="Google Login Icon"/>}
									onTouchTap={() => {this.refs['GoogleLoginButton'].signIn()}}
									style={styles.GoogleLoginBtn}
									/>
							</Tab>
							<Tab label="註冊">
								<TextInput
									floatingLabelText="E-Mail"
									ref="register.email"
									hintText="填入您的電子郵件"
									fullWidth
									onKeyDown={(e) => this._handleEnterClick(e, 'register.password') }
									/>
								<TextInput
									floatingLabelText="密碼"
									type="password"
									ref="register.password"
									hintText="填入您的密碼"
									fullWidth
									onKeyDown={(e) => this._handleEnterClick(e, 'register.password_confirmation') }
									/>
								<TextInput
									floatingLabelText="密碼確認"
									type="password"
									ref="register.password_confirmation"
									hintText="確認您的密碼"
									fullWidth
									onKeyDown={(e) => this._handleEnterClick(e, 'register.name') }
									/>
								<TextInput
									floatingLabelText="名稱"
									ref="register.name"
									hintText="填入您的名稱"
									fullWidth
									onKeyDown={(e) => this._handleEnterClick(e, 'register') }
									/>
								<RaisedButton
									label="註冊"
									ref="submit"
									backgroundColor={this.state.registerButtonColor}
									labelColor="#fff"
									style={styles.comfirmButton}
									onTouchTap={this.onSubmit.bind(this, 'register.') }
									/>
							</Tab>
						</Tabs>
						<ContextualBg
							warrning={this.state.warrning}
							successful={!this.state.warrning}
							msg={this.state.msg}
							/>
						<LinearProgress
							mode="indeterminate"
							style={styles.LinearProgress}
							color={'#E91E63'}
							/>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}

}

export default LoginRegister;