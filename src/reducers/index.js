import { combineReducers } from 'redux';
import { cart } from './cart-reducer';
import { order } from './order-reducer';

console.log(cart);
const rootReducer = combineReducers({
    cart,
    order,
});

export default rootReducer;
