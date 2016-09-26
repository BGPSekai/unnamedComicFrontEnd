import React, {Component} from 'react';
import FloatButton from 'material-ui/FlatButton';
import Container from '../../components/Container';
import Href from '../../components/Href';
import ComicElement from '../Comic/ComicElement';
import FetchModule from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class Types extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      page: 1,
      types: [],
      comics: [],
      typeData: { name: this.props.params.typeName }
    };

    new FetchModule()
      .setUrl(apiUrl.type)
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState(data);
        this._getComicData(this._getTypeData(this.state.typeData.name));
      });
  }
  _getTypeData(name) {
    let type = {};
    for (let i in this.state.types) {
      if (!name && this.state.types[i].name === this.state.typeData.name) {
        type = this.state.types[i];
        break;
      } else if (this.state.types[i].name === name) {
        type = this.state.types[i];
        break;
      };
    };
    return type;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.typeName != this.state.typeData.name) {
      this.setState({ typeData: this._getTypeData(nextProps.params.typeName), page: 1 });
      this._getComicData(this._getTypeData(nextProps.params.typeName));
    }
  }

  _getComicData(type) {
    console.log(type);
    new FetchModule()
      .setUrl(apiUrl.search.searchByType)
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .replaceVariable({
        page: this.state.page,
        typeId: type.id
      })
      .send()
      .then((data) => {
        this.setState({
          loading: false,
          comics: data.comics
        });
      });
  }

  render() {
    let Types = this.state.types.map((value, i) => {
      let isTheSame = this.state.typeName === value.name;
      return (
        <Href href={apiUrl.getReplaceUrl(apiUrl.front.type, { typeName: value.name }) } key={i}>
          <FloatButton keyboardFocused={isTheSame} backgroundColor={isTheSame ? '#ecf0f1' : null} label={value.name} />
        </Href>
      );
    });

    return (
      <div>
        <Container>
          <h3>所有類型</h3>
          <div>{Types}</div>
          <ComicElement linkUrl={apiUrl.front.comicInfo} comicData={this.state.comics} />
        </Container>
      </div>
    );
  }
}

export default Types;
