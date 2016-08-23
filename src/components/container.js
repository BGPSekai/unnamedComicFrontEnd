import React, { Component } from 'react';

export default class Content extends Component {
  render() {
    
    let styles = {
      width: '95%',
      maxWidth: '1080px',
      minHeight: '300px',
      marginLeft: 'auto',
      marginRight: 'auto',
      boxSizing: 'border-box',
      padding: '20px',
      position: 'relative'
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
