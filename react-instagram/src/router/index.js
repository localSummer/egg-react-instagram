import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Demo from '../views/Demo';
import App from '../App';
import Login from '../views/login/index';
import About from '../views/about/index';
import Accounts from '../views/account/index';
import NotFoundPage from '../views/404/index';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={App}/>
    <Route exact path='/login' component={Login} />
    <Route path="/about/:userId" component={About} />
    <Route path="/about" component={About} />
    <Route path="/accounts" component={Accounts}/>
    
    <Route exact path='/demo' component={Demo} />
    <Route component={NotFoundPage} />
  </Switch>
);

export default Routes;