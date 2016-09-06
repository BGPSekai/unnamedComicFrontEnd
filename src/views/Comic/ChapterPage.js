import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FetchModule from '../../module/FetchModule';
import Container from '../../components/Container';
import ChapterPageStyle from './ChapterPageStyle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';
import Href from '../../components/Href';
import apiUrl from '../../res/apiUrl';

class ChapterPage extends Component {
  constructor(params) {
    super(params);
    this.state = {
      name: '',
      summary: ''
    };

  }

  render() {
    return (
      <div style={ChapterPageStyle.root}>
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
              <p>作者: {this.props.comicData.author}</p>
              <p>{this.props.comicData.summary}</p>
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
