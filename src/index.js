import 'babel-polyfill';
//import ReactDOMServer from 'react-dom/server';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render(
  <Router />,
  document.getElementById('root')
);
