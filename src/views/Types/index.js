import React, {Component} from 'react';
import FloatButton from 'material-ui/FlatButton';
import Container from '../../components/Container';
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
      .setCros('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then( (data) => {
        this.setState(data);
      });
  }
  
  render() {
    let Types = this.state.types.map(( value, i) => {
      console.log(i);
      return (<FloatButton key={i} label={value.name} />);
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