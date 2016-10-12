import React, { Component } from 'react';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import Container from '../../components/Container';
import ComicElement from '../Comic/ComicElement';
import styles from './styles';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      lastComics: []
    };

    this._getData();
  }

  _getData(page = 1) {
    new FetchModule()
      .setUrl(apiUrl.comic.list)
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .replaceVariable({
        page: 1
      })
      .send()
      .then( (data) => {
        this.setState({
          loading: false,
          lastComics: data.comics.slice(0, 8)
        });
      });
  }

  render() {
    return (
      <div>
        <Container style={styles.mHeader}>
        	活動專區
        </Container>
        <div style={styles.mSecend}>
          <Container>
            <div>最新更新</div>
            <ComicElement linkUrl={apiUrl.front.comicInfo} comicData={this.state.lastComics} />
          </Container>
        </div>
        <Container>
        	  熱門標籤
        </Container>
      </div>
    );
  }
}
