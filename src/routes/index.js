import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

// import { SignIn, SignUp, Dashboard, Profile } from 'pages';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Orders from '../pages/Orders';

import Profile from '../pages/Profile';

import Task from '../pages/Task';

import { PrivateRoute } from '~/utils/privateRoute';

export const routes = {
  signin: '/',
  signup: '/cadastrar',

  orders: '/orders',

  taskRedirect: '/task',
  task: '/task/:id',
  profile: '/perfil',
};

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.orders} component={Orders} isPrivate />
      <Route path={routes.task} component={Task} isPrivate />
      <Route path={routes.profile} component={Profile} isPrivate />
      <Route path={routes.signup} component={SignUp} />
      <Route path={routes.signin} component={SignIn} />
    </Switch>
  );
}
