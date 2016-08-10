import NodeRSA from 'node-rsa';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import LocalStorage from '../../module/LocalStorage';

class LoginModule {
  constructor() {
  }

  encrypt(data) {
    let key = new NodeRSA({b: 512});
    var encrypted = key.encrypt(data, 'base64');
    LocalStorage.set({
      auth: encrypted
    });
  }
  
  
  postData(data) {
    return new FetchModule()
      .setUrl(apiUrl.auth)
      .setCros('cors')
      .setMethod('POST')
      .setType('json')
      .setData(data)
      .send();
  }
}

export default new LoginModule;
