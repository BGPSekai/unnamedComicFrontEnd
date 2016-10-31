import React, {Component} from 'react';
import Container from '../../components/Container';
import ComicElement from '../Comic/ComicElement';
import UserModule from '../../module/UserModule';
import FetchModule  from '../../module/FetchModule';
import apiUrl from '../../res/apiUrl';

class UserFavorite extends Component {
  constructor(props) {
    super(props);

		this.state = {
			comics: [],
			userId: UserModule.getUserInfo('userId')
		};

    /* 取得個人漫畫 */
    new FetchModule()
      .setUrl(apiUrl.user.getFavoriteComic)
      .replaceVariable({
        userId: this.state.userId,
        page: 1
      })
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        this.setState({
          comics: data.comics
        });
      });
  }

  render() {
    return (
    	<Container>
      	<ComicElement comicData={this.state.comics}/>
      </Container>
    );
  }
}

export default UserFavorite;
