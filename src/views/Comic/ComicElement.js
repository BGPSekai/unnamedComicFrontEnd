import React, { Component } from 'react';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import apiUrl from '../../res/apiUrl';
import styles from './styles';

export default class Comic extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.comicData.map(comic => (
        <GridTile
          key={comic.id}
          title={comic.name}
          subtitle={<span>上傳者 <b>{comic.author}</b></span>}
          actionIcon={<IconButton></IconButton>}
          style={styles.gridTile}
        >
          <img src={apiUrl.comic.cover.replace('{id}',comic.id)} />
        </GridTile>
      ))}
      </div>
    );
  }
}
