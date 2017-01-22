import React, { Component } from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from 'App';
import Home from 'pages/Home';
import Auth from 'pages/Auth';
import Comic from 'pages/Comic';
import ComicInfo from 'pages/ComicInfo';
import ComicViewer from 'pages/ComicViewer';
import LoginRegister from 'pages/LoginRegister';
import Logout from 'pages/Logout';
import ChildPage from 'pages/ChildPage';
import SearchBySomething from 'pages/SearchBySomething';
import ComicUploadSelect from 'pages/ComicUploadSelect';
import ComicUpload from 'pages/ComicUpload';
import ChapterUploader from 'pages/ChapterUploader';
import ChapterUploadSelect from 'pages/ChapterUploadSelect';
import ChapterEditer from 'pages/ChapterEditer';
import UserProfile from 'pages/UserProfile';
import UserInfo from 'pages/UserInfo';
import ChangeProfile from 'pages/ChangeProfile';
import UserFavorite from 'pages/UserFavorite';
import Types from 'pages/Types';
import UserSetting from 'pages/UserSetting';

class Routers extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={LoginRegister} />
        <Route path="/register" component={LoginRegister} />
        <Route path="/" component={App}>
          <IndexRoute component={Home} />
          {/* comic */}
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
          <Route path="/upload" component={Auth}>
            <IndexRoute component={ComicUploadSelect} />
            <Route path="comic" component={ComicUpload} />
            <Route path="comic/:comicId" component={ChapterUploadSelect} />
            <Route path="comic/:comicId/chapter" component={ChapterUploader} />
            <Route path="comic/:comicId/chapter/:chapterId" component={ChapterEditer} />
          </Route>
          {/* Search */}
          <Route path="/search" component={ChildPage} isSearching={true}>
            <IndexRoute />
            <Route path=":searchType" component={SearchBySomething} />
            <Route path=":searchType/:searchName" component={SearchBySomething} />
          </Route>
          {/* profile and  user */}
          <Route path="/profile" component={Auth}>
            <IndexRoute component={UserProfile} />
            <Route path="change" component={ChangeProfile} />
            <Route path="favorite" component={UserFavorite} />
          </Route>
          <Route path="/user/:userId" component={UserInfo} />
          {/*<Route path="/user/:userId/favorite" component={UserInfo} /> */}
          {/* setting */}
          <Route path="/setting" component={Auth} >
            <IndexRoute component={UserSetting} />
          </Route>
        </Route>
      </Router>
    );
  }
}

export default Routers;
