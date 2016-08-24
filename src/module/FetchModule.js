import 'whatwg-fetch';
import UserModel from './UserModule';

export default class FetchModule {
  constructor() {
    let tempData = {
      default_url: '',
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
    this._tempData.type = (type === 'json') ? 'application/json' : type;
    return this;
  }

  setMethod(method) {
    this._tempData.method = method;
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
    this._tempData.default_url = url;
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
  /**
   * 取代 {變數} 內容
   * @param Object
   * @returns this class
   */
  replaceVariable( data = {}) {
    let url = this._tempData.default_url;
    for(let i in data) {
      url = url.replace( '{'+i+'}', data[i]);
    }
    this._tempData.url = url;
    return this;
  }

  send() {
    let data = new FormData();
    let url = new URL(this._tempData.url);

    if (this._needAuth)
      url.searchParams.append('token',UserModel.getUserInfo('jwt'));
      
    for(let i in this._tempData.data) {
      if (this._tempData.data[i])
        if (Array.isArray(this._tempData.data[i])) {
          let label = `${i}[]`;
          this._tempData.data[i].map(( val, i2) => {
            data.append( label, this._tempData.data[i][i2]);
          });
        } else {
          data.append( i, this._tempData.data[i]);
        };
    }
    
    let init = {
      method: this._tempData.method,
      mode: this._tempData.mode,
      body: data
    };
    
    return new Promise( ( resolve, reject) => {
      if (this._needAuth && UserModel.checkHasExpired()) {
        UserModel.updateToken().then(() => {
          url.searchParams.delete('token');
          url.searchParams.append('token', UserModel.getUserInfo('jwt'));
          this._fetch( url, init, resolve, reject);
        });
      } else {
        this._fetch( url, init, resolve, reject);
      };
    });
  }

  _parseJSON(response) {
    return response.text().then(function(text) {
      return text ? JSON.parse(text) : {}
    })
  }
  /**
   * 暫時的 
   * 取得速度
   */
  consume(stream, total = 0) {
    console.log(stream.read());
    while (stream.state === 'readable') {
      var data = stream.read();
      total += data.byteLength;
      console.log('received ' + data.byteLength + ' bytes (' + total + ' bytes in total).')
    }
    if (stream.state === 'waiting') {
      stream.ready.then(() => consume(stream, total))
    }
    return stream.closed;
  }

  _fetch( url, init = {}, resolve = () => {}, reject = () => {}) {
    if (init.method === 'GET')
      delete init.body;
    fetch( url, init)
      .then( (response) => {
        this.consume(response.body);
        if (this._tempData.type === 'application/json' && response.json)
          resolve(this._parseJSON(response), response);
        else 
          resolve(response);
      })
      .then(reject);
  }
}
