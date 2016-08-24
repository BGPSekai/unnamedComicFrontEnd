import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import UserModule from '../../module/UserModule';
import styles from './styles';

export default class Upload extends Component {
  

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
  };
}
