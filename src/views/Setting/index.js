import React, {Component} from 'react';
import UserModule from '../../module/UserModule';

class Setting extends Component {
  render() {
    return (
      <div>
      {
        UserModule.checkIsLogin() &&
        this.props.children
      }
      {
        !UserModule.checkIsLogin() &&
        <div>請先登入</div>
      }
      </div>
    );
  }
}

export default Setting;
