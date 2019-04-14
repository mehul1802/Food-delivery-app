import * as cartTypes from '../types/cart';

export function addToCart(product) {
    return dispatch => {
        dispatch({ type: cartTypes.ADD_TO_CART, payload: product });
    };
}

export function removeFromCart(productId) {
    return dispatch => {
        dispatch({ type: cartTypes.REMOVE_FROM_CART, payload: productId });
    };
}

export function resetCart() {
    return dispatch => {
        dispatch({ type: cartTypes.RESET_CART });
    };
}