import {
    UPDATE_TEXT
} from '../actions/foo.js';

const initialState = {
    text: 'Some initial text'
};

function storeHandler(state = initialState, action) {
    switch(action.type) {
        case UPDATE_TEXT:
            return { ...state, text: action.text };
        default:
            return { ...state };
    }
}

export default storeHandler;
