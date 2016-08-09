import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

export default class RegisterModule {
  constructor() {
  }

  postData(data) {
    return new FetchModule()
      .setUrl(apiUrl.service.register)
      .setCros('cors')
      .setMethod('POST')
      .setType('json')
      .setData(data)
      .send();
  }
}
