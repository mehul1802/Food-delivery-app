import { combineReducers } from 'redux';
import { cart } from './cart-reducer';
import { order } from './order-reducer';
import { authentication } from './authentication-reducer';

const rootReducer = combineReducers({
    cart,
    order,
    authentication,
});

export default rootReducer;
