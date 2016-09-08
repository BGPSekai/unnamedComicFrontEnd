import React, {Component} from 'react';

class Image extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: '',
      src: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    
  }

  render() {
    
    return (
      <div >
        <img {...this.props} />
      </div>
    );
  }
}

export default Image;
