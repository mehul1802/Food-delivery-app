const initialState = { orderType: null };

export function order(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ORDER_TYPE':
            return { ...state, orderType: action.payload };
        default:
            return state;
    }
}
