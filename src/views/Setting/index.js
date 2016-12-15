import React, {Component} from 'react';
import Container from '../../components/Container';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

class Setting extends Component {
  render() {
    return (
      <Container>
        <Card>
           <CardHeader
            title="網站設定"
            subtitle="關於網站相關的設定"
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardText expandable={false}>
            <Checkbox label="瀏覽器通知功能" />
          </CardText>
          <CardActions>
            <FlatButton label="修改" />
          </CardActions>
        </Card>
      </Container>
    );
  }
}

export default Setting;
