import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import Container from '../../components/Container';
import FileUpload from '../../components/FileUpload';
import FetchModule from '../../module/FetchModule';
import SortableList from '../../components/SorttableList';
import apiUrl from '../../res/apiUrl';
import styles from './styles';

export default class ChapterUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadList: []
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onListChange = this._onListChange.bind(this);
  }

  handlePageChange(page) {
    browserHistory.push(page);
  }

  _onChange(files) {
    this.refs.images.getAllImagePreview( 0, (array = []) => {
      let putData = [];

      array.map( ( data, i) => {
        putData[i] = {
          file: files[i],
          image: data
        };
      });
      
      this.setState({
        uploadList: this.state.uploadList.concat(putData)
      });
    });
  }

  _onListChange(obj) {
    this.setState({
      uploadList: obj.listData
    });
  }

  _onSubmit() {
    let data = {
      name: this.refs.name.getValue(),
      images: []
    };

    this.refs.uploadList.state.listData.map(( val, i) => {
      data.images.push(val.file);
    });
    
    new FetchModule()
      .setUrl(apiUrl.getReplaceUrl(apiUrl.publish.chapter, {id: this.props.routeParams.comicId}))
      .auth()
      .setCros('cors')
      .setMethod('POST')
      .setType('json')
      .setData(data)
      .send()
      .then( (data) => {
        if (data.status === 'success') {
          this.handlePageChange(
            apiUrl.getReplaceUrl( 
              apiUrl.front.publishChapterSelecter, 
              {comicId: this.props.routeParams.comicId}
            )
          );
        };
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <CardTitle title="新增漫畫章節" subtitle="上傳漫畫圖片" />
          <CardText>
            <TextField 
              hintText="輸入您的章節名稱"
              floatingLabelText="章節標題"
              ref="name"
              fullWidth
            /><br />
            <FileUpload 
              ref="images"
              multiple={true}
              onChange={this._onChange}
            >
              <h1>上傳圖片</h1>
              <p>丟入圖片或者點擊此區域</p>
            </FileUpload>
            <SortableList 
              ref="uploadList"
              listData={this.state.uploadList}
              onChange={this._onListChange}
            />
          </CardText>
          <CardActions>
            <RaisedButton 
              label="送出" 
              secondary={true} 
              onTouchTap={this._onSubmit}
            />
          </CardActions>
        </Card>
      </Container>
    );
  };
}
