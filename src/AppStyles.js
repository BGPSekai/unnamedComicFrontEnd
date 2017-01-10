const appStyle = {
  root: {
    color: '#424242'
  },

  header: {
    backgroundColor: '#F06292',
    zIndex: 1000,
    position: 'fixed',
    width: '100%',
    top: 0
  },

  main: {
    background: 'rgb( 250, 250, 248)'
  },

  a: {
    textDecoration: 'none',
    color: '#222'
  },

  navLeft: {
    zIndex: 500,
    padding: '63px 0 0 0'
  },

  title: {
    color: '#FCE4EC',
    fontSize: '1.7rem',
    textDecoration: 'none'
  },

  titleSearch: {
    color: '#fff',
    borderColor: '#AD1457'
  },

  iconLeft: {
    color: '#FCE4EC'
  },
  
  appBarOuter: {
    display: 'flex',
    width: '95%',
    maxWidth: '1080px',
    margin: 'auto',
  },

  appBar: {
    flex: 2,
    padding: '0px 20px',
    minHeight: 'auto',
    background: 'transparent',
    boxShadow: 'none'
  },

  userButton: {
    flex: 1
  },

  avatarButton: {
    width: '40px',
    height: '40px',
    margin: '12px 2%',
    padding: 0,
    cursor: 'pointer'
  },

  loginButton: {
    color: '#fff',
    margin: 'auto 2%'
  },

  userInfo: {
    position: 'relative'
  },
  avatar: {
    overflow: 'hidden'
  },

  avatarImg: {
    width: '100%',
    height: '100%'
  },

  userMenu: {
  }
};

export default appStyle;
