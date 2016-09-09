import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';;
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Container from '../../components/Container';
import FileUpload from '../../components/FileUpload';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import styles from './styles';

export default class ComicUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewImg: '',
      types: [],
      typeValue: 1
    };

    this._changePreviewImg = this._changePreviewImg.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._handleTypeChange = this._handleTypeChange.bind(this);

    new FetchModule()
      .setUrl(apiUrl.type)
      .setType('json')
      .setCors('cros')
      .setMethod('GET')
      .send()
      .then((data) => {
        this.setState(data);
      });
  }

  handlePageChange(page) {
    browserHistory.push(page);
  }

  _handleTypeChange(event, index, value) {
    this.setState({typeValue: value});
  }

  _changePreviewImg(data) {
    if (data)
    this.setState({
      previewImg: data
    });
  }

  _onChange(files) {
    this.refs.cover.getImagePreview(0).then(this._changePreviewImg);
  }
  
  _onSubmit() {
    let data = {
      name: this.refs.name.getValue(),
      author: this.refs.author.getValue(),
      summary: this.refs.summary.getValue(),
      cover: this.refs.cover.getFile(0),
      type: this.state.typeValue
    };

    new FetchModule()
      .setUrl(apiUrl.publish.comic)
      .auth()
      .setCors('cors')
      .setMethod('POST')
      .setType('json')
      .setData(data)
      .send()
      .then( (data) => {
        if (data.status === 'success') {
          browserHistory.push(apiUrl.getReplaceUrl(
            apiUrl.front.publishChapterSelecter,
            {
              comicId: data.comic.id
            }
          ));
        };
      });
  }

  render() {
    return (
      <Container>
        <Card>
          <CardTitle title="投稿漫畫作品" subtitle="新增漫畫" />
          <CardText>
            <TextField 
              hintText="漫畫名稱"
              floatingLabelText="漫畫名稱"
              ref="name"
              fullWidth
            /><br />
            <SelectField 
              ref="type" 
              value={this.state.typeValue} 
              fullWidth
              onChange={this._handleTypeChange}  
            >
            {
              this.state.types.map(( data, i) => {
                return <MenuItem value={data.id} key={i} primaryText={data.name} />
              })
            }
            </SelectField><br />
            <TextField 
              hintText="漫畫作者"
              floatingLabelText="漫畫作者(輸入名稱)"
              ref="author"
              fullWidth
            /><br />
            <TextField 
              hintText="漫畫簡介"
              floatingLabelText="漫畫簡介"
              ref="summary"
              fullWidth
              multiLine={true}
              rows={2}
              rowsMax={4}
            /><br />
            <FileUpload 
              ref="cover"
              multiple={false}
              onChange={this._onChange}
            >
              <h1>上傳圖片</h1>
              <p>丟入圖片或者點擊此區域</p>
            </FileUpload>
            <CardMedia 
              overlay={<CardTitle title="封面圖片預覽" />}
            >
              <img src={this.state.previewImg} style={styles.coverImgPreview}/>
            </CardMedia>
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
