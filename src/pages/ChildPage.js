import React, {Component} from 'react';
import Container from 'components/Container';

class ChildPage extends Component {
  render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}

export default ChildPage;
