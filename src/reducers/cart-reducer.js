import { session } from '../services';
const initialState = { products: [] };

// Hack since we are not using api for cart data fetching
if(session.getCartData()) {
    initialState.products = session.getCartData();
};

export function cart(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            if (!state.products.find(item => item.uid === action.payload.uid)) {
                return { ...state, products: state.products.concat(action.payload) };
            } else return state;
        case 'REMOVE_FROM_CART':
            return { ...state, products: state.products.filter(product => product.uid != action.payload) };
        default:
            return state;
    }
}
