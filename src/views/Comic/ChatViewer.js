import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import Href from '../../components/Href';
import TextInput from '../../components/TextInput';
import ComicCommentStyle from './ComicCommentStyle';
import FetchModule from '../../module/FetchModule';
import UserModule from '../../module/UserModule';
import apiUrl from '../../res/apiUrl';

class ChatElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0
    };

    this.editMode = this.editMode.bind(this);
    this.commentData = Object.assign({}, props.commentData);
  }

  editMode() {
    if (this.state.mode) {
      this.changeComment().then((data) => {
        this.commentData = data.comment;
        this.setState({mode: 0});
      });
    } else {
      this.setState({mode: 1});
    };
  }

  changeComment() {
    let value = this.commentData;
    return new FetchModule()
      .setUrl(apiUrl.comment.update)
      .setMethod('POST')
      .auth()
      .setType('json')
      .setData({
        id: value.id,
        comment: this.refs['commentText'].getValue()
      })
      .send();
  }

  render() {
    let value = this.commentData;
    return (
        <div>
          <Href href={apiUrl.getReplaceUrl(apiUrl.front.getUserInfo, {userId: value.commented_by.id})}>
          <IconButton tooltip={value.commented_by.name} style={{width: 40,height: 40,boxSizing: 'content-box'}}>
          {
            (value.commented_by.avatar == null) ? 
              <Avatar>{value.commented_by.name.substring(0, 1)}</Avatar> :
              <Avatar src={apiUrl.getReplaceUrl(apiUrl.user.avatar, {
                  userId: value.commented_by.id,
                  avatarType: value.commented_by.avatar
                })}
              />
          }
          </IconButton>
          </Href>
          <div style={ComicCommentStyle.commentArea}>
            {
              this.state.mode == 0 &&
              <div>
                <span style={ComicCommentStyle.userComment}> {value.comment}</span>
                {
                  UserModule.getUserInfo('userId') == value.commented_by.id &&
                  <span style={ComicCommentStyle.editComment} onTouchTap={this.editMode}>
                  修改
                  </span>
                }
              </div>
            }
            {
              this.state.mode == 1 &&
              <div>
                <span style={ComicCommentStyle.userComment}> 
                   <TextInput
                      ref="commentText"
                      hintText="修改評論"
                      default={value.comment}
                      fullWidth
                      autoFocus
                    />
                </span>
                <span style={ComicCommentStyle.editComment} onTouchTap={this.editMode}>
                修改
                </span>
              </div>
            }
          </div>
        </div>
      );
  }
}

class ChatViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      id: 0,
      page: 0,
      comments: []
    };
    
    this.forceOpen = this.forceOpen.bind(this);
    this.close = this.close.bind(this);
  }
  
  _actionButton = [
    <FlatButton label="關閉" onTouchTap={this.close.bind(this)} />
  ];

  forceOpen() {
    this.setState({open: true});
  }

  close() {
     this.setState({open: false});
  }

  componentWillUpdate(nextProps, nextState) {
    if (!this.state.id||this.state.id != nextProps.chapterInfo.id) {
      this.state.id = nextProps.chapterInfo.id;
      this.loadCommentData();
    } 
  }

  loadCommentData(page = 0) {
    (page)? this.setState({page: page}):0;
    new FetchModule()
      .setUrl(apiUrl.comic.listChapterComments)
      .replaceVariable({id: this.state.id, page: this.state.page})
      .setType('json')
      .setMethod('GET')
      .send()
      .then((data) => {
        if (data.status == 'success')
          this.setState({comments: page?this.state.comments.concat(data.comments):data.comments});
      })
  }

  _renderComment() {
    return this.state.comments.map((data, index) => {
      return (<ChatElement key={index} commentData={data} />);
    });
  }
  
  render() {
    return (
      <Dialog
        title="所有評論"
        modal={false}
        actions={this._actionButton}
        open={this.state.open}
        onRequestClose={() => this.setState({open: false})}
        autoScrollBodyContent={true}
      >
        {this._renderComment()}
      </Dialog>
    );
  }
}

export {ChatViewer as default, ChatElement};
