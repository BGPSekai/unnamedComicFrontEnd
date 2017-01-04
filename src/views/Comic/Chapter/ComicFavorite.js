import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import UserModule from '../../../module/UserModule';
import FetchModule from '../../../module/FetchModule';
import apiUrl from '../../../res/apiUrl';

class ComicFavorite extends Component {
    constructor(props){
        super(props);
        this.state = {
            favorite: false
        };
        this._toggleFavorite = this._toggleFavorite.bind(this);
        this._getFavoriteData();
    }

    _toggleFavorite(){
      let toggleFavorite = !this.state.favorite;
      
      new FetchModule()
        .setUrl(apiUrl.comic.favorite)
        .auth()
        .replaceVariable({ comicId: this.props.comicId})
        .setCors('cors')
        .setMethod(toggleFavorite?'POST':'DELETE')
        .setType('json')
        .send()
        .then((data) => {
          this.setState({
            favorite: toggleFavorite
          });
        });
    }

    _getFavoriteData(){
      new FetchModule()
        .setUrl(apiUrl.user.getFavoriteComic)
        .replaceVariable({ userId: UserModule.getUserInfo('userId')})
        .setCors('cors')
        .setMethod('GET')
        .setType('json')
        .send()
        .then((data) => {
          this.setState({
            favorite: (data.favorites.indexOf(this.props.comicId) != -1)? true: false
          });
        });
    }

    render() {
        return (
            <div style={this.props.style}>
                <FloatingActionButton 
                  backgroundColor={this.state.favorite?'#FF1744':'#CFD8DC'}
                  onTouchTap={this._toggleFavorite}>
                    <FavoriteIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

export default ComicFavorite;
