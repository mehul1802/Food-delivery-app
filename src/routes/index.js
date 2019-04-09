
import React from 'react';
import {Redirect, Route , Switch  } from 'react-router-dom';

import Home from '../components/Home';
import Checkout from '../components/Checkout';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/checkout/:id/payment" component={Checkout} />
  </Switch>
);