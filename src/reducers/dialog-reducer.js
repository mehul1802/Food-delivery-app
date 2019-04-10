import * as dialogTypes from '../types/dialog'

const initialState = { showSignIn: false };

export function dialog(state = initialState, action) {
    switch (action.type) {
        case dialogTypes.SHOW_LOGIN:
            return { ...state, showSignIn: true };
        case dialogTypes.HIDE_LOGIN:
            return { ...state, showSignIn: false };
        default:
            return state;
    }
}
