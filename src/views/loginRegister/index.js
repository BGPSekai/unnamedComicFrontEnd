import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import TextField from 'material-ui/lib/text-field';
import LinearProgress from 'material-ui/lib/linear-progress';
import Container from '../../components/Container';
import ContextualBg from '../../components/ContextualBg';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import ArrowBackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back.js';
import Checkbox from 'material-ui/lib/checkbox';
import styles from './styles';
import LoginModule from './LoginModule';
import RegisterModule from './RegisterModule';
import LocalStorage from '../../module/LocalStorage';

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
		
	}
	
	handleBackAcation() {
		 if (this.props.routes.length <= 1)
		 	browserHistory.push('/');
		 else	
		 	this.props.history.goBack();
	}

	getRegisterRequestData(response) {
		if (response.status == 'error') {
			this.setState({
				loading: false,
				registerButtonColor: styles.warrningColor,
				msg: response.msg,
				warrning: true
			});
		} else {
			this.setState({
				loading: false,
				registerButtonColor: styles.defaultColor,
				msg: '註冊成功',
				warrning: false
			});
			for(let i in this.state.register) {
				this.state.register[i] = ''; 
			}
			this.setState({
				register: this.state.register
			});
		};
	}

	getLoginRequestData( userData, response) {
		this.setState({loading: false});
		if (response.error) {
			this.setState({
				loading: false,
				loginButtonColor: styles.warrningColor,
				msg: response.error,
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
			LoginModule.encrypt(Object.assign( userData, {
				remeber: this.refs.remeber.isChecked(),
				timestamp: Math.floor(time.getTime()/1000)
			}));
			browserHistory.push('/');
		};
	}

	handleRegisterChange( e, refs) {
		this.state.register[refs] = e.target.value; 
		this.setState({
			register: this.state.register
		});
	}

	onSubmit(type) {
		let tempUserData = {};
		
		for(let i in this.refs) {
			if (i.match(type)) {
				tempUserData[i.replace( type, '')] = this.refs[i].getValue();		
			}
		};
		
		this.setState({loading: true});
		
		if (type === 'login.') {
			LoginModule
				.postData(tempUserData)
				.then(this.getLoginRequestData.bind(this, tempUserData))
		}	else {
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
			<div style={styles.root}>
				<Container style={styles.controllBar}>
					<IconButton onTouchTap={this.handleBackAcation.bind(this)}>
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
							/>
							<TextField
								floatingLabelText="密碼"
								type="password"
								ref="login.password"
								hintText="填入您的密碼"
								fullWidth
							/>
							<Checkbox 
								ref="remeber"
								label="自動登入(無勾選則維持一小時)" 
							/>
							<RaisedButton 
								label="登入"
								fullWidth
								labelColor="#fff"
								style={styles.comfirmButton}
								backgroundColor={this.state.loginButtonColor}
								onMouseDown={this.onSubmit.bind(this, 'login.')}
								onKeyDown={this.onSubmit.bind(this, 'login.')}
							/>
						</Tab>
						<Tab label="註冊">
							<TextField
								floatingLabelText="E-Mail"
								ref="register.email"
								hintText="填入您的電子郵件"
								fullWidth
								value={this.state.register.email}
								onChange={(e) => {this.handleRegisterChange(e,'email')}}
							/>
							<TextField
								floatingLabelText="密碼"
								type="password"
								ref="register.password"
								hintText="填入您的密碼"
								fullWidth
								value={this.state.register.password}
								onChange={(e) => {this.handleRegisterChange(e,'password')}}
							/>
							<TextField
								floatingLabelText="密碼確認"
								type="password"
								ref="register.password_confirmation"
								hintText="確認您的密碼"
								fullWidth
								value={this.state.register.password_confirmation}
								onChange={(e) => {this.handleRegisterChange(e,'password_confirmation')}}
							/>
							<TextField
								floatingLabelText="姓名"
								ref="register.name"
								hintText="填入您的姓名"
								fullWidth
								value={this.state.register.name}
								onChange={(e) => {this.handleRegisterChange(e,'name')}}
							/>
							<RaisedButton 
								label="註冊"
								backgroundColor={this.state.registerButtonColor}
								labelColor="#fff"
								style={styles.comfirmButton}
								onMouseDown={this.onSubmit.bind(this, 'register.')}
								onKeyDown={this.onSubmit.bind(this, 'register.')}
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
		);
	}

}
