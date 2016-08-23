import React, {Component} from 'react';
import ChapterPage from '../Comic/ChapterPage';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class ChapterUploadSelect extends Component {
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
      .setCros('cors')
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
          backEnd
        />
      </div>
    );
  }
}

export default ChapterUploadSelect;