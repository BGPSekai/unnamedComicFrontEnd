import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import Home from './views/Home';
import LoginRegister from './views/LoginRegister';
import Upload from './views/Upload';
import ComicUpload from './views/Upload/ComicUpload';
import ChapterUploader from './views/Upload/ChapterUploader';
import ChapterUploadSelect from './views/Upload/ChapterUploadSelect';
import Profile from './views/Profile';
import Comic from './views/Comic';
import ComicInfo from './views/Comic/ComicInfo';

injectTapEventPlugin();

render((
	<Router history={browserHistory}>
		<Route path="/login" component={LoginRegister} />
		<Route path="/register" component={LoginRegister} />
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="comic" component={Comic}>
				<Route path="page/:page" component={Comic} />
			</Route>
			<Route path="/comic/:comicId" component={ComicInfo} />
			<Route path="/upload" component={Upload} />
			<Route path="/upload/comic" component={ComicUpload} />
			<Route path="/upload/comic/:comicId" component={ChapterUploadSelect} />
			<Route path="/upload/comic/:comicId/chapter" component={ChapterUploader} />
			<Route path="/profile" component={Profile}>

			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
