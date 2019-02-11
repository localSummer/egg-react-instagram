import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import Demo from '../views/Demo';
import App from '../App';
import Login from '../views/login/index';
import Regist from '../views/regist/index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App}/>
    <Route exact path='/login' component={Login} />
    <Route exact path='/regist' component={Regist} />
    <Route exact path='/demo' component={Demo} />
    <Redirect form="*" to="/" />
  </Switch>
);

export default Routes;