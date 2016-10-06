import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import Container from '../../components/Container';
import FileUpload from '../../components/FileUpload';
import SortableList from '../../components/SorttableList';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class ChapterEditer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formState: 0,
      currentUploadCount: 0,
      totalUploadCount: 0,
      chapterInfo : {},
      pageData: []
    };

    this._onFileUploadChange = this._onFileUploadChange.bind(this);
    this._onListChange = this._onListChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    new FetchModule()
      .setUrl(apiUrl.comic.info)
      .replaceVariable({
        'id': this.props.params.comicId
      })
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState({ chapterInfo: data.chapters[this.props.params.chapterId - 1] });
        this._getAllUploadedImage(this._getImageData());
      });
  }

  *_getImageData() {
    for (let i = 1;i <= this.state.chapterInfo.pages; i++) {
      yield {
        defaultIndex: i,
        isDelete: false,
        image: apiUrl.getReplaceUrl(apiUrl.comic.view, {page: i, token: this.state.chapterInfo.token}),
        file: {
          name : `原始第 ${i} 張照片`,
          // testIng: 
          //   new FetchModule()
          //     .setUrl(apiUrl.getReplaceUrl(apiUrl.comic.view, {page: i, token: this.state.chapterInfo.token}))
          //     .setCors('cors')
          //     .setMethod('GET')
          //     .setType('blob')
          //     .send()
          //     .then((data) => {
          //       console.log(data);
          //     })
        }
      };
    }
    return false;
  }

  /* 從伺服器端抓回已上傳圖片添加進排序資料 */
  _getAllUploadedImage(imageData = {}, allData = []) {
    let ImageData = imageData.next();
    // 判斷是否有資料
    if (ImageData.value) {
      allData.push(ImageData.value);
    };

    if (!ImageData.done)
      this._getAllUploadedImage(imageData, allData);
    else {
      console.log(allData);
      this.setState({ pageData : allData });
    };
  }

  _onFileUploadChange(files) {
    this.refs.imageUploader.getAllImagePreview(0, (array = []) => {
      let putData = [];

      array.map((data, i) => {
        putData[i] = {
          file: files[i],
          isDelete: false,
          defaultIndex: null,
          image: data
        };
      });
      
      this.setState({
        pageData: this.state.pageData.concat(putData)
      });
    });
  }

  _onListChange(data) {
    this.setState({
      pageData: data.listData
    });
  }

  *_uploadImage() {
    let pageData = this.state.pageData;
    let max = pageData.length;

    //改成每5比一次批次上傳
    for (let i = 0; i < max;) {
      let uploadImages = [];
      let indexes = [];
      let counter = 0;
      let ii = i;
      
      while (counter < 5 && ii < max ) {
        if (pageData[ii] && !pageData[ii].defaultIndex) {
          uploadImages.push(pageData[ii].file);
          indexes.push(ii + 1);
          counter++;
        }
        ii++;
      }
      //console.log(i+' to '+ii+', max:'+max);
      i = ii;

      yield {
        data: { index: indexes, images: uploadImages, newIndex: ii, maxIndex: max },
        fetch: indexes.length ?
          (new FetchModule()
          .setUrl(apiUrl.getReplaceUrl(apiUrl.publish.batchChapterPage,
            { id: this.state.chapterInfo.id }
          ))
          .auth()
          .setCors('cors')
          .setMethod('POST')
          .setType('json')
          .setData({ index: indexes, images: uploadImages })
          .send()) : {}
      };
    }

    return null;//finish
  }

  _batchUploadAllImage(images = {}) {
    let imageData = images.next();
    if (!imageData.done) {
      console.log(imageData.value);
      if (imageData.value.fetch.then) {
        imageData.value.fetch.then(() => {
          console.log(imageData.value.data.newIndex);
          
          this.setState({
            formState: 2, 
            currentUploadCount: imageData.value.data.newIndex, 
            totalUploadCount: imageData.value.data.maxIndex 
          });

          this._batchUploadAllImage(images);
        });
      };
    } else {
      this.setState({
        formState: 4
      });

      console.log('完成囉~~~~');
    };
  }

  _uploadPageChange() {
    let pageData = this.state.pageData;
    let max = pageData.length;
    let newIndex = [];
    let counter = 0;

    for (let i = 0; i <= max; i++) {
      if (pageData[i] && pageData[i].defaultIndex) {
        let defaultIndex = pageData[i].defaultIndex;
        newIndex[defaultIndex] = pageData[i].isDelete? 0 : (++counter);
      } else if (pageData[i]) {
        // 填充需要新增的圖片
        counter++;
      };
    }

    console.log({ new_index: newIndex });

    return  {
      fetch: newIndex.length? 
        (new FetchModule()
          .setUrl(apiUrl.getReplaceUrl(apiUrl.publish.batchChapterPage,
            { id: this.state.chapterInfo.id }
          ))
          .auth()
          .setCors('cors')
          .setMethod('POST')
          .setType('json')
          .setData({ new_index: newIndex })
          .send()) : {},
      needFetch: newIndex.length? true: false
    };
  }

  _onSubmit() {
    let uploadChange = this._uploadPageChange();
    let images = this._uploadImage();

    this.setState({
      formState: 1,
      totalUploadCount: this.state.pageData.filter((val) => { return !val.defaultIndex;}).length
    });

    if (uploadChange.needFetch)
      uploadChange.fetch.then((x) => {
        this.setState({formState: 2});
        this._batchUploadAllImage(images);
      });
    else {
      this.setState({formState: 2});
      this._batchUploadAllImage(images);
    };
  }
  
  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardHeader
              title={this.state.chapterInfo.name}
              subtitle="章節編輯"
            />
            {
              this.state.formState == 0 &&
              <div>
                <FileUpload
                ref="imageUploader"
                multiple={true}
                onChange={this._onFileUploadChange}
                >
                <h3>新增漫畫圖片</h3>
                </FileUpload>
                <SortableList 
                  listData={this.state.pageData}
                  onChange={this._onListChange}
                  editMode
                  />
                <RaisedButton label="修改" style={{margin: 12}} primary={true} onTouchTap={this._onSubmit} />
              </div>  
            }
            {
              this.state.formState !== 0 &&
              <Stepper activeStep={this.state.formState - 1}>
                <Step>
                  <StepLabel>修改章節資訊</StepLabel>
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
      </div>
    );
  }
}

export default ChapterEditer;
