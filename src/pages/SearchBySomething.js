import React, {Component} from 'react';
import ComicElement from 'views/Comic/ComicElement';
import FetchModule from 'module/FetchModule';
import apiUrl from 'res/apiUrl';

class SearchBySomething extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchName: this.props.params.searchName,
      searchType: this.props.params.searchType,
      pages: 1,
      allPage: 0,
      searchComics: []
    };

    this.types = {
      tag: {search: 'searchByTag', name: '標籤'},
      name: {search: 'searchByName', name: '名稱'},
      type: {search: 'searchByType', name: '類型'},
      publisher: {search: 'searchByPublisher', name: '發行者'}
    };

    this._getData();
  }
  
  componentWillReceiveProps(nextProps) {
    if ( nextProps.params.searchName !== this.state.searchName || 
      nextProps.params.searchType !== this.state.searchType ) {
      this._getData( nextProps.params.searchName );
      this.setState({searchName: nextProps.params.searchName, searchType: nextProps.params.searchType, page: 1});
    };
  }

  _getData() {
     new FetchModule()
        .setUrl(apiUrl.getReplaceUrl( apiUrl.search[this.types[this.state.searchType].search] ,
          {name: this.state.searchName, page: this.state.pages}))
        .setCors('cors')
        .setMethod('GET')
        .setType('json')
        .send()
        .then((data) => {
          this.setState({
            searchComics: this.state.searchComics.concat(data.comics),
            allPage: data.pages
          });
        });
  }

  render() {
    return (
      <div>
        搜尋{this.types[this.state.searchType].name}: {this.state.searchName}
        <ComicElement 
          linkUrl={apiUrl.front.comicInfo} 
          comicData={this.state.searchComics} 
          needLoadMore={this.state.pages < this.state.allPage}
          loadMore={() => {this.setState({pages: this.state.pages + 1}, () => this._getData())}}
          />
      </div>
    );
  }
}

export default SearchBySomething;
