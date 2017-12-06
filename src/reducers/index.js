import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import foo from './foo';

const rootReducer = combineReducers({
    foo,
    routing: routerReducer
});

export default rootReducer;
