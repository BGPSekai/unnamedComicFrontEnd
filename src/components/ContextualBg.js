import React, { Component } from 'react';

export default class Container extends Component {
  render() {
    
    let styles = {
      width: '95%',
      boxSizing: 'border-box',
      padding: '5px 20px',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    for(let i in this.props.style) {
      styles[i] = this.props.style[i];
    }

    if(this.props.warrning){
      styles.color = '#D50000';
    }

    return (
      <div style={styles}>
        {this.props.msg.map( (msg) => {
          return <p>{msg}</p>;
        })}
      </div>
    );

  }
}
