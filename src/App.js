import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import Avatar from 'material-ui/lib/avatar';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import FileUploadIcon from 'material-ui/lib/svg-icons/file/file-upload';
import MenuResource from './res/menu.json';
import Styles from './AppStyles';
import Footer from './components/footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    }

  }
  
  handleNavToggle() { this.setState({navOpen: !this.state.navOpen}) };

  handleNeedCloseNav() {
    let widthPersent = 0.16;
    
    if(window.innerWidth*widthPersent<256)
      this.setState({navOpen: false});
    
  }

  handlePageChange(page) {
    //this.props.history.push(page); //deprecated
    browserHistory.push(page);
  }

  render() {
    let MenuElement = [
      <div>Title</div>
    ];
    
    for(let i in MenuResource) {
      MenuElement.push(
      <MenuItem onTouchTap={this.handlePageChange.bind( this, i)}>
        {MenuResource[i].text}
      </MenuItem>);
    };

    return (
      <div style={Styles.root}>
        <LeftNav style={Styles.navLeft} open={this.state.navOpen}>
          {MenuElement}
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
            <Paper style={Styles.avatarPaper} zDepth={1} circle={true}>
              <Avatar>
                鳥
              </Avatar>
            </Paper>
          </div>
        </div>
        <div id="main" onTouchTap={this.handleNeedCloseNav.bind(this)}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }

}
