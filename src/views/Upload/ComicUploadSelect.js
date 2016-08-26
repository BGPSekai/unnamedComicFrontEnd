import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Container from '../../components/Container';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import ComicElement from '../Comic/ComicElement';
import styles from './styles';

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
      .setCors('cors')
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

  _handlePageChange(page) {
    browserHistory.push(page);
  }

  render() {
    return (
      <Container style={styles.container}>
        <RaisedButton 
          label="新增漫畫" 
          primary={true} 
          onTouchTap={this._handlePageChange.bind( this, '/upload/comic')}
        />
        <Divider />
        <p>或者找尋漫畫新增章節</p>
        <ComicElement 
          comicData={this.state.comics} 
          linkUrl={apiUrl.front.publishChapterSelecter}
        />
      </Container>
    );
  };
}
