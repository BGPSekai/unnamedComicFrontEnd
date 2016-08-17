import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import Home from './views/Home';
import LoginRegister from './views/LoginRegister';
import Upload from './views/Upload';
import ComicUpload from './views/Upload/ComicUpload';
import Profile from './views/Profile';
import Comic from './views/Comic';

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
			<Route path="upload" component={Upload}>
				<Route path="comic/:comidId" />
				<Route path="comic/:comidId/chapter/:chapterId" />
			</Route>
			<Route path="upload/comic" component={ComicUpload} />
			<Route path="profile" component={Profile}>

			</Route>
		</Route>
	</Router>
), document.getElementById('root'));
