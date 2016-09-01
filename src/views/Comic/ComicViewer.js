import React, {Component} from 'react';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import styles from './ComicViewerStyle';

class ComicViewer extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Toolbar style={styles.viewerBar}>
          <ToolbarGroup firstChild={true}>
           
          </ToolbarGroup>
          <ToolbarGroup>
            <ToolbarTitle text="章節" />
            <ToolbarSeparator />
            
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.view}>
        </div>
      </div>
    );
  }
}

export default ComicViewer;
