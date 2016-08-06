import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './App';
import Home from './views/Home';
import LoginRegister from './views/LoginRegister';

injectTapEventPlugin();

render((
	<Router history={browserHistory}>
		<Route path="/login" component={LoginRegister} />
		<Route path="/register" component={LoginRegister} />
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
		</Route>
	</Router>
), document.getElementById('root'));
