import React, {Component} from 'react';
import Router, {browserHistory} from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Container from 'components/Container';
import FetchModule from 'module/FetchModule';
import UserModule from 'module/UserModule';
import apiUrl from 'res/apiUrl';
import styles from 'views/User/styles';

class ChangeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorText: []
    };

    this._sendResetPassword = this._sendResetPassword.bind(this);
  }

  _sendResetPassword() {
    let sendData = {
      password: this.refs.oldPassword.getValue(),
      new_password: this.refs.newPassword.getValue(),
      new_password_confirmation: this.refs.newPasswordCheck.getValue()
    };

    new FetchModule()
      .setUrl(apiUrl.user.resetPassword)
      .setMethod('POST')
      .setData(sendData)
      .setType('json')
      .auth()
      .send()
      .then((data) => {
        if (data.error) {
          this.setState({ errorText: [data.error] });
        } else if (data.status === 'error') {
          this.setState({ errorText: data.message });
        } else {
          this.setState({ errorText: [] });
          UserModule.setUserInfo({ password: sendData.new_password });
          browserHistory.push('/profile');
        };
      });
  }

  render() {
    return (
      <div>
        <div style={styles.avatarBackgroundCover}>
          {/* Banner 放置區 */}
        </div>
        <Paper style={styles.userProfile}>
          <Container>
            <h2>修改個人資料</h2>
            <Divider />
            <h4>修改密碼</h4>
            <div>
              <TextField ref="oldPassword"  hintText="舊密碼" floatingLabelText="輸入舊密碼以確認" type="password" />
            </div>
            <div>
              <TextField ref="newPassword"  hintText="密碼" floatingLabelText="密碼" type="password" />
            </div>
            <div>
              <TextField ref="newPasswordCheck"  hintText="密碼確認" floatingLabelText="密碼確認" type="password" />
            </div>
            <RaisedButton label="修改密碼" primary={true} onTouchTap={this._sendResetPassword}/>
            <div>{this.state.errorText.map((t, i) => { return <div key={i} style={{ color: 'red' }}>{t}</div>; }) }</div>
          </Container>
        </Paper>
      </div>
    );
  }
}

export default ChangeProfile;
