import * as userTypes from '../types/user';

const initialState = { user: {}, cards: [], customerId: null };

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userTypes.GET_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
}
