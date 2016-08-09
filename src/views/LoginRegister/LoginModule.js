import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

export default class LoginModule {
  constructor() {
  }

  postData(data) {
    new FetchModule()
          .setUrl(apiUrl.auth)
          .setMethod('POST')
          .setData(data)
          .setCros('cors')
          .send()
          .then( (data) => {
            console.log(data);
          }).then( (err) => {
            console.log(err);
          }).catch( (err) => {
            console.warn(err);
          });
  }
}
