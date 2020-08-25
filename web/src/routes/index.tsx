import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Register from '../pages/Register';
import CompletedRegister from '../pages/CompletedRegister';
import ForgotPassword from '../pages/ForgotPassword';
import SentEmail from '../pages/SentEmail';
import Landing from '../pages/Landing';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route component={Login} exact path="/" />
      <Route component={Register} path="/register" />
      <Route component={CompletedRegister} path="/completed-register" />
      <Route component={ForgotPassword} path="/forgot-password" />
      <Route component={SentEmail} path="/sent-email" />
      <Route component={Landing} path="/landing" />
    </Switch>
  );
};

export default Routes;
