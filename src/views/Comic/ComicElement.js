import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import apiUrl from '../../res/apiUrl';
import styles from './styles';

class TileElement extends Component {
  render() {
    return (
       <GridTile
         key={this.props.comic.id}
         title={this.props.comic.name}
         subtitle={<span>上傳者 <b>{this.props.comic.author}</b></span>}
         actionIcon={<IconButton></IconButton>}
         style={styles.gridTile}
       >
         <img src={apiUrl.comic.cover.replace('{id}',this.props.comic.id)} />
       </GridTile>
    );
  }
}

class ComicElement extends Component {
  render() {
    return (
      <div>
        {
          this.props.comicData.map((comic) => {
            if (this.props.linkUrl)
              return (
                <Link 
                  to={this.props.linkUrl.replace('{comicId}', comic.id)}
                  key={comic.id}
                >
                  <TileElement key={comic.id} comic={comic} />
                </Link>
              );
            else 
              return(<TileElement key={comic.id} comic={comic} />);
          })
        }
      </div>
    );
  }
}

ComicElement.propTypes = {
  comicData: PropTypes.array.isRequired,
  linkUrl: PropTypes.string
}

ComicElement.defaultProps = {
    comicData: []
};

export default ComicElement;
