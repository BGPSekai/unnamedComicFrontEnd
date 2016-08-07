import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import FlatButton from 'material-ui/lib/flat-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import Avatar from 'material-ui/lib/avatar';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import FileUploadIcon from 'material-ui/lib/svg-icons/file/file-upload';
import MenuResource from './res/menu.json';
import Styles from './appStyles';
import MenuDrawer from './components/menuDrawer';
import Footer from './components/footer';

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
    browserHistory.push(page);
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
      <div style={Styles.root}>
        <LeftNav style={Styles.navLeft} open={this.state.navOpen}>
          <MenuDrawer title="title" background={'https://lh3.googleusercontent.com/yDResYVDafsxu1f_74idKOw4MFLi0BiBy51W2oRXVC2S9Uj4XptePeekB0HZMPZM4IrCc6tARQ=w368-h207-p-no'} />
          <List subheader="主選單">
            {MenuElement}
          </List>
        </LeftNav>
        <div id="header" style={Styles.header}>
          <div style={Styles.appBarOuter}>
            {/* Grid */}
            <AppBar
              title={process.env.WEBSITE_TITLE}
              iconElementLeft={
                <IconButton tooltip="切換選單" onTouchTap={this.handleNavToggle.bind(this)}>
                  <MenuIcon color={Styles.iconLeft.color}/>
                </IconButton>}
              iconElementRight={
                <IconButton tooltip="發布漫畫" onTouchTap={this.handlePageChange.bind( this, 'upload')}>
                  <FileUploadIcon color={Styles.iconLeft.color}/>
                </IconButton>}
              style={Styles.appBar}
              titleStyle={Styles.title}
            />
            {
              /* 已經登入 */
              this.state.hasAuth&&
              <Paper style={Styles.avatarPaper} zDepth={1} circle={true}>
                <Avatar>
                  鳥
                </Avatar>
              </Paper>
            }
            {
              /* 尚未登入 */
              <FlatButton  
                style={Styles.loginButton} 
                rippleColor="#FF4081" 
                label="登入 / 註冊"
                onTouchTap={this.handlePageChange.bind( this, 'login')} />
            }
          </div>
        </div>
        <div id="main" onTouchTap={this.handleNeedCloseNav.bind(this)}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }

}
