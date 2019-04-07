const initialState = { products: [] };

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
