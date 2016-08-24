import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class RegisterModule {
  constructor() {
  }

  postData(data) {
    return new FetchModule()
      .setUrl(apiUrl.register)
      .setCors('cors')
      .setMethod('POST')
      .setType('json')
      .setData(data)
      .send();
  }
}

export default new RegisterModule; 
