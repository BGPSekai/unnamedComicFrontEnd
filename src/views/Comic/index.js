import React, { Component } from 'react';
import GridList from 'material-ui/GridList';
import Container from '../../components/Container';
import ComicElement from './ComicElement';
import styles from './styles';
import apiUrl from '../../res/apiUrl';
import FetchModule from '../../module/FetchModule';

export default class Comic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      page: 1,
      comics: []
    };

    this._getData();
  }

  _getData(page = 1) {
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
        this.setState({
          loading: false,
          comics: data.comics
        });
      });
  }

  render() {
    return (
      <div style={styles.root}>
        <Container>
          <div
            style={styles.gridList}
          >
          {
            (!this.state.loading) ?
            <ComicElement comicData={this.state.comics} /> :
            <div />
          }
          </div>
        </Container>
      </div>
    );
  }
}
