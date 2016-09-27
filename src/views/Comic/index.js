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
      allPage: 0,
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
      .then((data) => {
        this.setState({
          loading: false,
          comics: this.state.comics.concat(data.comics),
          allPage: data.pages
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
                <ComicElement
                  linkUrl={apiUrl.front.comicInfo}
                  comicData={this.state.comics}
                  needLoadMore={this.state.page < this.state.allPage}
                  loadMore={() => { this.setState({ page: this.state.page + 1 }, this._getData.bind(this)); } }
                  /> :
                <div />
            }
          </div>
        </Container>
      </div>
    );
  }
}
