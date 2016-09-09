import React, {Component} from 'react';
import ComicElement from '../Comic/ComicElement';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class SearchByName extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchName: this.props.params.searchName,
      pages: 1,
      allPage: 0,
      searchComics: []
    };

    this._getData( this.state.searchName );
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.params.searchName !== this.state.searchName ) {
      this._getData( nextProps.params.searchName );
      this.setState({searchName: nextProps.params.searchName, page: 1});
    };
  }

  _getData( searchName, searchPage = 1) {
     new FetchModule()
        .setUrl(apiUrl.getReplaceUrl( apiUrl.search.searchByName ,{name: searchName,page: searchPage}))
        .setCors('cors')
        .setMethod('GET')
        .setType('json')
        .send()
        .then((data) => {
          this.setState({
            searchComics: data.comics,
            allPage: data.pages,
            page: searchPage
          });
        });
  }

  render() {
    return (
      <div>
        搜尋頁面: {this.state.searchName}
        <ComicElement linkUrl={apiUrl.front.comicInfo} comicData={this.state.searchComics} />
      </div>
    );
  }
}

export default SearchByName;
