import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import CardActions from 'material-ui/lib/card/card-actions';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import LinearProgress from 'material-ui/lib/linear-progress';
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

    this._changePreviewImg = this._changePreviewImg.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
  }

  handlePageChange(page) {
    browserHistory.push(page);
  }

  _changePreviewImg(data) {
  }

  _onChange(files) {
    //this.refs.cover.getImagePreview(0).then(this._changePreviewImg);
    this.refs.images.getAllImagePreview( 0, (array) => {
      let putData = [];
      array.map( () => {
        
      });
      this.setState({
        uploadList: array
      });
    });
  }
  
  _onSubmit() {
    let data = {
      
    };

    // new FetchModule()
    //   .setUrl(apiUrl.publish.comic)
    //   .auth()
    //   .setCros('cors')
    //   .setMethod('POST')
    //   .setType('json')
    //   .setData(data)
    //   .send()
    //   .then( (data) => {
    //     console.log(data);
    //     if (data.status === 'success') {
    //       console.log(apiUrl.getReplaceUrl(
    //         apiUrl.front.publishChapter,
    //         {
    //           comicId: data.comic.id
    //         }
    //       ));
    //       browserHistory.push(apiUrl.getReplaceUrl(
    //         apiUrl.front.publishChapter,
    //         {
    //           comicId: data.comic.id
    //         }
    //       ));
    //     };
    //   });
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
            <SortableList data={this.state.uploadList} />
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
