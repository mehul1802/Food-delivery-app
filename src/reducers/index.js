import { combineReducers } from 'redux';

import api from './api-reducer';
import { cart } from './cart-reducer';
import { order } from './order-reducer';
import { authentication } from './authentication-reducer';
import { dialog } from './dialog-reducer';

const rootReducer = combineReducers({
    api,
    cart,
    order,
    authentication,
    dialog
});

export default rootReducer;
