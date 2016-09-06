import React, {Component} from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class Loading extends Component {
  render() {
    const styles = {
      container: {
        position: 'absolute',
        top: 64,
        height: 'calc(100% - 64px)',
        width: '100%',
        background: 'rgba( 0, 0, 0, 0.5)',
        zIndex: 20
      },

      refresh: {
        display: 'block',
        
      },
    };
    return (
      <div style={styles.container}>
        <RefreshIndicator
          percentage={110}
          size={70}
          left={175}
          top={0}
          color={"red"} // Overridden by percentage={100}
          status="loading"
          style={styles.refresh}
          />
      </div>
    );
  }
}

export default Loading;
