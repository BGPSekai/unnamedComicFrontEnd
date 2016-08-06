import React, { Component } from 'react';

export default class Container extends Component {
  render() {

    let styles = {
      width: '75%',
      maxWidth: '1080px',
      minHeight: '300px',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxSizing: 'border-box',
      padding: '20px'
    };

    for(let i in this.props.style) {
      styles[i] = this.props.style[i];
    }

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );

  }
}
