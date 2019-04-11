import { session } from '../services';
const initialState = { orderType: null, order: {} };

if (session.orderType) {
    initialState.orderType = session.orderType;
};

export function order(state = initialState, action) {
    switch (action.type) {
        case 'ADD_ORDER_TYPE':
            return { ...state, orderType: action.payload };
        case 'ADD_ORDER':
            return { ...state, order: action.payload };
        default:
            return state;
    }
}
