/* inline style file */
const styles = {
  root: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 1000,
    background: 'rgba( 0, 0, 0, 0.6)'
  },

  viewerBar: {
    height: 56
  },

  view: {
    position: 'absolute',
    width: '100%',
    left: 0,
    top: 56,
    height: 'calc(100% - 96px)',
    overflow: 'auto'
  },

  arrowBackIcon: {
    padding: 15
  },

  image: {
    width: '100%',
    display: 'block',
    background: '#fff',
    margin: '10px auto',
    boxShadow: '0 0 40px 0.5px #000'
  },

  chatElement: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'rgba(0, 0, 0, 0.1)'
  },

  chatContainer: {
    minHeight: 15,
    padding: 0
  },

  chatBar: {
    background: 'none',
    minHeight: 15,
    height: 'auto'
  },

  chatInput: {
    color: '#fff',
    
  }
};

export default styles;
