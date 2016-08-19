import React, { Component } from 'react';
import { Sortable } from 'react-sortable';

class GridItem extends Component {
  render() {
    const styles = {
      position: 'relative',
      margin: '5px 5px 0 0',
      width: 245,
      color: '#fff',
      float: 'left'
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
      data: this.props.data
    };
    
    this.updateState = this.updateState.bind(this);
  }

  updateState(obj) {
    this.setState(obj);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data });
    }
  }

  render() {
    const styles = {
      image: {
        width: '100%',
        verticalAlign: 'middle'
      },

      name: {
        position: 'absolute',
        background: 'rgba( 0, 0, 0, 0.5)',
        padding: '10px 5px',
        boxSizing: 'border-box',
        color: '#FAFAFA',
        bottom: 0,
        width: '100%',
        display: 'block'
      }
    };

    let listItems = this.props.data.map(function(item, i) {
      return (
        <SortableGridItem
          key={i}
          updateState={this.updateState}
          items={this.state.data}
          draggingIndex={this.state.draggingIndex}
          sortId={i}
          outline="grid"
          >
            <div>
              <span style={styles.image}>
                <img style={{
                    width: '100%'
                  }} 
                  src={item} 
                />
              </span>
              <span style={styles.name}>
                asdasd
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
