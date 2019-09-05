import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const { fork } = require('child_process');

// fork(`${__dirname}/server.js`)
// The `__dirname` variable is required if you want to deploy on a binary build otherwise the script won’t be reached properly.
// https://fabiofranchino.com/blog/use-electron-as-local-webserver/
fork(`./server/server.js`);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
