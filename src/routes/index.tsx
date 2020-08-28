import React from 'react';
import { Switch } from 'react-router-dom';

import Cart from '../pages/Cart';
import Dashboard from '../pages/Dashboard';
import Payment from '../pages/Payment';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/cart" component={Cart} />
    <Route path="/payment" component={Payment} />
  </Switch>
);

export default Routes;
