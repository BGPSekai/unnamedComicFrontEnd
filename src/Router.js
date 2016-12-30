import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import Home from './views/Home';
import LoginRegister from './views/LoginRegister';
import Upload from './views/Upload';
import ComicUploadSelect from './views/Upload/ComicUploadSelect';
import ComicUpload from './views/Upload/ComicUpload';
import ChapterUploader from './views/Upload/ChapterUploader';
import ChapterUploadSelect from './views/Upload/ChapterUploadSelect';
import ChapterEditer from './views/Upload/ChapterEditer';
import Comic from './views/Comic';
import ComicInfo from './views/Comic/ComicInfo';
import ComicViewer from './views/Comic/ComicViewer';
import Types from './views/Types';
import Profile from './views/User';
import UserProfile from './views/User/UserProfile';
import UserInfo from './views/User/UserInfo';
import ChangeProfile from './views/User/ChangeProfile';
import UserFavorite from './views/User/UserFavorite';
import Logout from './views/User/Logout';
import Search from './views/Search';
import SearchBySomething from './views/Search/SearchBySomething';
import Setting from './views/Setting';

class Routers extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={LoginRegister} />
        <Route path="/register" component={LoginRegister} />
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          {/* Comic */}
          <Route path="comic" component={Comic}>
            <Route path="page/:page" component={Comic} />
          </Route>
          <Route path="/comic/:comicId" component={ComicInfo}>
            <IndexRoute />
            <Route path="chapter/:chapterId" component={ComicViewer} />
          </Route>
          {/* tags */}
          <Route path="/types" component={Types} />
          <Route path="/types/:typeName" component={Types} />
          {/* upload */}
          <Route path="/upload" component={Upload}>
            <IndexRoute component={ComicUploadSelect} />
            <Route path="comic" component={ComicUpload} />
            <Route path="comic/:comicId" component={ChapterUploadSelect} />
            <Route path="comic/:comicId/chapter" component={ChapterUploader} />
            <Route path="comic/:comicId/chapter/:chapterId" component={ChapterEditer} />
          </Route>
          {/* Search */}
          <Route path="/search" component={Search} isSearching={true}>
            <IndexRoute />
            <Route path=":searchType" component={SearchBySomething} />
            <Route path=":searchType/:searchName" component={SearchBySomething} />
          </Route>
          {/* profile */}
          <Route path="/profile" component={Profile}>
            <IndexRoute component={UserProfile} />
            <Route path="change" component={ChangeProfile} />
						<Route path="favorite" component={UserFavorite} />
          </Route>
          {/* user */}
          <Route path="/user/:userId" component={UserInfo} />
          {/*<Route path="/user/:userId/favorite" component={UserInfo} /> */}
          {/* setting */}
          <Route path="/setting" component={Setting} />
        </Route>
      </Router>
    );
  }
}

export default Routers;
