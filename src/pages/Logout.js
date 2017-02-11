import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import UserModule from 'module/UserModule';

class Logout extends Component {
  componentWillMount() {
    UserModule.clearUserData();
    browserHistory.push('/');
  }

  render() {
    return (<div></div>);
  }
  
}

export default Logout;
