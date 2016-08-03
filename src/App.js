import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import MenuIcon from 'material-ui/lib/svg-icons/navigation/menu';

export default React.createClass({
  render() {
    console.log(process);
    let styles = {
      root: {
        background: "#D81B60",
        padding: "10px 5px"
      },
      title: {
        color: "#424242",
        fontSize: "1.2rem",
        lineHeight: "60px"
      },
      iconLeft: {
        color: "#424242"
      },
      appBar: {
        maxWidth: "1080px",
        margin: "auto",
        background: "#fff",
        padding: "0px 20px",
        minHeight: "auto"
      }
    };

    return (
      <div style={styles.root}>
        <AppBar
          title={"未命名的漫畫前端"}
          iconElementLeft={<IconButton><MenuIcon color={styles.iconLeft.color}/></IconButton>}
          style={styles.appBar}
          titleStyle={styles.title}
        />
        {this.props.children}
      </div>
    )
  }

});
