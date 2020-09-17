import React from 'react';
import { Switch } from 'react-router-dom';

import Cart from '../pages/Cart';
import Dashboard from '../pages/Dashboard';
import Payment from '../pages/Payment';
import AddressForm from '../pages/Payment/AddressForm';
import Card from '../pages/Payment/Card';
import Order from '../pages/Payment/Order';
import OrderProducts from '../pages/Payment/OrderProducts'
import SelectAddress from '../pages/Payment/SelectAddress';
import SigIn from '../pages/User/Login/SignIn';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />

    <Route path="/signin" exact component={SigIn} />

    <Route path="/cart" exact component={Cart} />
    <Route path="/cartlogado" exact component={Cart} isPrivate />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/payment" exact component={Payment} isPrivate />
    <Route path="/card" exact component={Card} isPrivate />
    <Route path="/orders" exact component={Order} isPrivate />
    <Route
      path="/orders/products/:order_id"
      exact
      component={OrderProducts}
      isPrivate
    />

    <Route path="/select_address" exact component={SelectAddress} isPrivate />
    <Route path="/address/new" exact component={AddressForm} isPrivate />
  </Switch>
);

export default Routes;
