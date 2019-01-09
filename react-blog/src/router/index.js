import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Demo from '../views/Demo';
import App from '../App';
import Login from '../views/login/Login';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App}/>
    <Route exact path='/login' component={Login} />
    <Route exact path='/demo' component={Demo} />
    <Redirect form="*" to="/" />
  </Switch>
);

export default Routes;