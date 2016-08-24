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
   * @param mode same-origin no-cors cors
   */
  setCors(mode = 'same-origin') {
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
   * 取得下載速度(上傳無解)
   */

  consume(response, fileSize = 0) {
    let progress = 0;
    let pump = (reader) => {
      reader.read().then(function(result) {
        if (result.done) {
          return;
        }
        // retrieve the multi-byte chunk of data
        var chunk = result.value;
        var text = '';
        // since the chunk can be multiple bytes, iterate through
        // each byte while skipping the byte order mark
        // (assuming UTF-8 with single-byte chars)
        // for (var i = 3; i < chunk.byteLength; i++) {
        //   text += String.fromCharCode(chunk[i]);
        // }
        // report our current progress
        progress += chunk.byteLength;
        //console.log(((progress / contentLength) * 100) + '%');
        // go to next chunk via recursion
        return pump(reader);
      });
    };

    return pump(response.body.getReader());
  }

  _fetch( url, init = {}, resolve = () => {}, reject = () => {}) {
    if (init.method === 'GET')
      delete init.body;
    fetch( url, init)
      .then( (response) => {
        this.consume(response.clone());
        if (this._tempData.type === 'application/json' && response.json)
          resolve(this._parseJSON(response), response);
        else 
          resolve(response);
      })
      .then(reject);
  }
}
