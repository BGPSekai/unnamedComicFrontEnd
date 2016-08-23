import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import ComicElement from '../Comic/ComicElement';

export default class ChapterUploadSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      comics: []
    };

    this._getData();
  }

  _getData() {
    new FetchModule()
      .setUrl(apiUrl.comic.list)
      .setCros('cors')
      .setMethod('GET')
      .setType('json')
      .replaceVariable({
        page: this.state.page
      })
      .send()
      .then( (data) => {
        let comicData = [];
        if (data.comics)
          comicData = this.state.comics.concat(data.comics);
        this.setState({
          loading: false,
          comics: comicData
        });
      });
  }

  render() {
    return (
      <ComicElement 
        comicData={this.state.comics} 
        linkUrl={apiUrl.front.publishChapterSelecter}
      />
    );
  };
}
