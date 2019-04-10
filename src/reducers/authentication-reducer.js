const initialState = {user: {}, cards: [], customerId: null, tempPhotos: {}, plannerProfileStatus: {}, userCredits: 0};

export function authentication(state = initialState, action) {
    if (action.type === 'GET_USER') {
        return {...state, user: action.payload};
    } else if (action.type === 'GET_USER_CARDS') {
        return {...state, cards: action.response.cards, customerId: action.response.stripe_customer_id};
    } else if (action.type === 'ADD_USER_CARD') {
        return {...state, cards: state.cards.concat(action.response)};
    } else if (action.type === 'REMOVE_USER_CARD') {
        return {...state, cards: state.cards.filter(item => item._id !== action.response.id)};
    } else {
        return state;
    }
}
