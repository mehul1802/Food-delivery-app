import * as dialogTypes from '../types/dialog';

export function showLogin () {
    return dispatch => {
        dispatch({ type: dialogTypes.SHOW_LOGIN });
    };
}

export function hideLogin () {
    return dispatch => {
        dispatch({ type: dialogTypes.HIDE_LOGIN });
    };
}

