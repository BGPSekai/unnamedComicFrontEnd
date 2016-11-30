import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {Motion, spring, StaggeredMotion} from 'react-motion';
import Container from '../../components/Container';
import Image from '../../components/Image';
import styles from './ComicViewerStyle';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class ChatElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Toolbar style={styles.chatBar}>
        <TextField 
          hintText="來吐槽吧!"
          hintStyle={{color: '#ccc', padding: '0 20px'}}
          style={{margin: 0, padding: '0 20px', height: 40}}
          inputStyle={styles.chatInput}
          fullWidth
          />
        <ToolbarGroup>
          <FlatButton label="送出" primary={true} style={{height: 35, margin: '1px 24px'}} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

class ComicViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterId: parseInt(this.props.params.chapterId)
    };
    
    this._handleChapterChange = this._handleChapterChange.bind(this);
    this._handleToChapterPage = this._handleToChapterPage.bind(this);
  }

  //切換工具列顯示
  _toggleControll() {

  }

  _handleChapterChange(event, index, value) {
    if (value !== this.state.chapterId)
      browserHistory.push(
        apiUrl.getReplaceUrl(apiUrl.front.comicViewer,
          { comicId: this.props.params.comicId, chapterId: value }
        )
      );
  }

  _handleToChapterPage() {
    browserHistory.push(
        apiUrl.getReplaceUrl(apiUrl.front.comicInfo,
          { comicId: this.props.params.comicId}
        )
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.chapterId !== this.props.params.chapterId) {
      this.setState({ chapterId: parseInt(nextProps.params.chapterId) });
    };
  }

  render() {
    let ViewerImage = [];
    let ChapterSelecter = [];
    
    if (this.props.comicInfo.chapters.length) {
      let chapterInfo = this.props.comicInfo.chapters[this.state.chapterId - 1];
      if (chapterInfo)
        for (let i = 1; i <= chapterInfo.pages; i++) {
          ViewerImage.push(
            <Image
              src={`${apiUrl.getReplaceUrl(apiUrl.comic.view, { page: i, token: chapterInfo.token })}`}
              style={styles.image}
              key={`${this.props.params.chapterId}-${i}`}
              />
          );
        };

      this.props.comicInfo.chapters.map((val, i) => {
        ChapterSelecter.push(<MenuItem key={i} value={i + 1} primaryText={`第 ${i + 1} 章 - ${val.name}`} />);
      });
    }
    
    return (
      <div style={styles.root}>
        {
          this.props.comicInfo &&
          <div>
            <Motion defaultStyle={styles.viewerBar} style={{x: spring(10)}}>
              {(value) => <div>{value.x}</div>}{/* todo 點擊動畫效果 */}
            </Motion>
              <Toolbar style={styles.viewerBar}>
                <Container style={{ minHeight: 'auto', padding: 0 }}>
                  <ToolbarGroup firstChild={true}>
                    <IconButton onTouchTap={this._handleToChapterPage} style={styles.arrowBackIcon}>
                      <ArrowBackIcon />
                    </IconButton>
                    <DropDownMenu value={this.state.chapterId} onChange={this._handleChapterChange}>
                      {ChapterSelecter}
                    </DropDownMenu>
                  </ToolbarGroup>
                </Container>
              </Toolbar>
            <div style={styles.view} onTouchTap={this._toggleControll()}>
              <Container>
                {ViewerImage}
              </Container>
            </div>
            <div style={styles.chatElement}>
              <Container style={styles.chatContainer}>
                <ChatElement />
              </Container>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ComicViewer;
