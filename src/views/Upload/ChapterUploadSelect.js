import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import ComicElement from '../Comic/ComicElement';

let comicData = [];

export default class ChapterUploadSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1
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
        if (data.comics)
          comicData = comicData.concat(data.comics);
        this.setState({
          loading: false
        });
      });
  }

  render() {
    return (
      <ComicElement 
        comicData={comicData} 
        linkUrl={apiUrl.front.publishChapter}
      />
    );
  };
}
