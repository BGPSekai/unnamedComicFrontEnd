import React from 'react';
import AppBar from 'material-ui/lib/app-bar';

export default React.createClass({
  render() {
    
    let styles = {
      AppBar: {
        'max-width': '1080px',
        'margin': 'auto',
        'background': '#D81B60'
      }
    };
    console.log(process);
    return (
      <div>
        <AppBar
          title={process.env.WEBSITE_TITLE}
          iconElementLeft={<div />}
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={styles.AppBar}
        />
        {this.props.children}
      </div>
    )
  }
});
