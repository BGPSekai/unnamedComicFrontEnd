import React, {Component} from 'react';
import { browserHistory } from 'react-router';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Chip from 'material-ui/Chip';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';
import { ChapterPageStyle, smallChapterPageStyle } from './ChapterPageStyle';

class TagElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tagElement: null,
      tagSelect: -1
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ tags: nextProps.tags });
  }

  _sendDeleteAction(name) {
    return new FetchModule()
      .setUrl(apiUrl.tag)
      .setCors('cors')
      .auth()
      .replaceVariable({ tagName: name, comicId: this.props.comicId })
      .setMethod('DELETE')
      .setType('json')
      .send();
  }

  _tagAction(action){
    let tagIndex = this.state.tagSelect;
    let tagName = this.state.tags[tagIndex];
    
    switch (action){
      case 'delete':
        /* todo 刪除tag */
        this._sendDeleteAction(tagName).then((data) => {
          if (data.status === 'success') {
            this.setState({ tags: data.tags, 'tagElement': null, 'tagSelect': -1 });
          } else {};
        });
        break;
      case 'search':
        /* todo 搜尋tag */
        browserHistory.push(apiUrl.getReplaceUrl(apiUrl.front.searchByTag, {
          name: tagName,
          page: ''
        }));
        break;
    }
  }

  render() {
    let tagElement = [];
    this.state.tags &&
      this.state.tags.map((val, i) => {
        tagElement.push(
          <div key={i} style={{display: 'inline-block'}}>
            <Chip
              backgroundColor={'#F06292'}
              labelStyle={{ color: '#FCE4EC' }}
              onClick={(e) => {this.setState({'tagElement': e.currentTarget,'tagSelect': i});}}
              style={ChapterPageStyle.tag}
              >
                {val}
              </Chip>
          </div>
        );
      })

    tagElement.push(
      <Popover
        key="onTop"
        open={this.state.tagElement!==null}
        anchorEl={this.state.tagElement}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={() => {this.setState({'tagElement': null, 'tagSelect': -1});}}
        >
          <Menu>
            <MenuItem primaryText="搜尋相關 Tag 漫畫" onTouchTap={this._tagAction.bind(this, 'search')} />
            <MenuItem primaryText="刪除" onTouchTap={this._tagAction.bind(this, 'delete')} />
          </Menu>
      </Popover>
    );

    return (
      <span>
        {tagElement}
      </span>
    );
  }
}

export default TagElement;
