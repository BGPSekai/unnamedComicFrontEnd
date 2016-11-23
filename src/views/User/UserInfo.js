import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import Href from '../../components/Href';
import Container from '../../components/Container';
import ComicElement from '../Comic/ComicElement';
import UserModule from '../../module/UserModule';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import styles from './styles';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.params.userId,
      avatarType: '',
      errorText: '',
      userInfo: {},
      comics: []
    };
    /* 取得個人資訊 */
    new FetchModule()
      .setUrl(apiUrl.user.userInfo)
      .replaceVariable({
        userId: this.state.userId
      })
      .auth()
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState({
          userInfo: data.user,
          avatarType: data.user.avatar
        });
      }).catch(() => {
        this.setState({errorText: '找不到使用者'});
      });
    /* 取得個人漫畫 */
    new FetchModule()
      .setUrl(apiUrl.search.searchByPublisher)
      .replaceVariable({
        name: this.state.userId,
        page: 1
      })
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState({
          comics: data.comics
        });
      });
  }

  render() {
    let User = this.state.userInfo;
    return (
      <div>
        <div style={styles.avatarBackgroundCover}>
          {/* Banner 放置區 */}
        </div>
        <Paper style={styles.userProfile} zDepth={2}>
          <Container style={styles.container}>
            <Avatar 
              size={100} 
              style={styles.avatar}
              >
              {
                User.name &&
                (
                  (this.state.avatarType == null) ? 
                    User.name.substring( 0, 1) :
                    <img src={apiUrl.getReplaceUrl(apiUrl.user.avatar, {
                        userId: User.id,
                        avatarType: this.state.avatarType
                      })+'?time='+ Math.ceil(Date.now()/10000)} 
                      style={styles.avatarImage}
                    />
                )
              }
            </Avatar>
            <div style={styles.userData}>
              {User.name}
              <span style={styles.userEmail}>
                {User.email}
              </span>
            </div>
            <ComicElement comicData={this.state.comics} linkUrl={apiUrl.front.comicInfo} />
          </Container>
        </Paper>
        <Dialog
          title="警告"
          actions={[<FlatButton label="返回主頁" primary keyboardFocused={true} onTouchTap={() => browserHistory.push('/')} />]}
          modal={true}
          open={this.state.errorText !== ''}
          >
          {this.state.errorText}
        </Dialog>
      </div>
    );
  }
}

export default UserInfo;
