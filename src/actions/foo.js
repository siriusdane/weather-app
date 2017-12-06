export const UPDATE_TEXT = 'FOO_UPDATE_TEXT';

export function fooUpdateText(text) {
    return dispatch => {
        dispatch(updateText(text));
    };
}

function updateText(text) {
    return { type: UPDATE_TEXT, text };
}
