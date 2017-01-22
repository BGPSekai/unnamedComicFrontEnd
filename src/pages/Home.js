import React, { Component } from 'react';
import FetchModule from 'module/FetchModule';
import apiUrl from 'res/apiUrl';
import Container from 'components/Container';
import Href from 'components/Href';
import ComicElement from 'views/Comic/ComicElement';
import styles from 'views/Home/styles';

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
        	<h3>活動專區</h3>
        </Container>
        <div style={styles.mSecend}>
          <Container>
            <h3>
              最新更新
              <Href href="/comic" style={styles.headerLink}>更多 > </Href>
            </h3>
            <ComicElement linkUrl={apiUrl.front.comicInfo} comicData={this.state.lastComics} />
          </Container>
        </div>
        <Container>
        	<h3>熱門標籤</h3>
        </Container>
      </div>
    );
  }
}
