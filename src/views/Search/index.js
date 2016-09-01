import React, {Component} from 'react';
import Container from '../../components/container';

class Search extends Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export default Search;
