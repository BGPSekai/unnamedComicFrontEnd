import React, { Component } from 'react';
import GridList from 'material-ui/lib/grid-list/grid-list';
import Container from '../../components/container';
import styles from './style';

export default class Home extends Component {
  render() {
   
    return (
      <div>
        <Container style={styles.mHeader}>
        	未命名的漫畫網站
        </Container>
        <div style={styles.mSecend}>
          <Container>
            最新更新
          </Container>
        </div>
        <Container>
        	  熱門標籤
        </Container>
      </div>
    );
  
  }

}
