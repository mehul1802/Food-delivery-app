const initialState = { products: [] };

export function cart(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TO_CART':
        console.log(state.products)
            return { ...state, products: state.products.concat(action.payload) };
        case 'REMOVE_FROM_CART':
            return { ...state, products: state.products.filter(product => product.product_id !== action.payload) };
        default:
            return state;
    }
}
