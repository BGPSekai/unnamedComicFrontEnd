import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Col } from 'react-bootstrap';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import Href from '../../components/Href';
import apiUrl from '../../res/apiUrl';
import styles from './styles';

class TileElement extends Component {
  
  componentWillReceiveProps(nextProps) {
    this.forceUpdate();
  }
  
  render() {
    return (
       <GridTile
         key={this.props.comic.id}
         title={this.props.comic.name}
         subtitle={<span>上傳者/作者 <b>{this.props.comic.published_by.name}/{this.props.comic.author}</b></span>}
         actionIcon={<IconButton></IconButton>}
         style={this.props.style.gridStyle}
       >
         <img src={apiUrl.comic.cover.replace('{id}',this.props.comic.id)}/>
       </GridTile>
    );
  }
}

class ComicElement extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      gridStyle: styles.gridTile
    };
    //var mq = window.matchMedia( '(max-width: 500px)' );
    //mq.addListener(this._widthChange.bind(this));
  }

  _widthChange(mq) {
    if (mq.matches){
      
    } else {
      
    };
  }

  componentDidMount() {
    //this._scrollEvent();  
  }

  _scrollEvent() {
    let scrollHeight = this.refs.tileElement.scrollHeight;
    let nowScroll = 0;
    ['mousewheel','touchmove'].map((eventType) => {
      this.refs.tileElement.addEventListener(eventType, (e) => {
        if (e.pageY)
          nowScroll = e.pageY + e.screenY;
        else if (e.touches[0]){
          nowScroll = e.touches[0].screenY;
        }
        
        if (nowScroll > scrollHeight) {
          //console.log('換頁囉');
        };
      });
    });
    
  }
  
  render() {
    return (
      <Grid ref="tileElement" style={styles.tileElement} fluid>
        {
          this.props.comicData.map((comic) => {
            if (this.props.linkUrl)
              return (
                <Col xs={6} sm={3} lg={2} key={comic.id} style={{position: 'relative', display:'inline-block'}}>
                  <Href 
                    href={this.props.linkUrl.replace('{comicId}', comic.id)}
                  >
                    <TileElement key={comic.id} comic={comic} style={{gridStyle: styles.gridTile}}/>
                  </Href>
                </Col>
              );
            else 
              return (<TileElement key={comic.id} comic={comic} style={{gridStyle: styles.gridTile}}/>);
          })
        }
        {
          this.props.needLoadMore &&
          <RaisedButton label="載入更多" fullWidth={true} onTouchTap={this.props.loadMore} />
        }
      </Grid>
    );
  }
}

ComicElement.propTypes = {
  comicData: PropTypes.array.isRequired,
  linkUrl: PropTypes.string,
  loadMore: PropTypes.func,
  needLoadMore: PropTypes.bool
}

ComicElement.defaultProps = {
    comicData: [],
    loadMore: () => {},
    needLoadMore: false
};

export default ComicElement;
