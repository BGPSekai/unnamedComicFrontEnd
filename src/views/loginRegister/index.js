import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import LinearProgress from 'material-ui/lib/linear-progress';
import Container from '../../components/container';
import IconButton from 'material-ui/lib/icon-button';
import ArrowBackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back.js';
import styles from './styles';

export default class LoginRegister extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tabIndex: Number(this.props.location.pathname !== '/login')
		};

	}
	
	handleBackAcation() {
		 if (this.props.routes.length <= 1)
		 	browserHistory.push('/');
		 else	
		 	this.props.history.goBack();
	}

	render() {
		return (
			<div style={styles.root}>
				<Container style={styles.controllBar}>
					<IconButton onTouchTap={this.handleBackAcation.bind(this)}>
					<ArrowBackIcon color={styles.backIcon.color}/></IconButton>
				</Container>
				<div style={styles.Box}>
					<Tabs 
						initialSelectedIndex={this.state.tabIndex} 
						tabItemContainerStyle={styles.Tabs}
					>
						<Tab label="登入" />
						<Tab label="註冊" />
					</Tabs>
					<LinearProgress mode="indeterminate" style={styles.LinearProgress} />
				</div>
			</div>
		);
	}

}
