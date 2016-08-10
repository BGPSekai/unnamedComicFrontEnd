class LocalStorage {
  constructor() {}

  get(name) {
    return localStorage.getItem(name);
  }
  
  set(data = {}) {
    for(let i in data) {
      localStorage.setItem( i, data[i]);
    };
  }

}

export default new LocalStorage;
