import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import Container from '../../components/Container';
import ChapterPage from './ChapterPage';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Loading from '../../components/Loading';
import ComicComment from './ComicComment';

class ComicInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comic: {},
      chapters: []
    };

  }

  componentWillMount() {
    new FetchModule()
      .setUrl(apiUrl.getReplaceUrl(apiUrl.comic.info, { id: this.props.params.comicId }))
      .setCors('cors')
      .setType('json')
      .send()
      .then((data) => {
        this.setState(data);
      });
  }

  _handleClose() {
    browserHistory.goBack();
  }

  render() {
    if (this.state.status === 'error') {
      return (
        <Dialog
          title="錯誤"
          modal={true}
          open={true}
          actions={
            <FlatButton
              label="上一頁"
              primary={true}
              onTouchTap={this._handleClose}
              />
          }
          >
          {this.state.message}
        </Dialog>
      );
    };

    return (
      <div style={{background: '#FF82AC'}}>
        {
          this.props.children && React.cloneElement(this.props.children, {
            comicInfo: this.state
          })
        }
        <ChapterPage
          comicData={this.state.comic}
          chapterData={this.state.chapters}
          linkUrl={apiUrl.front.viewComic}
          />
        <ComicComment comicData={this.state.comic} />
      </div>
    );
  }
}

export default ComicInfo;
