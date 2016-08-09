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
  }

  setType(type) {
    this._tempData.type = type;
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
    this._tempData.url = url;
    return this;  
  }

  setData(data = {}) {
    this._tempData.data = data;
    return this;
  }

  send() {
    return new Promise( ( resolve, reject) => {
      fetch( this._tempData.url, {
        method: this._tempData.method,
        mode: this._tempData.mode,
        body: JSON.stringify(this._tempData.data)
      })
      .then( (response) => {
        if (this._tempData.type == 'json')
          resolve(response.json());
        else 
          resolve(response);
      })
      .then(reject);
    });
  }
}
