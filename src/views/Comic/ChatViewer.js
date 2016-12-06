import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';
import ComicCommentStyle from './ComicCommentStyle';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class ChatElement extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let value = this.props.commentData;
    return (
        <div>
          <IconButton tooltip={value.comment_by.name} style={{width: 40,height: 40,boxSizing: 'content-box'}}>
          {
            (value.comment_by.avatar == null) ? 
              <Avatar>{value.comment_by.name.substring(0, 1)}</Avatar> :
              <Avatar src={apiUrl.getReplaceUrl(apiUrl.user.avatar, {
                  userId: value.comment_by.id,
                  avatarType: value.comment_by.avatar
                })}
              />
          }
          </IconButton>
          <span style={ComicCommentStyle.userComment}> {value.comment}</span>
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

export default ChatViewer;
