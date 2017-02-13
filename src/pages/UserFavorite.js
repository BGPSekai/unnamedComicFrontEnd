import React, {Component} from 'react';
import Container from 'components/Container';
import UserModule from 'module/UserModule';
import FetchModule  from 'module/FetchModule';
import apiUrl from 'res/apiUrl';
import ComicElement from 'views/Comic/ComicElement';

class UserFavorite extends Component {
  constructor(props) {
    super(props);

		this.state = {
      page: 1,
      //perPageNumber: Setting.loadItem,
      allPage: 0,
      //comicIds: [],
			comics: [],
			userId: UserModule.getUserInfo('userId')
		};

    /* 取得個人漫畫 */
    new FetchModule()
      .setUrl(apiUrl.user.getFavoriteComic)
      .replaceVariable({
        userId: this.state.userId
      })
      .setCors('cors')
      .setMethod('GET')
      .setType('json')
      .send()
      .then((data) => {
        //this.state.comicIds = data.favorites;
        //this.state.allPage = Math.ceil(data.favorites.length / this.state.perPageNumber);
        //this._getNextPageData();
        this.setState({comics: data.favorites});
      });
  }

  //原 loadmore 功能 ( 已遭 api 禁用 )
  _getNextPageData() {
    this._fetchAllComicData((this.state.page - 1) * this.state.perPageNumber , this.state.page * this.state.perPageNumber);
    this.state.page ++;
  }

  _fetchAllComicData(index = 0, end = 0) {
    let comicsData = this.state.comicIds.slice( index, end);
    /* 取得個人漫畫 */
    new FetchModule()
      .setUrl(apiUrl.comic.infos)
      .setCors('cors')
      .setMethod('POST')
      .setData({ comics: comicsData })
      .setType('json')
      .send()
      .then((data) => {
        let tempComic = Object.assign(this.state.comics, {});
        
        data.infos.forEach((info, i) => {
           tempComic[ Number(i) + index ] = info; //取代資訊
        });
        
        this.setState({
          comics: tempComic
        });
      });
  }

  render() {
    return (
    	<Container>
      	<ComicElement 
          comicData={this.state.comics} 
          linkUrl={apiUrl.front.comicInfo}
          />
          {
            /*linkUrl={apiUrl.front.comicInfo} 
            needLoadMore={this.state.page <= this.state.allPage}
            loadMore={this._getNextPageData.bind(this)}
            */
          }
      </Container>
    );
  }
}

export default UserFavorite;
