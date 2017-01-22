import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';
import Subheader from 'material-ui/Subheader';
import Container from 'components/Container';
import LocalStorage from 'module/LocalStorage';

class UserSetting extends Component {
	constructor(params) {
    super(params);
    this._setting = LocalStorage.getObject('userSetting');
    this.toggleSetting = this.toggleSetting.bind(this);
  }
  
  toggleSetting(type) {
    this._setting[type] = this._setting[type]?false:true;
    LocalStorage.replace('userSetting', this._setting);
  }

	render() {
		return (
			<Container>
        <Card>
           <CardHeader
            title="網站設定"
            subtitle="關於網站相關的設定，設定並不會與帳號同步"
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            <Checkbox label="瀏覽器通知功能(目前無效)" />
            <Subheader>閱讀</Subheader>
            <Toggle
              label="上下捲動閱讀模式"
              defaultToggled={this._setting.scrollReadMode?true:false}
              onToggle={this.toggleSetting.bind(this, 'scrollReadMode')}
            />
          </CardText>
        </Card>
      </Container>
		);
	}
}

export default UserSetting;
