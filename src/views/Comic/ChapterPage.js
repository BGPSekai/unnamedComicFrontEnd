import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Paper from 'material-ui/Paper';
import FetchModule from '../../module/FetchModule';
import Container from '../../components/Container';
import ChapterPageStyle from './ChapterPageStyle';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
              <img 
                src={apiUrl.getReplaceUrl( apiUrl.comic.cover, { id: this.props.comicData.id})} 
                style={ChapterPageStyle.img}
              />
            </div>
            <div style={ChapterPageStyle.nameInfo}>
              <h3>{this.props.comicData.name}</h3>
              <p>{this.props.comicData.summary}</p>
            </div>
          </div>
          {
            this.props.backEnd &&
            <FloatingActionButton 
              secondary={true} 
              style={ChapterPageStyle.addChapter}
              onTouchTap={() => {
                browserHistory.push(apiUrl.getReplaceUrl(apiUrl.front.publishChapter,{comicId: this.props.comicData.id}))}
              }
            >
              <ContentAdd />
            </FloatingActionButton>
          }
          <Paper style={ChapterPageStyle.mainPaper}>
            {this.props.chapterData.map(( value, i) => {
              return (<div key={i}>{i+1} - {value.name}</div>);
            })}
          </Paper>
        </Container>
      </div>
    );
  }
}

export default ChapterPage;