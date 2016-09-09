import React, { Component } from 'react';
import { render } from 'react-dom';
import Router from './Router';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

render(<Router />, document.getElementById('root'));
