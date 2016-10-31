/* inline style file */
const ChapterPageStyle = {
  root: {
    background: '#FF82AC',
    backgroundSize: 'cover',
    minHeight: 400,
    position: 'relative',
    overflow: 'auto'
  },

  infomation: {
    minHeight: 300
  },

  imageBlock: {
    width: '37%',
    minWidth: 150,
    height: 283,
    display: 'inline-block'
  },

  img: {
    maxWidth: '100%',
    maxHeight: '100%'
  },

  nameInfo: {
    display: 'inline-block',
    width: '60%',
    verticalAlign: 'top',
    color: '#FFFFFF',
    padding: '10px 5px'
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

export { ChapterPageStyle, smallChapterPageStyle};
