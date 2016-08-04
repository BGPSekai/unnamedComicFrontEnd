import React, { Component } from 'react';
import AppBar from 'material-ui/lib/app-bar';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Avatar from 'material-ui/lib/avatar';
import Paper from 'material-ui/lib/paper';
import IconButton from 'material-ui/lib/icon-button';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';
import FileUploadIcon from 'material-ui/lib/svg-icons/file/file-upload';
import MenuResource from 'res/menu.json';

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

  render() {
    let styles = {
      root: {
        color: '#424242'
      },
      navLeft: {
        zIndex: 500,
        padding: '100px 0 0 0'
      },
      header: {
        background: '#D81B60',
        padding: '10px 5px',
        position: 'relative',
        zIndex: 1000
      },
      title: {
        color: '#424242',
        fontSize: '1.2rem',
        lineHeight: '60px'
      },
      iconLeft: {
        color: '#424242'
      },
      appBarOuter: {
        display: 'flex',
        width: '75%',
        maxWidth: '1080px',
        margin: 'auto',  
      },
      appBar: {
        flex: 2,
        background: '#fff',
        padding: '0px 20px',
        minHeight: 'auto'
      },
      userButton: {
        flex: 1,
      },
      avatarPaper: {
        width: '40px',
        height: '40px',
        margin: 'auto 2%'
      },
      avatar: {
      }
    };

    return (
      <div style={styles.root}>
        <LeftNav style={styles.navLeft} open={this.state.navOpen}>
          
        </LeftNav>
        <div id="header" style={styles.header}>
          <div style={styles.appBarOuter}>
            {/* Grid */}
            <AppBar
              title={process.env.WEBSITE_TITLE}
              iconElementLeft={<IconButton onTouchTap={this.handleNavToggle.bind(this)}><MenuIcon color={styles.iconLeft.color}/></IconButton>}
              iconElementRight={<IconButton><FileUploadIcon color={styles.iconLeft.color}/></IconButton>}
              style={styles.appBar}
              titleStyle={styles.title}
            />
            <Paper style={styles.avatarPaper} zDepth={1} circle={true}>
              <Avatar>
                鳥
              </Avatar>
            </Paper>
          </div>
        </div>
        <div id="main" onTouchTap={this.handleNeedCloseNav.bind(this)}>
          {this.props.children}
        </div>
      </div>
    )
  }

}
