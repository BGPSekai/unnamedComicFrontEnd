/* inline style file */
const styles = {
  container: {
    minHeight: 50
  },

  avatarBackgroundCover: {
    minHeight: '200px',
    backgroundColor: '#3AA2BD'
  },

  userProfile: {
    minheight: 120,
    position: 'relative'
  },

  userData: {
    width: 'calc(95% - 110px)',
    display: 'inline-block',
    
    verticalAlign: 'top',
    padding: 5,
    color: '#77787b',
    fontSize: '1.5rem'
  },

  avatar: {
    margin: 0,
    top: -70,
    border: '5px solid #ffffff',
    position: 'relative',
    overflow: 'hidden'
  },

  userEmail: {
    fontSize: '0.8rem',
    padding: '0 10px'
  },

  chgInfoButton: {
    fontSize: '0.5rem',
    color: '#3498db'
  },

  changeAvatar: {
    position: 'absolute',
    left: 0,
    top: 0,
    lineHeight: '100px',
    color: '#16a085',
    borderRadius: '100%',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    cursor: 'pointer'
  },

  avatarImage: {
    width: '100%',
    height: '100%'
  },

  comeFromChip: {
    display: 'inline-block', 
    margin: '0px 5px',
    backgroundColor: '#2f78ed'
  },

  comeFromChipLabel: {
    fontSize: 10, 
    color: '#fff',
    padding: '0px 10px'
  }
};

export default styles;
