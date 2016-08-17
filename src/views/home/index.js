import React, { Component } from 'react';
import Container from '../../components/Container';
import styles from './styles';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Container style={styles.mHeader}>
        	未命名的漫畫網站 meta Header
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
