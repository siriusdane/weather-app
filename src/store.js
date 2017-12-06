import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

function configureStore(initialState) {
    return createStore(reducer, applyMiddleware(thunk));
}

export default configureStore;
