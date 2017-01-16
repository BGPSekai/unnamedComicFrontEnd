import React, {Component, PropTypes} from 'react';
import { browserHistory } from 'react-router';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Container from '../../components/Container';
import ComicCommentStyle from './ComicCommentStyle';
import TextInput from '../../components/TextInput';
import {ChatElement} from './ChatViewer';
import FetchModule from '../../module/FetchModule';
import UserModule from '../../module/UserModule';
import apiUrl from '../../res/apiUrl';

class ComicComment extends Component {
  constructor(props) {
    super(props);
    this.ele = {};
    this.state = {
      comment: [],
      pages: 1,
      error: []
    };

    this._submitComment = this._submitComment.bind(this);
  }

  _gotoUserPage(id) {
    browserHistory.push(apiUrl.getReplaceUrl(apiUrl.front.getUserInfo, {userId: id}));
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    this._updateComment();
  }

  _updateComment() {
    new FetchModule()
      .setUrl(apiUrl.comic.listComicComments)
      .replaceVariable({
        id: this.props.comicData.id,
        page: 1
      })
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState({
          comment: data.comments,
          pages: data.pages
        });
      });
  }
  

  _submitComment() {
    let t = this;
    new FetchModule()
      .setUrl(apiUrl.comic.comment)
      .setMethod('POST')
      .setType('json')
      .auth()
      .setData({
        comic_id: this.props.comicData.id,
        comment: this.ele.comment.getValue()
      })
      .send()
      .then((data) => {
        if (data.status === 'success') {
           t._updateComment();
           t.ele.comment.clear();
        }
        else this.setState({error: data.message});
      });
  }

  _renderComments() {
    return this.state.comment.map((value, index) => {
      return (
        <ChatElement commentData={value} key={value.id} />
      );
    });
  }
  
  render() {
    return (
      <Container style={ComicCommentStyle.container}>
        <Paper>
          <Toolbar style={ComicCommentStyle.commentTitle}>
            <ToolbarGroup>
              <ToolbarTitle 
                text={`評論 ( ${((this.state.pages?this.state.pages:1)-1)*10}+ ) `} 
                />
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <RaisedButton 
                label="留言" 
                backgroundColor={ComicCommentStyle.addCommentButtonBackground}
                labelStyle={ComicCommentStyle.addCommentButton}
                onTouchTap={this._submitComment}
                />
            </ToolbarGroup>
          </Toolbar>
          <div style={ComicCommentStyle.commentTextField}>
            <div style={ComicCommentStyle.textfieldWarpper}>
              <TextInput 
                hintText="來吐槽吧"
                underlineStyle={ComicCommentStyle.textfieldunderline}
                underlineFocusStyle={ComicCommentStyle.textfieldunderline}
                fullWidth  
                multiLine={true}
                rows={1}
                rowsMax={4}
                ref={(ele) => this.ele.comment = ele }
                />
            </div>
          </div>
          <div style={ComicCommentStyle.wrapper}>
            {this._renderComments()}
          </div>
        </Paper>
      </Container>
    );
  }
}

ComicComment.propTypes = {
  comicData: PropTypes.object
};

export default ComicComment;
