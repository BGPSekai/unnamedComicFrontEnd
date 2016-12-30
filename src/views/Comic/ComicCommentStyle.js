/* inline style file */
const ComicCommentStyle = {
  root: {
    
  },

  container: {
    minHeight: 50
  },

  commentTitle: {
    padding: '15px 17px',
    fontSize: '1.2rem',
    background: '#fff'
  },

  addCommentButton: {
    color: '#fff'
  },

  addCommentButtonBackground: 'rgb(155, 85, 121)',

  textfieldWarpper: {
    padding: '5px 20px'
  },

  commentTextField: {
    background: '#fafbfb',
    boxShadow: '0px 0px 15px .5px rgba(0,0,0,0.1) inset'
  },

  textfieldunderline: {
    borderColor: '#fafbfb'
  },

  wrapper: {
    padding: 20,
    background: 'rgb(254, 254, 254)'
  },

  userComment: {
    padding: '2px 5px',
    display: 'inline-block',
    width: 'calc(100% - 50px)'
  },

  editComment: {
    display: 'inline-block',
    position: 'absolute',
    bottom: 0,
    top: 0,
    height: 18,
    margin: 'auto',
    float: 'right',
    fontSize: 15,
    cursor: 'pointer'
  },

  commentArea: {
    width: 'calc(100% - 64px)',
    display: 'inline-block',
    position: 'relative'
  }
};

export default ComicCommentStyle;
