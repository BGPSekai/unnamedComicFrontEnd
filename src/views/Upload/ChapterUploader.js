import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
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
      chapterId: null,
      uploadList: [],
      totalUploadCount: 0,
      currentUploadCount: 0,
      formState: 0,
      errorText: []
    };

    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onListChange = this._onListChange.bind(this);
  }

  handlePageChange(page) {
    browserHistory.push(page);
  }

  _onChange(files) {
    this.refs.images.getAllImagePreview(0, (array = []) => {
      let putData = [];
      let concatData = [];

      array.map((data, i) => {
        putData[i] = {
          file: files[i],
          image: data
        };
      });
      concatData = this.state.uploadList.concat(putData);
      this.setState({
        uploadList: concatData,
        totalUploadCount: concatData.length
      });
    });
  }

  _onListChange(obj) {
    this.setState({
      uploadList: obj.listData,
      totalUploadCount: obj.listData.length
    });
  }

  *_uploadImage() {
    let listData = this.state.uploadList;
    let max = listData.length;
    //改成每5比一次批次上傳
    for (let i = 0; i < max; i += 5) {
      let uploadImages = [];
      let indexes = [];

      for (let ii = i; ii < i+5; ii++) {
        if (listData[ii]) {
          uploadImages.push(listData[ii].file);
          indexes.push(ii + 1);
        }
      }

      yield {
        data: { index: indexes },
        fetch:
        new FetchModule()
          .setUrl(apiUrl.getReplaceUrl(apiUrl.publish.batchChapterPage,
            { id: this.state.chapterId }
          ))
          .auth()
          .setCors('cors')
          .setMethod('POST')
          .setType('json')
          .setData({ index: indexes, images: uploadImages })
          .send()
      };
    }

    return null;//finish
  }

  _batchUploadAllImage(images = {}) {
    let ImageData = images.next();
    //console.log(ImageData);
    if (!ImageData.done) {
      ImageData.value.fetch.then((data) => {
        if (data.status === 'success')
          this.setState({ 
            currentUploadCount: this.state.currentUploadCount + ImageData.value.data.index.length 
          });
        
        if (this.state.currentUploadCount === this.state.totalUploadCount) {
          this.setState({
            formState: 3
          },() => {
            //換頁
            this.handlePageChange(
              apiUrl.getReplaceUrl( 
                apiUrl.front.publishChapterSelecter, 
                {comicId: this.props.routeParams.comicId}
            ));
          });
        };
        
        if (ImageData.value.data.index.length > 0)
          this._batchUploadAllImage(images);
      });
    } else {
      this.setState({
        formState: 3
      },() => {
        //換頁
        this.handlePageChange(
          apiUrl.getReplaceUrl( 
            apiUrl.front.publishChapterSelecter, 
            {comicId: this.props.routeParams.comicId}
        ));
      });
    };
  }

  _onSubmit() {
    this.setState({
      formState: 1,
      currentUploadCount: 0
    });

    new FetchModule()
      .setUrl(apiUrl.getReplaceUrl(apiUrl.publish.chapter, { id: this.props.routeParams.comicId }))
      .auth()
      .setCors('cors')
      .setMethod('POST')
      .setType('json')
      .setData({name: this.refs.name.getValue()})
      .send()
      .then((data) => {
        if (data.status === 'success') {
          this.setState({
            chapterId: data.chapter.id,
            formState: 2
          });

          let images = this._uploadImage();

          this._batchUploadAllImage(images);
        } else {
          this.setState({
            formState: 0,
            errorText: data.message
          });
        };
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <CardTitle title="新增漫畫章節" subtitle="上傳漫畫圖片" />
            <div style={{display: this.state.formState === 0?'block':'none'}}>
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
                <div style={styles.error}>
                  {this.state.errorText.map((data, i) => {
                    return (<div key={i}>{data}</div>);
                  })}
                </div>
                <RaisedButton
                  label="送出"
                  secondary={true}
                  onTouchTap={this._onSubmit}
                  />
              </CardActions>
            </div>
          {
            this.state.formState !== 0 &&
            <Stepper activeStep={this.state.formState - 1}>
              <Step>
                <StepLabel>上傳章節資訊</StepLabel>
              </Step>
              <Step>
                <StepLabel>上傳圖片({this.state.currentUploadCount}/{this.state.totalUploadCount}) </StepLabel>
              </Step>
              <Step>
                <StepLabel>完成</StepLabel>
              </Step>
            </Stepper>
          }
        </Card>
      </Container>
    );
  };
}
