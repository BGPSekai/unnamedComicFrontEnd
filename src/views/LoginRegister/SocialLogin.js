import {browserHistory} from 'react-router';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import UserModule from '../../module/UserModule';

class SocialLogin {

  constructor(props) {
    this.responseGoogle = this.responseGoogle.bind(this);
  }
 
 //檢測是否註冊及註冊帳號
	_sendRegister(data) {
		return new FetchModule()
      .setUrl(apiUrl.register)
      .setCors('cors')
      .setData(data)
      .setMethod('POST')
      .setType('json')
      .send();
	}

  _sendLogin(data) {
		return new FetchModule()
      .setUrl(apiUrl.auth)
      .setCors('cors')
      .setData(data)
      .setMethod('POST')
      .setType('json')
      .send();
	}

  responseGoogle(response) {
		let userData = {}, profileObj = response.profileObj;
		if (response.profileObj) {
			//console.log('取得 user google 資訊');
			userData = {
				email: profileObj.email,
				password: profileObj.googleId + profileObj.email,
				password_confirmation: profileObj.googleId + profileObj.email,
				name: profileObj.name,
        from: 'Google'
			};
			
      this._sendRegister(userData).then((data) => {
          this._sendLogin(userData).then((response) => {
  
            if (response.status === 'success') {
              UserModule.setUserInfo(Object.assign(userData, {
                remeber: true,
                timeStamp: Math.floor(new Date().getTime() / 1000),
                jwt: response.token
              }));

              UserModule.updateInfo().then((data) => {
                browserHistory.push('/');
              });
            };
          });
      });
		}

	}

}

export default new SocialLogin;
