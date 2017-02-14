import NodeRSA from 'node-rsa';
import apiUrl from 'res/apiUrl';
import LocalStorage from './LocalStorage';
import FetchModule from './FetchModule';

class UserData {
  constructor() {
    this.data = null;
  }

  clear(name) {
    LocalStorage.remove(name);
    return this;
  }

  get() {
    if (LocalStorage.get('key')&&LocalStorage.get('auth')) {
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
  /**
   * 清除使用者資料
   */
  clearUserData() {
    new UserData().clear('auth').clear('key');
  }
  /**
   * 取得使用者資訊
   * @param String name
   * @return String userData
   */
  getUserInfo(name) {
    let userData = new UserData().getFromJson();
    return userData[name];
  }
  /**
   * 檢查使用者是否登入，回傳布林值
   * @return boolen
   */
  checkIsLogin() {
    let userData = new UserData().getFromJson();
    return (userData.email&&userData.password&&userData.timeStamp) ? true : false;
  }
  /**
   * 檢查是否使用者更新時間過期
   * @return boolen
   */
  checkHasExpired() {
    let userData = new UserData().getFromJson();
    let time = Math.floor(new Date().getTime()/1000);
    if (this.checkIsLogin() && (time - userData.timeStamp) < Number(process.env.REACT_APP_USER_EXPIRED) * 60) {
      return false;
    };
    return true;
  }

  /**
   * 回傳是否經由社群登入
   * @param void
   * @return boolen
   */
  isFromSocial() {
    let userData = new UserData().getFromJson();
    return (userData.from === false);
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
   * 會去自動更新 token 
   * @param null
   * @return Fetch Promise
   */
  updateInfo() {
    let data = {
      token: this.getUserInfo('jwt')
    };
    
    return new Promise( (resolve,reject) => {
      new FetchModule()
      .setUrl(apiUrl.user.info)
      .auth()
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .setData(data)
      .send()
      .then( (data) => {
        if (data.status === 'success')
          this.setUserInfo({
            userName: data.user.name,
            userId: data.user.id,
            avatar: data.user.avatar
          });
        resolve(data);
      });
    });
  }

  updateToken() {
    let data = {
      email: this.getUserInfo('email'),
      password: this.getUserInfo('password'),
      name: this.getUserInfo('name'),
      from: this.getUserInfo('from')
    };

    return new Promise( (resolve,reject) => {
      new FetchModule()
      .setUrl(apiUrl.auth)
      .setCors('cors')
      .setMethod('POST')
      .setType('json')
      .setData(data)
      .send()
      .then( (data) => {
        let time = new Date();
        if (data.status === 'success') {
          this.setUserInfo({
            jwt: data.token,
            timeStamp: Math.floor(time.getTime()/1000)
          });

          this.updateInfo();
        }

        resolve(data);
      });
    });
  }
}

export default new UserModule();
