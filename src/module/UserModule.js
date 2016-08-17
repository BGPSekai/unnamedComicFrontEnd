import NodeRSA from 'node-rsa';
import LocalStorage from './LocalStorage';
import apiUrl from '../res/apiUrl';
import FetchModule from './FetchModule';

class UserData {
  constructor() {
    this.data = null;
  }

  get() {
    if(LocalStorage.get('key')&&LocalStorage.get('auth')){
      let publicKey = '-----BEGIN RSA PRIVATE KEY-----\n'+
                    LocalStorage.get('key')+
                    '\n-----END RSA PRIVATE KEY-----';
      let key = new NodeRSA(publicKey);
      let auth = LocalStorage.get('auth');
      this.data = key.decrypt(auth, 'utf8');
    } else {
      this.data = '{}';
    };
    return this;
  }

  getFromJson() {
    this.get();
    return JSON.parse(this.data);
  }

  set(data) {
    let key = new NodeRSA({b: 512});
    var encrypted = key.encrypt(data, 'base64');
    LocalStorage.set({
      auth: encrypted,
      key: key.exportKey('private')
            .replace('-----BEGIN RSA PRIVATE KEY-----','')
            .replace('-----END RSA PRIVATE KEY-----','')
    });
  }
}

class UserModule {
  constructor() {

  }

  getUserInfo(name) {
    let userData = new UserData().getFromJson();
    return userData[name];
  }
  
  checkIsLogin() {
    let userData = new UserData().getFromJson();
    return (userData.email&&userData.password&&userData.timeStamp) ? true : false;
  }

  checkHasExpired() {
    let userData = new UserData().getFromJson();
    let time = Math.floor(new Date().getTime()/1000)
    if (this.checkIsLogin() && (time - userData.timeStamp) < process.env.USER_EXPIRED * 60) {
      return false;
    };
    return true;
  }

  setUserInfo(data) {
    let userData = new UserData();
    let Data = userData.getFromJson();
    Object.assign( Data, data);
    userData.set(Data);
    return this;
  }
  /**
   * 更新使用者資料
   * 重點是不會去自動更新 token (須修正)
   * @param null
   * @return Fetch Promise
   */
  updateInfo() {
    let data = {
      token: this.getUserInfo('jwt')
    };

    return new Promise( (resolve,reject) => {
      new FetchModule()
      .setUrl(`${apiUrl.user.info}?token=${data.token}`)
      .setCros('cors')
      .setMethod('GET')
      .setType('json')
      .setData(data)
      .send()
      .then( (data) => {
        if(data.status === 'success')
          this.setUserInfo({
            userName: data.user.name,
            userId: data.user.id
          });
        resolve(data);
      });
    });
  }

  updateToken() {
    let data = {
      email: this.getUserInfo('email'),
      password: this.getUserInfo('password')
    };

    return new Promise( (resolve,reject) => {
      new FetchModule()
      .setUrl(apiUrl.auth)
      .setCros('cors')
      .setMethod('POST')
      .setType('json')
      .setData(data)
      .send()
      .then( (data) => {
        let time = new Date();
        if (data.status === 'success') {
          this.setUserInfo({
            auth: data.token,
            timeStamp: Math.floor(time.getTime()/1000)
          });

          UserModule.updateInfo();
        }

        resolve(data);
      });
    });
  }
}

export default new UserModule;
