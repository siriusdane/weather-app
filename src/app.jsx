import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import configureStore from './store';
import ErrorHandler from './handlers/ErrorHandler.jsx';
import ListHandler from './handlers/ListHandler.jsx';
import DetailHandler from './handlers/DetailHandler.jsx';
import './styles/index.scss';

const store = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <Switch>
                <Route exact path='/' component={ ListHandler } />
                <Route path='/details/:id' component={ DetailHandler } />
                <Route path='*' component={ ErrorHandler } />
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);
