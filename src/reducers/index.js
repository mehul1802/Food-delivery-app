import { combineReducers } from 'redux';
import { cart } from './cart-reducer';
import { order } from './order-reducer';
import { authentication } from './authentication-reducer';
import { dialog } from './dialog-reducer';

const rootReducer = combineReducers({
    cart,
    order,
    authentication,
    dialog
});

export default rootReducer;
