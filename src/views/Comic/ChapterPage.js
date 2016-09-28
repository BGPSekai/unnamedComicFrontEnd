import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';
import Dialog from 'material-ui/Dialog';
import FetchModule from '../../module/FetchModule';
import Container from '../../components/Container';
import { ChapterPageStyle, smallChapterPageStyle } from './ChapterPageStyle';
import Href from '../../components/Href';
import apiUrl from '../../res/apiUrl';
import UserModule from '../../module/UserModule';
import PageResponse from '../../module/PageResponse';

class ChapterPage extends Component {
  constructor(params) {
    super(params);
    this.state = {
      comicData: {},
      tagInput: '',
      errorText: ''
    };

    this._handleTagInputChange = this._handleTagInputChange.bind(this);
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

  _handleTagInputChange() {
    this.setState({
      tagInput: this.refs.tagInput.getValue()
    });
  }

  _handleTagInputEnter(e) {
    if (e.keyCode === 13) {
      let tag = this.state.tagInput.replace(/[?#%\///]/g, '');
      if (tag)
        new FetchModule()
          .setCors('cors')
          .auth()
          .setUrl(apiUrl.tag)
          .setMethod('GET')
          .setType('json')
          .replaceVariable({ tagName: tag, comicId: this.props.comicData.id })
          .send()
          .then((data) => {
            if (data.status === 'success') {
              let comic = this.state.comicData;
              comic.tags = data.tags;
              this.setState({
                comicData: comic,
                tagInput: ''
              });
            } else {
              this.setState({ errorText: data.message });
            };
          });
    };
  }

  _renderTag() {
    let tagElement = [];
    this.state.comicData.tags &&
      this.state.comicData.tags.map((val, i) => {
        tagElement.push(
          <Chip
            backgroundColor={'#F06292'}
            labelStyle={{ color: '#FCE4EC' }}
            key={i}
            style={ChapterPageStyle.tag}>
            {val}
          </Chip>
        );
      })
    return tagElement;
  }

  render() {
    return (
      <div style={ChapterPageStyle.root}>
        <Dialog
            title="發生問題"
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
              <div style={ChapterPageStyle.tagWrapper}>
                <span style={ChapterPageStyle.tagTab}>標籤：</span>
                {this._renderTag() }
              </div>
              {
                UserModule.checkIsLogin() &&
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
                    onKeyDown={this._handleTagInputEnter}
                    />
                </div>
              }
            </div>
          </div>
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
