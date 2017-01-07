import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Col } from 'react-bootstrap';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FetchModule from '../../../module/FetchModule';
import Container from '../../../components/Container';
import Image from '../../../components/Image';
import { ChapterStyle, smallChapterStyle } from './Style';
import Href from '../../../components/Href';
import apiUrl from '../../../res/apiUrl';
import UserModule from '../../../module/UserModule';
import PageResponse from '../../../module/PageResponse';
import TagElement from './TagElement';
import ComicFavorite from './ComicFavorite';
import Toolbar from './Toolbar';

class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInput: ''
    };

    this._handleTagInputChange = this._handleTagInputChange.bind(this);
  }

  _handleTagInputChange() {
    this.setState({
      tagInput: this.refs.tagInput.getValue()
    });
  }

  render() {
    return (
      <div>
        <TextField
          ref="tagInput"
          hintText="輸入 Tag 名稱按 Enter 即可標記"
          floatingLabelText="標註 Tag 標籤"
          value={this.state.tagInput}
          floatingLabelStyle={{ color: '#fff' }}
          hintStyle={{ color: '#EEEEEE' }}
          underlineStyle={{ borderColor: 'rgb(240, 98, 146)' }}
          underlineFocusStyle={{ borderColor: 'rgb(240, 98, 146)' }}
          inputStyle={{ color: '#fff' }}
          onChange={this._handleTagInputChange}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              this.props.onSubmit(this.refs.tagInput.getValue());
              this.setState({tagInput: ''});
            }
          }}
          />
      </div>
    );
  }
}

class ChapterPage extends Component {
  constructor(params) {
    super(params);
    this.state = {
      comicData: {},
      tagSelect: -1,
      tagElement: null,
      errorText: ''
    };

    this._handleTagInputEnter = this._handleTagInputEnter.bind(this);
    // PageResponse
    //   .setQuery('(max-width: 400px)')
    //   .setDefaultStyle(ChapterStyle)
    //   .on(smallChapterStyle, (s) => {
    //     console.log(s);
    //     ChapterStyle = s;
    //     //this.forceUpdate();
    //   });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ comicData: nextProps.comicData });
  }

  _handleTagInputEnter(tagName) {
    let tag = tagName.replace(/[?#%\///]/g, '');
    if (tag)
      new FetchModule()
        .setCors('cors')
        .auth()
        .setUrl(apiUrl.tag)
        .setMethod('POST')
        .setType('json')
        .replaceVariable({ tagName: tag, comicId: this.state.comicData.id })
        .send()
        .then((data) => {
          if (data.status === 'success') {
            let comic = this.state.comicData;
            comic.tags = data.tags;
            this.setState({
              comicData: comic
            });
          } else {
            this.setState({ errorText: data.message });
          };
        });
  }

  render() {
    return (
      <div style={ChapterStyle.root}>
        <Dialog
            title="警告"
            actions={
              [
                <FlatButton
                  label="了解"
                  primary={true}
                  keyboardFocused={true}
                  onTouchTap={() => this.setState({ errorText: '' }) }
                />
              ]
            }
            modal={false}
            open={this.state.errorText != ''}
            onRequestClose={() => this.setState({ errorText: '' }) }
            >
            {this.state.errorText}
          </Dialog>
        <Container>
          <Col xs={8} xsOffset={2} sm={5} smOffset={0} md={4}>
            <div style={{textAlign: 'center'}}>
              <Paper zDepth={2} style={ChapterStyle.imgWrapper}>
              {
                this.props.comicData.id &&
                <Image
                  src={apiUrl.getReplaceUrl(apiUrl.comic.cover, { id: this.props.comicData.id }) }
                  style={ChapterStyle.img}
                  withPercent
                  />
              }
              </Paper>
            </div>
          </Col>
          <Col xs={12} sm={7} md={8} style={ChapterStyle.nameInfo}>
            <h3>{this.props.comicData.name}</h3>
            <p>作者：{this.props.comicData.author}</p>
            <p>上傳者：
              {
                this.props.comicData.publish_by &&
                <Href style={ChapterStyle.link} href={apiUrl.getReplaceUrl(apiUrl.front.getUserInfo, {userId : this.props.comicData.publish_by.id})}>
                  {this.props.comicData.publish_by.name}
                </Href>
              }
            </p>
            <p>{this.props.comicData.summary}</p>
            <p>收藏數：{this.props.comicData.favorites}</p>
            <div style={ChapterStyle.tagWrapper}>
              <span style={ChapterStyle.tagTab}>標籤：</span>
              <TagElement tags={this.state.comicData.tags} comicId={this.props.comicData.id} />
            </div>
            {
              UserModule.checkIsLogin() &&
              <TagInput onSubmit={this._handleTagInputEnter} />
            }
          </Col>
        </Container>
        <div style={ChapterStyle.secendSection}>
          <Toolbar />
        </div>
        <Container style={ChapterStyle.chapterSelectContainer}>
          {
            this.props.backEnd &&
            <FloatingActionButton
              secondary={true}
              style={ChapterStyle.addChapter}
              onTouchTap={() => {
                browserHistory.push(apiUrl.getReplaceUrl(apiUrl.front.publishChapter, { comicId: this.props.comicData.id }))
              }
              }
              >
              <ContentAdd />
            </FloatingActionButton>
          }
          {
            UserModule.checkIsLogin() &&
            <ComicFavorite style={ChapterStyle.addChapter} comicId={this.state.comicData.id} />
          }
          <Paper style={ChapterStyle.mainPaper}>
            {this.props.chapterData.map((value, i) => {
              return (
                <Href
                  key={i}
                  underLine={false}
                  href={apiUrl.getReplaceUrl(this.props.linkUrl, { comicId: this.props.comicData.id, chapterId: i + 1 }) }
                  >
                  <FlatButton label={`${i + 1} - ${value.name}`} style={ChapterStyle.chapterButton} />
                </Href>);
            }) }
          </Paper>
        </Container>
      </div>
    );
  }
}

ChapterPage.propTypes = {
  comicData: PropTypes.object.isRequired,
  chapterData: PropTypes.array.isRequired
}

ChapterPage.defaultProps = {
  comicData: {},
  chapterData: []
};

export default ChapterPage;
