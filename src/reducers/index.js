import { combineReducers } from 'redux';
import { cart } from './cart-reducer';

console.log(cart);
const rootReducer = combineReducers({
    cart,
});

export default rootReducer;
