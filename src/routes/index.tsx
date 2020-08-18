import React from 'react';
import { Switch } from 'react-router-dom';

import Cart from '../pages/Cart';
import Dashboard from '../pages/Dashboard';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/cart" component={Cart} />
  </Switch>
);

export default Routes;
