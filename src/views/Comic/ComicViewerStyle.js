import { spring } from 'react-motion';
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
    position: 'relative',
    height: 56,
    top: 0,
    zIndex: 10
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
    padding: '0px 10px'
  }
};

export default styles;

let ComicViewerAni = {
  viewerBar: {
    top: spring(0)
  },

  viewerBarHide: {
    top: spring(-56)
  },

  chatElement: {
    bottom: spring(0)
  },

  chatElementHide: {
    bottom: spring(-40)
  },

  fullView: {
    top: 0, 
    height: '100%' 
  },

  view: {
    top: 56, 
    height: 'calc(100% - 96px)'
  }
};

export { ComicViewerAni };
