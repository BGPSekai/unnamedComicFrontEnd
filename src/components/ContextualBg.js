import React, { Component } from 'react';

export default class ContextualBg extends Component {
  render() {
    
    let styles = {
      width: '95%',
      boxSizing: 'border-box',
      padding: '5px 20px',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    for (let i in this.props.style) {
      if (this.props.style.hasOwnProperty(i))
      styles[i] = this.props.style[i];
    }

    if (this.props.warrning) 
      styles.color = '#D50000';
    if (this.props.successful) 
      styles.color = '#4CAF50';
      
    return (
      <div style={styles}>
        {Array.isArray(this.props.msg)&&
          this.props.msg.map( ( msg, i) => {
            return <p key={i}>{msg}</p>;
          })
        }
        {
          typeof this.props.msg === 'string' &&
          <p>{this.props.msg}</p>
        }
      </div>
    );

  }
}
