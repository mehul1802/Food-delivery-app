
import React from 'react';
import {Redirect, Route , Switch  } from 'react-router-dom';

import Home from '../components/Home';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Redirect to="/" />
  </Switch>
);