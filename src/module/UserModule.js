import NodeRSA from 'node-rsa';
import LocalStorage from './LocalStorage';

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
}

export default new UserModule;
