import React, { Component } from 'react';
import Avatar from 'material-ui/lib/avatar';
import Container from '../../components/Container';
import styles from './styles';

export default class Profile extends Component {
  render() {
    return (
      <div style={styles.avatarBackgroundCover}>
        <Container>
          <Avatar 
            size={100}
            src="https://pixabay.com/static/uploads/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" 
          />
          個人頁面
        </Container>
      </div>
    );
  }
}
