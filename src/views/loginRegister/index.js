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
import styles from './styles';
import LoginModule from './LoginModule';
import RegisterModule from './RegisterModule';

export default class LoginRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: Number(this.props.location.pathname !== '/login'),
			submitButtonColor: styles.defaultColor,
			loading: false,
			msg: []
		};
		
	}
	
	handleBackAcation() {
		 if (this.props.routes.length <= 1)
		 	browserHistory.push('/');
		 else	
		 	this.props.history.goBack();
	}

	getRequestData(response) {
		this.setState({loading: false});
		if (response.status == 'error') {
			this.setState({
				submitButtonColor: styles.warrningColor,
				msg: response.msg
			});
		} else {
			this.setState({submitButtonColor: styles.defaultColor});
		};
	}

	onSubmit(type) {
		let tempUserData = {};
		let loginModule = new LoginModule();
		let registerModule = new RegisterModule();
		
		for(let i in this.refs) {
			if (i.match(type)) {
				tempUserData[i.replace( type, '')] = this.refs[i].getValue();		
			}
		};
		
		this.setState({loading: true});
		
		if (type === 'login.') {
			loginModule
				.postData(tempUserData)
				.then(this.getRequestData.bind(this))
		}	else {
			registerModule
				.postData(tempUserData)
				.then(this.getRequestData.bind(this))
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
								ref="login.password"
								hintText="填入您的密碼"
								fullWidth
							/>
							<RaisedButton 
								label="登入" 
								secondary
								fullWidth
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
							/>
							<TextField
								floatingLabelText="密碼"
								ref="register.password"
								hintText="填入您的密碼"
								fullWidth
							/>
							<TextField
								floatingLabelText="密碼確認"
								ref="register.passwordConfirmation"
								hintText="確認您的密碼"
								fullWidth
							/>
							<TextField
								floatingLabelText="姓名"
								ref="register.name"
								hintText="填入您的姓名"
								fullWidth
							/>
							<RaisedButton 
								label="註冊"
								backgroundColor={this.state.submitButtonColor}
								labelColor="#fff"
								style={styles.comfirmButton}
								onMouseDown={this.onSubmit.bind(this, 'register.')}
								onKeyDown={this.onSubmit.bind(this, 'register.')}
							/>
						</Tab>
					</Tabs>
					<ContextualBg 
						warrning
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
