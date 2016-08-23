import React, { Component } from 'react';
import { Sortable } from 'react-sortable';
import IconButton from 'material-ui/IconButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';

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
      listData: this.props.listData
    };
    
    this.updateState = this.updateState.bind(this);
  }

  updateState(obj) {
    if (this.props.onChange)
      this.props.onChange.call(this, obj);
    this.setState(obj);
  }

  _deleteListItem(id) {
    let data = Array.from(this.state.listData);
    data.splice( id, 1);
    this.updateState({listData: data});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.listData !== this.state.listData) {
      this.setState({ listData: nextProps.listData });
    }
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
    
    let listItems = this.state.listData.map(function(item, i) {
      return (
        <SortableGridItem
          key={i}
          updateState={this.updateState}
          items={this.state.listData}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="list"
          >
            <div>
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
                <span style={styles.title}>{i+1} - </span>
                <span style={styles.fileTitle}>{item.file.name}</span> 
              </span>
            </div>
          </SortableGridItem>
      );
    }, this);

    return (
          <div className="grid">
            {listItems}
          </div>
    );
  }
}

export default SortableGrid;
