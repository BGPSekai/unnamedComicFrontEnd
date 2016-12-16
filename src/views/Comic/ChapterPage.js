import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FetchModule from '../../module/FetchModule';
import Container from '../../components/Container';
import { ChapterPageStyle, smallChapterPageStyle } from './ChapterPageStyle';
import Href from '../../components/Href';
import apiUrl from '../../res/apiUrl';
import UserModule from '../../module/UserModule';
import PageResponse from '../../module/PageResponse';
import TagElement from './TagElement';
import ComicFavorite from './ComicFavorite';

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
    //   .setDefaultStyle(ChapterPageStyle)
    //   .on(smallChapterPageStyle, (s) => {
    //     console.log(s);
    //     ChapterPageStyle = s;
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
      <div style={ChapterPageStyle.root}>
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
          <div style={ChapterPageStyle.infomation}>
            <div style={ChapterPageStyle.imageBlock}>
              {
                this.props.comicData.id &&
                <img
                  src={apiUrl.getReplaceUrl(apiUrl.comic.cover, { id: this.props.comicData.id }) }
                  style={ChapterPageStyle.img}
                  />
              }
            </div>
            <div style={ChapterPageStyle.nameInfo}>
              <h3>{this.props.comicData.name}</h3>
              <p>作者：{this.props.comicData.author}</p>
              <p>上傳者：
                {
                  this.props.comicData.publish_by &&
                  <Href style={ChapterPageStyle.link} href={apiUrl.getReplaceUrl(apiUrl.front.getUserInfo, {userId : this.props.comicData.publish_by.id})}>
                    {this.props.comicData.publish_by.name}
                  </Href>
                }
              </p>
              <p>{this.props.comicData.summary}</p>
              <p>收藏數：{this.props.comicData.favorites}</p>
              <div style={ChapterPageStyle.tagWrapper}>
                <span style={ChapterPageStyle.tagTab}>標籤：</span>
                <TagElement tags={this.state.comicData.tags} comicId={this.props.comicData.id} />
              </div>
              {
                UserModule.checkIsLogin() &&
                <TagInput onSubmit={this._handleTagInputEnter} />
              }
            </div>
          </div>
        </Container>
        <div style={ChapterPageStyle.secendSection}>
          <Container style={ChapterPageStyle.secendSectionContainer}>
            <FlatButton label="檢舉" backgroundColor={ChapterPageStyle.secendSectionButton.background} />
          </Container>
        </div>
        <Container style={ChapterPageStyle.chapterSelectContainer}>
          {
            this.props.backEnd &&
            <FloatingActionButton
              secondary={true}
              style={ChapterPageStyle.addChapter}
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
            <ComicFavorite style={ChapterPageStyle.addChapter} comicId={this.state.comicData.id} />
          }
          <Paper style={ChapterPageStyle.mainPaper}>
            {this.props.chapterData.map((value, i) => {
              return (
                <Href
                  key={i}
                  underLine={false}
                  href={apiUrl.getReplaceUrl(this.props.linkUrl, { comicId: this.props.comicData.id, chapterId: i + 1 }) }
                  >
                  <FlatButton label={`${i + 1} - ${value.name}`} style={ChapterPageStyle.chapterButton} />
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
