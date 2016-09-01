import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import Home from './views/Home';
import LoginRegister from './views/LoginRegister';
import Upload from './views/Upload';
import ComicUploadSelect from './views/Upload/ComicUploadSelect';
import ComicUpload from './views/Upload/ComicUpload';
import ChapterUploader from './views/Upload/ChapterUploader';
import ChapterUploadSelect from './views/Upload/ChapterUploadSelect';
import Comic from './views/Comic';
import ComicInfo from './views/Comic/ComicInfo';
import ComicViewer from './views/Comic/ComicViewer';
import Types from './views/Types';
import Profile from './views/User';
import UserProfile from './views/User/UserProfile';
import Logout from './views/User/Logout';
import Search from './views/Search';
import SearchByName from './views/Search/SearchByName';

injectTapEventPlugin();

render((
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
				<Route path="view" component={ComicViewer} />
			</Route>
			{/* tags */}
			<Route path="/types" component={Types} />
			{/* upload */}
			<Route path="/upload" component={Upload}>
				<IndexRoute component={ComicUploadSelect} />
				<Route path="comic" component={ComicUpload} />
				<Route path="comic/:comicId" component={ChapterUploadSelect} />
				<Route path="comic/:comicId/chapter" component={ChapterUploader} />
			</Route>
			{/* Search */}
			<Route path="/search" component={Search}>
				<IndexRoute />
				<Route path="name/:searchName" component={SearchByName} />
			</Route>
			<Route path="/profile" component={Profile}>
				<IndexRoute component={UserProfile} />
			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
