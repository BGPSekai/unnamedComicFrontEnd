import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import FetchModule from '../../module/FetchModule';
import Container from '../../components/Container';
import ChapterPageStyle from './ChapterPageStyle';
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
          <Paper style={ChapterPageStyle.mainPaper}>
            {this.props.chapterData.map(( value, i) => {
              return (<div>{i} - {value}</div>);
            })}
          </Paper>
        </Container>
      </div>
    );
  }
}

export default ChapterPage;