import React, { Component } from 'react';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import LinearProgress from 'material-ui/lib/linear-progress';
import Container from '../../components/container';
import IconButton from 'material-ui/lib/icon-button';
import ArrowBackIcon from 'material-ui/lib/svg-icons/navigation/arrow-back.js';
import Styles from './style';

export default class loginRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabIndex: 0
        };
        switch(this.props.location.pathname) {
            case '/login': 
                this.state.tabIndex = 0; 
                break;
            case '/register': 
                this.state.tabIndex = 1;
                break;
        }

    }

    handleBackAcation() {
        console.log(this.props.history);

    }

    render() {
        return (
            <div style={Styles.root}>
                <Container style={Styles.controllBar}>
                    <IconButton onTouchTap={this.handleBackAcation.bind(this)}><ArrowBackIcon color={Styles.backIcon.color}/></IconButton>
                </Container>
                <div style={Styles.Box}>
                    <Tabs initialSelectedIndex={this.state.tabIndex} tabItemContainerStyle={Styles.Tabs}>
                        <Tab label="登入" />
                        <Tab label="註冊" />
                    </Tabs>
                    <LinearProgress mode="indeterminate" style={Styles.LinearProgress} />
                </div>
            </div>
        );

    }

}
