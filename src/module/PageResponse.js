export default new class PageResponse {
  constructor() {
    this._query = '';
    this._defaultStyle = {};
    this._replaceStyle = {};
  }

  setDefaultStyle(style = {}) {
    this._defaultStyle = JSON.parse(JSON.stringify(style));
    return this;
  }

  setQuery(query = '') {
    this._query = query;
    return this;
  }

  mergeStyle(obj1 = {}, obj2 = {}) {
    for (var p in obj2) {
      try {
        // Property in destination object set; update its value.
        if ( obj2[p].constructor==Object ) {
          obj1[p] = this.changeStyle(obj1[p], obj2[p]);
        } else {
          obj1[p] = obj2[p];
        }
      } catch (e) {
        // Property in destination object not set; create it and set its value.
        obj1[p] = obj2[p];
      }
    }

    return obj1;
  }

  handleChangeEvent(data, changeStyle, func) {
    console.log(this._defaultStyle);
    if (data.matches) {
      this._replaceStyle = this.mergeStyle(this._defaultStyle, changeStyle);
    } else {
      this._replaceStyle = this._defaultStyle;
    };
    func(this._replaceStyle, data);
  }

  on(changeStyle = {}, func = () => { }) {
    const mql = window.matchMedia(this._query);
    mql.addListener((data) => {
      this.handleChangeEvent.call(this, data, changeStyle, func)
    });
  }
}
