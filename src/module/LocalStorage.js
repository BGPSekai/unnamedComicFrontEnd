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
  
  set(data = {}) {
    for (let i in data) {
      this._lS.setItem( i, data[i]);
    };
  }

}

export default new LocalStorage;
