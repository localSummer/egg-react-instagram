import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import App from '../App';
import Demo from '../views/Demo';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={App} />
    <Route exact path='/demo' component={Demo} />
    <Redirect form="*" to="/" />
  </Switch>
);

export default Routes;