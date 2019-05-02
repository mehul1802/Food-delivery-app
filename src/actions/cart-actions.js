import * as cartTypes from '../types/cart';

export function addToCart(product) {
    return dispatch => {
        dispatch({ type: cartTypes.ADD_TO_CART, payload: product });
    };
}

export function removeFromCart(itemUid) {
    return dispatch => {
        dispatch({ type: cartTypes.REMOVE_FROM_CART, payload: itemUid });
    };
}

export function resetCart() {
    return dispatch => {
        dispatch({ type: cartTypes.RESET_CART });
    };
}

export function showCartDrawer () {
    return dispatch => {
        dispatch({ type: cartTypes.SHOW_CART });
    };
}

export function hideCartDrawer () {
    return dispatch => {
        dispatch({ type: cartTypes.HIDE_CART });
    };
}