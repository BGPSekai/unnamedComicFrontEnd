import React, { Component } from 'react';
import {browserHistory, LinK} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuResource from './res/menu.json';
import Styles from './appStyles';
import MenuDrawer from './components/menuDrawer';
import Footer from './components/Footer';
import UserModule from './module/UserModule';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      hasAuth: false
    };

  }

  handleNavToggle() { 
    this.setState({navOpen: !this.state.navOpen}) 
  }

  handleNeedCloseNav() {
    let widthPersent = 0.16;

    if (window.innerWidth * widthPersent < 256)
      this.setState({navOpen: false});

  }

  handlePageChange(page) {
    //this.props.history.push(page); //deprecated
    this.setState({navOpen: false});
    browserHistory.push('/'+page);
  }

  render() {
    let MenuElement = [];

    for(let i in MenuResource) {
      MenuElement.push(
      <ListItem key={i} onTouchTap={this.handlePageChange.bind( this, i)}>
        {MenuResource[i].text}
      </ListItem>);
    };

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={Styles.root}>
        <Drawer style={Styles.navLeft} open={this.state.navOpen}>
          <MenuDrawer 
            title="title" 
            background={'https://lh3.googleusercontent.com/yDResYVDafsxu1f_74idKOw4MFLi0BiBy51W2oRXVC2S9Uj4XptePeekB0HZMPZM4IrCc6tARQ=w368-h207-p-no'} 
          />
          <Subheader>
            主選單
          </Subheader>
          <List>
            {MenuElement}
          </List>
        </Drawer>
        <div id="header" style={Styles.header}>
          <div style={Styles.appBarOuter}>
            {/* Grid */}
            <AppBar
              title={process.env.WEBSITE_TITLE}
              iconElementLeft={
                <IconButton tooltip="切換選單" onTouchTap={this.handleNavToggle.bind(this)}>
                  <MenuIcon color={Styles.iconLeft.color} />
                </IconButton>}
              iconElementRight={
                <IconButton tooltip="發布漫畫" onTouchTap={this.handlePageChange.bind( this, 'upload')}>
                  <FileUploadIcon color={Styles.iconLeft.color} />
                </IconButton>}
              style={Styles.appBar}
              titleStyle={Styles.title}
            />
            {
              /* 已經登入 */
              UserModule.checkIsLogin()&&
              <Paper 
                style={Styles.avatarPaper} 
                zDepth={1} 
                circle={true}
                onTouchTap={this.handlePageChange.bind( this, '/profile')}
              >
                <Avatar>
                  {UserModule.getUserInfo('userName').substring( 0, 1)}
                </Avatar>
              </Paper>
            }
            {
              /* 尚未登入 */
              !UserModule.checkIsLogin()&&
              <FlatButton  
                style={Styles.loginButton} 
                rippleColor="#FF4081" 
                label="登入"
                onTouchTap={this.handlePageChange.bind( this, '/login')} />
            }
          </div>
        </div>
        <div id="main" style={Styles.main} onTouchTap={this.handleNeedCloseNav.bind(this)}>
          {this.props.children}
        </div>
        <Footer />
      </div>
      </MuiThemeProvider>
    );
  }

}
