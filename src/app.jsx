import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './store';
import AppHandler from './handlers/AppHandler.jsx';

const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <Route path='/' component={ AppHandler } />
        </Router>
    </Provider>,
    document.getElementById('root')
);
