import React, {Component} from 'react';
import Chapter from '../Comic/Chapter';
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
        <Chapter 
          comicData={this.state.comic} 
          chapterData={this.state.chapters}
          linkUrl={apiUrl.front.chapterEdit}
          backEnd
        />
      </div>
    );
  }
}

export default ChapterUploadSelect;
