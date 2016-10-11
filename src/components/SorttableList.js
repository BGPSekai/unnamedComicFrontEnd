import React, { Component } from 'react';
import { Sortable } from 'react-sortable';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

class GridItem extends Component {
  render() {
    const styles = {
      position: 'relative',
      color: '#fff',
      height: '100%'
    };

    return (
      <div {...this.props} className="grid-item" style={styles}>{this.props.children}</div>
    );
  }
}

let SortableGridItem = new Sortable(GridItem);

class SortableGrid extends Component {
  constructor(params) {
    super(params);
    this.state = {
      draggingIndex: null,
      changeDialogShow: false,
      defaultOrder: -1,
      listData: this.props.listData
    };
    
    this.updateState = this.updateState.bind(this);
    this._changeList = this._changeList.bind(this);
    this._changeOrder = this._changeOrder.bind(this);
    this._closeOrderDialog = this._closeOrderDialog.bind(this);
}

  updateState(obj) {
    if (this.props.onChange)
      this.props.onChange.call(this, obj);
    this.setState(obj);
  }
  
  _changeList(obj) {
    if (obj.item)
      this.updateState({listData: obj.item});
    else 
      this.setState({draggingIndex: obj.draggingIndex});
  }

  _deleteListItem(id) {
    let data = Array.from(this.state.listData);
    if (this.props.editMode && data[id].defaultIndex) {
      data[id].file = {};
      data[id].image = '';
      data[id].isDelete = true;
    } else {
      data.splice( id, 1);
    };
    this.updateState({listData: data});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listData !== this.state.listData) {
      this.setState({ listData: nextProps.listData });
    }
  }

   _changeOrder(newIndex = -1, oldIndex = 0) {
    if (newIndex === -1) {
      this.setState({changeDialogShow: true, defaultOrder: oldIndex});
    };
  }

  _closeOrderDialog() {
    this.setState({changeDialogShow: false});
  }

  render() {
    const styles = {
      image: {
        width: '100%'
      },

      name: {
        position: 'absolute',
        background: 'rgba( 0, 0, 0, 0.5)',
        padding: '10px 20px',
        boxSizing: 'border-box',
        color: '#FAFAFA',
        bottom: 0,
        width: '100%',
        display: 'block'
      },

      closeButton: {
        position: 'absolute',
        zIndex: 10,
        right: 0,
        top: 2
      },

      fileTitle: {
        display: 'inline-block',
        width: 120,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        verticalAlign: 'middle'
      },

      title: {
        verticalAlign: 'middle'
      }
    };
    let re_index = 0;
    let listItems = this.state.listData.map(function(item, i) {
      if (item.image){
        re_index++;
        return (
          <SortableGridItem
            key={i}
            updateState={this._changeList}
            items={this.state.listData}
            draggingIndex={this.state.draggingIndex}
            sortId={i}
            outline="list"
            >
              <div onContextMenu={(e) => {e.preventDefault();this._changeOrder.call(this, -1, i)}}>
                <div style={styles.closeButton}>
                  <IconButton tooltip="移除" onTouchTap={this._deleteListItem.bind( this, i)}>
                    <ActionDelete 
                      color={'#2196F3'} 
                      hoverColor={'#F50057'}
                    />
                  </IconButton>
                </div>
                <span style={styles.image}>
                  <img style={{
                      position: 'absolute',
                      width: '100%',
                      top: 0,
                      bottom: 0,
                      margin: 'auto'
                    }} 
                    src={item.image} 
                  />
                </span>
                <span style={styles.name}>
                  <span style={styles.title}>{re_index} - </span>
                  <span style={styles.fileTitle}>{item.file.name}</span> 
                </span>
              </div>
            </SortableGridItem>
        );
      };
    }, this);

    return (
      <div>
        <Dialog 
          title="調整順序"
          actions={[
            <FlatButton
              label="取消"
              primary={true}
              onTouchTap={this._closeOrderDialog}
            />,
            <FlatButton
              label="修改"
              primary={true}
              onTouchTap={this._closeOrderDialog}
            />
          ]}
          modal={true}
          open={this.state.changeDialogShow}
        >
          <TextField
            hintText="輸入順序"
            floatingLabelText="圖片順序"
            ref="orderNumber"
            type="number"
            min="1"
            defaultValue={this.state.defaultOrder+1}
            fullWidth
          />
        </Dialog>
        <div className="grid">
          {listItems}
        </div>
      </div>
    );
  }
}

export default SortableGrid;
