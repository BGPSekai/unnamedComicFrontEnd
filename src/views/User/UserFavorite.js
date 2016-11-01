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
        this._fetchAllComicData(data.favorites);
      });
  }

  _fetchAllComicData(comicsData = []) {
    console.log(comicsData);
    /* 取得個人漫畫 */
    new FetchModule()
      .setUrl(apiUrl.comic.infos)
      .setCors('cors')
      .setMethod('POST')
      .setData({ comics: comicsData })
      .setType('json')
      .send()
      .then((data) => {
        this.setState({
          comics: data.infos
        });
      });
  }

  render() {
    return (
    	<Container>
      	<ComicElement comicData={this.state.comics} linkUrl={apiUrl.front.comicInfo} />
      </Container>
    );
  }
}

export default UserFavorite;
