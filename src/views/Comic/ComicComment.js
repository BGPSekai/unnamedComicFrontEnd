import React, {Component} from 'react';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Container from '../../components/Container';
import ComicCommentStyle from './ComicCommentStyle';

class ComicComment extends Component {
  render() {
    return (
      <Container style={ComicCommentStyle.container}>
        <Paper>
          <Toolbar style={ComicCommentStyle.commentTitle}>
            <ToolbarGroup>
              <ToolbarTitle text="評論 ( 爆 ) " />
            </ToolbarGroup>
            <ToolbarGroup>
              <ToolbarSeparator />
              <RaisedButton 
                label="留言" 
                backgroundColor={ComicCommentStyle.addCommentButtonBackground}
                labelStyle={ComicCommentStyle.addCommentButton}
                />
            </ToolbarGroup>
          </Toolbar>
          <div style={ComicCommentStyle.commentTextField}>
            <div style={ComicCommentStyle.textfieldWarpper}>
              <TextField 
                hintText="來吐槽吧"
                underlineStyle={ComicCommentStyle.textfieldunderline}
                underlineFocusStyle={ComicCommentStyle.textfieldunderline}
                fullWidth  
                multiLine={true}
                rows={1}
                rowsMax={4}
                autoFocus 
                />
            </div>
          </div>
          <div style={ComicCommentStyle.wrapper}>
            <div>
              <Avatar>
                我
              </Avatar>
              <span style={ComicCommentStyle.userComment}>asdasd</span>
            </div>
          </div>
        </Paper>
      </Container>
    );
  }
}

export default ComicComment;
