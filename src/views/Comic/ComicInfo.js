import React, {Component} from 'react';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import Container from '../../components/Container';
import ChapterPage from './ChapterPage';

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
      .setUrl(apiUrl.getReplaceUrl( apiUrl.comic.info, { id: this.props.params.comicId}))
      .setCors('cors')
      .setType('json')
      .send()
      .then((data) => {
        this.setState(data);
      });
  }
  
  render() {
    return (
      <div>
        <ChapterPage 
          comicData={this.state.comic} 
          chapterData={this.state.chapters} 
        />
      </div>
    );
  }
}

export default ComicInfo;
