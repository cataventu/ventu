import React from 'react';
import {
  BrowserRouter as Router, Route, Redirect, Switch,
} from 'react-router-dom';
import {
  landing as homePageRoute,
  dashboard as defaultRoutes,
  page as authRoutes,
} from './index';

import { participanteRoutes, contratanteRoutes } from './hotsite';

import DashboardLayout from '../layouts/Dashboard';
import LandingLayout from '../layouts/Landing';
import ContratanteLayout from '../layouts/HotSite_Con';
import ParticipanteLayout from '../layouts/HotSite_Par';
import AuthLayout from '../layouts/Auth';

import { ScrollToTop } from '../components';

const childRoutes = (Layout, routes) => routes.map(({ children, path, component: Component }) => (children ? (
//Route item with children
  children.map(({ path, component: Component }) => (
    <Route
      key={path}
      path={path}
      exact
      render={(props) => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  ))
) : (
//Route item without children
  <Route
    key={path}
    path={path}
    exact
    render={(props) => (
      <Layout>
        <Component {...props} />
      </Layout>
    )}
  />
)));

const Routes = () => (
  <Router>
    <ScrollToTop>
      <Switch>
        {childRoutes(LandingLayout, homePageRoute)}
        {childRoutes(DashboardLayout, defaultRoutes)}
        {childRoutes(AuthLayout, authRoutes)}
        {childRoutes(ContratanteLayout, contratanteRoutes)}
        {childRoutes(ParticipanteLayout, participanteRoutes)}
        <Redirect to="/" />
      </Switch>
    </ScrollToTop>
  </Router>
);

export default Routes;
