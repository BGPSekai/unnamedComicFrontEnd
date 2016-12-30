class DataTranslate {
  constructor(data) {
    this._data = data;
  }

  toString() {
    return JSON.stringify(this._data);
  }

  toObject() {
    return JSON.parse(this._data);
  }
}

class LocalStorage {
  constructor() {
    this._lS = localStorage;
  }

  remove(name) {
    this._lS.removeItem(name);
  }

  get(name) {
    return this._lS.getItem(name);
  }

  replace(name, data = {}) {
    let _data = new DataTranslate(this.get(name)).toObject();
    for (let i in data) {
      if (data[i])
        _data[i] = data[i];
      else 
        delete _data[i];
    }
  }
  
  set(data = {}) {
    for (let i in data) {
      this._lS.setItem( i, data[i]);
    };
  }

}

export default new LocalStorage;
