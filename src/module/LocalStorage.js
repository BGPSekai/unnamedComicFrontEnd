const _lS = Symbol;
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
    this[_lS] = localStorage;
  }

  remove(name) {
    this[_lS].removeItem(name);
  }

  get(name) {
    return this[_lS].getItem(name);
  }

  getObject(name) {
    return new DataTranslate(this.get(name)||'{}').toObject();
  }

  replace(name, data = {}) {
    let _data = this.getObject(name),_Object = Object;
    for (let i in data) {
      if (data[i])
        _data[i] = data[i];
      else 
        delete _data[i];
    }
    _Object[name] = new DataTranslate(_data).toString();
    this.set(_Object);
    return _data;
  }
  
  set(data = {}) {
    for (let i in data) {
      this[_lS].setItem( i, data[i]);
    };
  }

}

export default new LocalStorage;
