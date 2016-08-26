import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Container from '../../components/Container';
import UserModule from '../../module/UserModule';
import styles from './styles';

class UserProfile extends Component {
  render() {
    return (
      <div>
        <div style={styles.avatarBackgroundCover}>
          
        </div>
        <Paper style={styles.userProfile} zDepth={2}>
          <Container style={styles.container}>
            <Avatar size={100} style={styles.avatar}>
              {UserModule.getUserInfo('userName').substring( 0, 1)}
            </Avatar>
            <div style={styles.userData}>
              {UserModule.getUserInfo('userName')}
              <span style={styles.userEmail}>
                {UserModule.getUserInfo('email')}
              </span>
            </div>
          </Container>
        </Paper>
      </div>
    );
  }
}

export default UserProfile;
