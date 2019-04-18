import { session } from '../services';
import * as orderTypes from '../types/order';
const initialState = { orderType: null, order: {} };

if (session.orderType) {
    initialState.orderType = +session.orderType;
};

if (session.getOrder()) {
    initialState.order = session.getOrder();
};

export function order(state = initialState, action) {
    switch (action.type) {
        case orderTypes.ADD_ORDER_TYPE:
            return { ...state, orderType: action.payload };
        case orderTypes.ADD_ORDER:
            return { ...state, order: action.payload };
        case orderTypes.REMOVE_ORDER:
            return { order: {} };
        default:
            return state;
    }
}
