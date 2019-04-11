import * as userTypes from '../types/user';

export function getUser(user) {
    return dispatch => {
        dispatch({ type: userTypes.GET_USER, payload: user });
    };
}