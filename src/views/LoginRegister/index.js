import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import Container from '../../components/Container';
import ContextualBg from '../../components/ContextualBg';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import Checkbox from 'material-ui/Checkbox';
import GoogleLogin from 'react-google-login';
import styles from './styles';
import LoginModule from './LoginModule';
import RegisterModule from './RegisterModule';
import SocialLogin from './SocialLogin';
import LocalStorage from '../../module/LocalStorage';
import UserModule from '../../module/UserModule';

export default class LoginRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: Number(this.props.location.pathname !== '/login'),
			registerButtonColor: styles.defaultColor,
			loginButtonColor: styles.defaultColor,
			loading: false,
			msg: [],
			warrning: false,
			register: {}
		};
		this._checkIsLogin();
	}

	_checkIsLogin() {
		if (UserModule.checkIsLogin()) {
			browserHistory.push('/');
		};
	}

	handleBackAcation() {
		if (this.props.routes.length <= 1)
			browserHistory.push('/');
		else
			this.props.history.goBack();
	}

	getRegisterRequestData(response) {
		if (response.status === 'error') {
			this.setState({
				loading: false,
				registerButtonColor: styles.warrningColor,
				msg: response.message,
				warrning: true
			});
		} else {
			this.setState({
				loading: false,
				registerButtonColor: styles.defaultColor,
				msg: '註冊成功',
				warrning: false
			});
			for (let i in this.state.register) {
				this.state.register[i] = '';
			}
			this.setState({
				register: this.state.register
			});
		};
	}

	getLoginRequestData(userData, response) {
		this.setState({ loading: false });
		if (response.status === 'error') {
			this.setState({
				loading: false,
				loginButtonColor: styles.warrningColor,
				msg: response.message,
				warrning: true
			});
		} else {
			this.setState({
				loading: false,
				loginButtonColor: styles.defaultColor,
				msg: '登入成功',
				warrning: false
			});
			let time = new Date();

			UserModule.setUserInfo(Object.assign(userData, {
				remeber: this.refs.remeber.isChecked(),
				timeStamp: Math.floor(time.getTime() / 1000),
				jwt: response.token,
				from: false
			}));

			UserModule.updateInfo().then((data) => {
				browserHistory.push('/');
			});
		};
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
	}

	handleRegisterChange(e, refs) {
		this.state.register[refs] = e.target.value;
		this.setState({
			register: this.state.register
		});
	}

	onSubmit(type) {
		let tempUserData = {};

		for (let i in this.refs) {
			if (i.match(type)) {
				tempUserData[i.replace(type, '')] = this.refs[i].getValue();
			}
		};

		this.setState({ loading: true });

		if (type === 'login.') {
			LoginModule
				.postData(tempUserData)
				.then(this.getLoginRequestData.bind(this, tempUserData))
		} else {
			this.setState({
				register: tempUserData
			});
			RegisterModule
				.postData(tempUserData)
				.then(this.getRegisterRequestData.bind(this))
		};
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
								<TextField
									floatingLabelText="E-Mail"
									ref="login.email"
									hintText="填入您的電子郵件"
									fullWidth
									onKeyDown={(e) => this._handleEnterClick(e, 'login.password') }
									/>
								<TextField
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
								<RaisedButton 
									fullWidth 
									label="Google 帳號登入"
									icon={<img style={{borderRadius: '100%'}} src={'https://google-developers.appspot.com/identity/sign-in/g-normal.png'}/>}
									onTouchTap={() => {this.refs['GoogleLoginButton'].onBtnClick()}}
									style={styles.GoogleLoginBtn}
									/>
								<GoogleLogin
									ref="GoogleLoginButton"
									clientId="889218336554-qt4ge5mk4l9tijl7avfsmu8juv3l6v4r.apps.googleusercontent.com"
									buttonText="Login with Google"
									onSuccess={SocialLogin.responseGoogle}
									onFailure={SocialLogin.responseGoogle}
									style={styles.GoogleLogin}
									/>
							</Tab>
							<Tab label="註冊">
								<TextField
									floatingLabelText="E-Mail"
									ref="register.email"
									hintText="填入您的電子郵件"
									fullWidth
									value={this.state.register.email || ''}
									onChange={(e) => { this.handleRegisterChange(e, 'email') } }
									onKeyDown={(e) => this._handleEnterClick(e, 'register.password') }
									/>
								<TextField
									floatingLabelText="密碼"
									type="password"
									ref="register.password"
									hintText="填入您的密碼"
									fullWidth
									value={this.state.register.password || ''}
									onChange={(e) => { this.handleRegisterChange(e, 'password') } }
									onKeyDown={(e) => this._handleEnterClick(e, 'register.password_confirmation') }
									/>
								<TextField
									floatingLabelText="密碼確認"
									type="password"
									ref="register.password_confirmation"
									hintText="確認您的密碼"
									fullWidth
									value={this.state.register.password_confirmation || ''}
									onChange={(e) => { this.handleRegisterChange(e, 'password_confirmation') } }
									onKeyDown={(e) => this._handleEnterClick(e, 'register.name') }
									/>
								<TextField
									floatingLabelText="姓名"
									ref="register.name"
									hintText="填入您的姓名"
									fullWidth
									value={this.state.register.name || ''}
									onChange={(e) => { this.handleRegisterChange(e, 'name') } }
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
