import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Conatainer from '../../../components/Container';
import { ChapterStyle } from './Style';

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this._DialogContent = [];

    this.getUploadPermissions = this.getUploadPermissions.bind(this);
    this.getReport = this.getReport.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  getUploadPermissions() {
    this._DialogContent = ['您確定要從原上傳者取得上傳權限嗎？'];
    this.setState({open: true});
  }

  getReport() {
    this._DialogContent = ['您確定要檢舉這部漫畫嗎？','惡意檢舉可能會導致您的帳號遭到停權!'];
    this.setState({open: true});
  }

  closeDialog() {
    this.setState({open: false})
  }

  render() {
    
    let actions = [
       <FlatButton
          label="取消"
          onTouchTap={this.closeDialog}
        />,
        <FlatButton
          label="確認"
          onTouchTap={this.closeDialog}
        />
    ];

    return (
      <div>
        <Dialog
          title="提醒"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.closeDialog}
        >
          {this._DialogContent}
        </Dialog>
        <Conatainer style={ChapterStyle.secendSectionContainer}>
          <FlatButton 
            label="取得上傳權限" 
            onTouchTap={this.getUploadPermissions} 
            backgroundColor={ChapterStyle.secendSectionButton.background} 
            />
          <FlatButton 
            label="檢舉" 
            onTouchTap={this.getReport}
            backgroundColor={ChapterStyle.secendSectionButton.background} 
            />              
        </Conatainer>
      </div>
    );
  }
}

export default Toolbar;
