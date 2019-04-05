import * as orderTypes from '../types/order';

export function addOrderType(orderType) {
    return dispatch => {
        dispatch({ type: orderTypes.ADD_ORDER_TYPE, payload: orderType });
    };
}