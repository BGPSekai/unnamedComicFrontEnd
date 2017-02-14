import 'babel-polyfill';
//import ReactDOMServer from 'react-dom/server';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import comicApp from './reducers';
import Router from './Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

let store = createStore(
  comicApp,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
