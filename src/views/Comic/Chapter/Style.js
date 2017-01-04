/* inline style file */
const ChapterStyle = {
  root: {
    background: '#FF82AC',
    backgroundSize: 'cover',
    minHeight: 400,
    position: 'relative',
    overflow: 'auto'
  },

  img: {
    maxWidth: '100%',
    maxHeight: 300,
    width: 'auto',
    height: 'auto'
  },

  imgWrapper: {
    display: 'inline-block', 
    width: 'auto', 
    height: 'auto'
  },

  nameInfo: { 
    color: '#FFFFFF'
  },

  addChapter: {
    float: 'right',
    marginRight: 15
  },

  chapterButton: {
    display: 'block',
    width: '100%',
    textAlign: 'left'
  },

  mainPaper: {
    marginTop: 30,
    padding: 20,
    wordBreak: 'break-all'
  },

  secendSectionContainer: {
    minHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15
  },

  secendSectionButton: {
    
  },

  chapterSelectContainer: {
    minHeight: 0
  },

  secendSection: {
    background: '#ffc4dc',
    padding: '5px',
    minHeight: 10,
    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.05) , 0 2px 20px 0 rgba(0, 0, 0, 0.1) '
  },

  tagWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },

  tagTab: {
    padding: '10px 3px'
  },

  tag: {
    margin: 4
  },

  link: {
    color: 'white'
  }
};

const smallChapterPageStyle = {
  nameInfo: {
    width: '100%'
  }
};

export { ChapterStyle, smallChapterPageStyle};
