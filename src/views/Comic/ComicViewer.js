import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Container from '../../components/Container';
import styles from './ComicViewerStyle';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class ComicViewer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chapterId: this.props.params.chapterId
    };

    this._handleChapterChange = this._handleChapterChange.bind(this);
  }

  _handleChapterChange(event, index, value) {
    if (value !== this.state.chapterId)
      this.setState({ chapterId: value });
  }

  render() {
    let ViewerImage = [];
    let ChapterSelecter = [];

    if (this.props.comicInfo.chapters) {
      let chapterInfo = this.props.comicInfo.chapters[this.state.chapterId - 1];
      if (chapterInfo)
        for (let i = 1; i <= chapterInfo.pages; i++) {
          ViewerImage.push(
            <img
              src={`${apiUrl.getReplaceUrl(apiUrl.comic.view, { page: i, token: chapterInfo.token })}`}
              style={styles.image}
              key={i}
              />
          );
        };

      this.props.comicInfo.chapters.map((val, i) => {
        ChapterSelecter.push(<MenuItem value={i + 1} primaryText={`第 ${i + 1} 章 - ${val.name}`} />);
      });
    }

    return (
      <div style={styles.root}>
        {
          this.props.comicInfo &&
          <div>
            <Toolbar style={styles.viewerBar}>
              <ToolbarGroup firstChild={true}>
                <DropDownMenu value={1} onChange={this._handleChapterChange}>
                  {ChapterSelecter}
                </DropDownMenu>
              </ToolbarGroup>
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
