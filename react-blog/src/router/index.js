import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Demo from '../views/Demo';

const Routes = () => (
  <Switch>
    <Route exact path='/demo' component={Demo} />
    <Redirect form="*" to="/demo" />
  </Switch>
);

export default Routes;