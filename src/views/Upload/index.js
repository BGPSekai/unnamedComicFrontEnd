import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/lib/raised-button';
import Divider from 'material-ui/lib/divider';
import Container from '../../components/Container';
import ChapterUploadSelect from './ChapterUploadSelect';
import styles from './styles';

export default class Upload extends Component {
  handlePageChange(page) {
    browserHistory.push(page);
  }

  render() {
    return (
      <Container>
        <RaisedButton 
          label="新增漫畫" 
          primary={true} 
          onTouchTap={this.handlePageChange.bind( this, '/upload/comic')}
        />
        <Divider />
        <p>或者找尋漫畫新增章節</p>
        <ChapterUploadSelect />
      </Container>
    );
  };
}
