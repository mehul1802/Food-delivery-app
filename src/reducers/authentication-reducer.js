const initialState = {user: {}, cards: [], customerId: null, tempPhotos: {}, plannerProfileStatus: {}, userCredits: 0};

export function authentication(state = initialState, action) {
    if (action.type === 'GET_USER') {
        console.log(action);
        return {...state, user: action.response};
    } else if (action.type === 'GET_USER_CARDS') {
        return {...state, cards: action.response.cards, customerId: action.response.stripe_customer_id};
    } else if (action.type === 'ADD_USER_CARD') {
        return {...state, cards: state.cards.concat(action.response)};
    } else if (action.type === 'REMOVE_USER_CARD') {
        return {...state, cards: state.cards.filter(item => item._id !== action.response.id)};
    } else if (action.type === 'UPDATE_PROFILE_PICTURE') {
        return {...state, user: {...state.user, profile_picture: action.response}};
    } else if (action.type === 'UPDATE_TEMP_PHOTOS') {
        return {...state, tempPhotos: action.response}
    }  else if (action.type === 'UPDATE_PLANNER_PROFILE_STATUS') {
        return {...state, plannerProfileStatus: action.response}
    }  else if (action.type === 'UPDATE_PROFILE_INCOMPLETE_STATUS') {
        return {...state, user: {...state.user, ...action.response}}
    } else {
        return state;
    }
}
