const initialState = { products: [] };

export function cart(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return { ...state, products: state.products.concat(action.payload) };
        case 'REMOVE_FROM_CART':
            return { ...state, products: state.products.filter(product => product.uid != action.payload) };
        default:
            return state;
    }
}
