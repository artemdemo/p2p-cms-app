import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom';
import * as log from 'loglevel';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import history from './history';
import ClientsView from './views/ClientsView';

log.enableAll();

ReactDOM.render(
    (
        <Router history={history}>
            <App>
                <Route exact path='/' component={ClientsView} />
                <Route exact path='/clients' component={ClientsView} />
                <Route exact path='/clients/:clientId' component={ClientsView} />
            </App>
        </Router>
    ),
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
