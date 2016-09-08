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
import Container from '../../components/Container';
import Image from '../../components/Image';
import styles from './ComicViewerStyle';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class ComicViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterId: parseInt(this.props.params.chapterId)
    };
    
    this._handleChapterChange = this._handleChapterChange.bind(this);
    this._handleToChapterPage = this._handleToChapterPage.bind(this);
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
            <div style={styles.view}>
              <Container>
                {ViewerImage}
              </Container>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ComicViewer;
