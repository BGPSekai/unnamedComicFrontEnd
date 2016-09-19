import React, { Component } from 'react';
import {browserHistory, LinK} from 'react-router';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {List, ListItem} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import SearchIcon from 'material-ui/svg-icons/action/search';
import FileUploadIcon from 'material-ui/svg-icons/file/file-upload';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MenuResource from './res/menu.json';
import Styles from './appStyles';
import MenuDrawer from './components/menuDrawer';
import Href from './components/Href';
import Footer from './components/Footer';
import UserModule from './module/UserModule';
import PersonIcon from 'material-ui/svg-icons/social/person';
import PowerSettingsNewIcon from 'material-ui/svg-icons/action/power-settings-new';
import apiUrl from './res/apiUrl';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };
    
  }
  /**
   * 檢查 search location是否是 search
   * 是則顯示 search bar  
   */  
  // componentWillMount() {
  //  if (this.props.location.pathname.match(apiUrl.front.search)) {
  //     this.state.isSearching = true;
  //   } 
  // }

  handleNavToggle() { 
    this.setState({navOpen: !this.state.navOpen}) 
  }

  handleNeedCloseNav() {
    let widthPersent = 0.16;

    if (window.innerWidth * widthPersent < 256)
      this.setState({ navOpen: false });
  }

  handlePageChange(page, e) {
    //this.props.history.push(page); //deprecated
    if (e&&(e.nativeEvent.which==0||e.nativeEvent.which==1)){
      this.setState({ navOpen: false });
      browserHistory.push('/'+page);
    };
  }

  _handlePageSearch(e) {
    this.handlePageChange('search', e);
  }

  _handleSearchStart(e) {
    if (e.nativeEvent.keyCode === 13) {
      browserHistory.push(
        apiUrl.getReplaceUrl( apiUrl.front.searchByName,
          {comicName: this.refs.search.getValue()}
        )
      );
    }
  }

  render() {
    let MenuElement = [];
    let TitleElement;
    if (this.props.children.props.route.isSearching) {
      TitleElement = (
        <TextField 
          hintText={'搜尋'}
          ref="search"
          defaultValue={this.props.params.searchName}
          inputStyle={Styles.titleSearch}
          underlineFocusStyle={Styles.titleSearch}
          hintStyle={Styles.titleSearch}
          autoFocus={true}
          onKeyDown={this._handleSearchStart.bind(this)}
          fullWidth
        />
      );
    } else {
      TitleElement = (
        <Href href="/" style={Styles.title} onTouchTap={this.handlePageChange.bind( this, '')}>
          {process.env.WEBSITE_TITLE}
        </Href>
      );
    };

    for (let i in MenuResource) {
      MenuElement.push(
      <ListItem key={i} onTouchTap={this.handlePageChange.bind( this, i)}>
        <Href href={i} style={Styles.a}>{MenuResource[i].text}</Href>
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
              title={TitleElement}
              iconElementLeft={
                <IconButton tooltip="切換選單" onTouchTap={this.handleNavToggle.bind(this)}>
                  <MenuIcon color={Styles.iconLeft.color} />
                </IconButton>
              }
              iconElementRight={
                <div>
                  {
                    !this.props.children.props.route.isSearching &&
                    <IconButton tooltip="搜尋" onTouchTap={this._handlePageSearch.bind(this)}>
                      <SearchIcon color={Styles.iconLeft.color} />
                    </IconButton>
                  }
                  <Href href="/upload" style={Styles.a}>
                    <IconButton tooltip="發布漫畫" onTouchTap={this.handlePageChange.bind( this, 'upload')}>
                      <FileUploadIcon color={Styles.iconLeft.color} />
                    </IconButton>
                  </Href>
                </div>
              }
              style={Styles.appBar}
              titleStyle={Styles.title}
            />
            {
              /* 已經登入 */
              UserModule.checkIsLogin()&&
              <div style={Styles.userInfo}>
                <IconMenu
                  iconButtonElement={
                    <IconButton style={Styles.avatarButton}>
                      <Paper 
                        zDepth={1} 
                        circle={true}
                      >
                        <Avatar>
                          {UserModule.getUserInfo('userName').substring( 0, 1)}
                        </Avatar>
                      </Paper>
                    </IconButton>
                  }
                  menuStyle={Styles.userMenu}
                  onChange={(e, value) => this.handlePageChange.call(this, value)}
                >
                  <Href href="/profile" style={Styles.a}><MenuItem primaryText="關於我" value="profile" leftIcon={<PersonIcon />} /></Href>
                  <Href href="/logout" style={Styles.a}><MenuItem primaryText="登出"  value="logout" leftIcon={<PowerSettingsNewIcon />}/></Href>
                </IconMenu>
              </div>
            }
            {
              /* 尚未登入 */
              !UserModule.checkIsLogin()&&
              <FlatButton  
                style={Styles.loginButton} 
                rippleColor="#FF4081" 
                label="登入"
                onTouchTap={this.handlePageChange.bind( this, 'login')} />
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
