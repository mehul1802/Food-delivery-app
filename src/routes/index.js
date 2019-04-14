
import React from 'react';
import { Route , Switch  } from 'react-router-dom';
import PrivateRoute from '../components/high-order/PrivateRoute';

import Home from '../components/Home';
import Checkout from '../components/Checkout';
import Success from '../components/Success';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <PrivateRoute path="/checkout/payment" component={Checkout} />
    <PrivateRoute path="/checkout/success" component={Success} />
  </Switch>
);