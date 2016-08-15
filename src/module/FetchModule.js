import UserModel from './UserModule';

export default class FetchModule {
  constructor() {
    let tempData = {
      url: '',
      method: 'GET',
      mode: 'cros',
      type: '',
      data: {},
      headers: {}
    };
    this._headers = new Headers({
      'Content-Type': 'text/plain'
    });
    this._tempData = tempData;
    this._needAuth = false;
  }

  setType(type) {
    this._tempData.type = type;
    return this;
  }

  setMethod(method) {
    this._tempData.method = (method === 'json') ? 'application/json' : method;
    return this;
  }
  /**
   * @param mode same-origin no-cros cors
   */
  setCros(mode = 'same-origin') {
    this._tempData.mode = mode;
    return this;
  }

  setUrl(url) {
    this._tempData.url = url;
    return this;  
  }

  setData(data = {}) {
    this._tempData.data = data;
    return this;
  }
  /**
   * 自動添加 header 驗證
   * @param null
   * @return this class
   */
  auth() {
    this._needAuth = true;
    return this;
  }

  send() {
    let mHeaders = new Headers();
    let data = new FormData();

    if (this._needAuth)
      mHeaders.append( 'Authorization', `Bearer ${UserModel.getUserInfo('jwt')}`);

    for(let i in this._tempData.data) {
      data.append( i, this._tempData.data[i]);
    }
    
    let init = {
      method: this._tempData.method,
      headers: mHeaders,
      mode: this._tempData.mode,
      body: data
    };

    return new Promise( ( resolve, reject) => {
      fetch( this._tempData.url, init)
      .then( (response) => {
        if (this._tempData.type == 'application/json')
          resolve(response.json());
        else 
          resolve(response);
      })
      .catch(reject);
    });
  }
}
