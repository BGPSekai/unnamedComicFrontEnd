import React, {Component} from 'react';
import FloatButton from 'material-ui/FlatButton';
import Container from '../../components/Container';
import Href from '../../components/Href';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: []
    };

    new FetchModule()
      .setUrl(apiUrl.type)
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState(data);
      });
  }

  render() {
    let Types = this.state.types.map((value, i) => {
      return (
        <Href href={apiUrl.getReplaceUrl(apiUrl.front.type, { typeName: value.name }) } key={i}>
          <FloatButton label={value.name} />
        </Href>
      );
    });

    return (
      <div>
        <Container>
          <h3>所有類型</h3>
          {Types}
        </Container>
      </div>
    );
  }
}

export default Types;