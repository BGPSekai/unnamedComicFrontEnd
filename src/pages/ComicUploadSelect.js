import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Col } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import Href from 'components/Href';
import Container from 'components/Container';
import FetchModule from 'module/FetchModule';
import UserModule from 'module/UserModule';
import apiUrl from 'res/apiUrl';
import ComicElement from 'views/Comic/ComicElement';
import styles from 'views/Comic/styles';

class MenuList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper style={{ marginBottom: 15}}>
        <List>
          <Href href={apiUrl.front.upload.index}><ListItem primaryText="我的漫畫" /></Href>
          <Href href={apiUrl.front.upload.shared}><ListItem primaryText="與我共用" /></Href>
          <ListItem 
            primaryText="共用管理"
            primaryTogglesNestedList={true}
            nestedItems={[
              <Href key={1} style={{ display: 'block'}} href={apiUrl.front.upload.shareAccess}>
                <ListItem
                  primaryText="共用要求"
                  style={styles.listItem}
                  />
              </Href>,
              <Href key={2} href={apiUrl.front.upload.manage}>
                <ListItem
                  primaryText="共用管理"
                  style={styles.listItem}
                  />
              </Href>
            ]}
            />
        </List>
      </Paper>
    );
  }
}

export default class ChapterUploadSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      allPage: 0,
      comics: []
    };

    this._getData();
  }

  _getData() {
    new FetchModule()
      .setUrl(apiUrl.search.searchByPublisher)
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .replaceVariable({
        page: this.state.page,
        name: UserModule.getUserInfo('userId')
      })
      .send()
      .then( (data) => {
        let comicData = [];
        if (data.comics)
          comicData = this.state.comics.concat(data.comics);
        this.setState({
          loading: false,
          comics: comicData,
          allPage: data.pages
        });
      });
  }

  _handlePageChange(page) {
    browserHistory.push(page);
  }

  _loadMorePage() {
    this.setState({
      page: this.state.page + 1,
    }, this._getData);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Col sm={3}>
          <MenuList />
        </Col>
        <Col sm={9}>
          <RaisedButton 
            label="新增漫畫" 
            primary={true} 
            onTouchTap={this._handlePageChange.bind( this, apiUrl.front.upload.comic)}
          />
          <Divider />
          <p>或者找尋漫畫新增章節</p>
          <ComicElement 
            comicData={this.state.comics} 
            linkUrl={apiUrl.front.publishChapterSelecter}
            needLoadMore={this.state.page < this.state.allPage}
            loadMore={() => {this.setState({page: this.state.page + 1}, () => this._getData())}}
          />
        </Col>
      </Container>
    );
  };
}
