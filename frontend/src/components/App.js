import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'
import VotePage from './pages/VotePage';
import ServicePage from './pages/ServicePage';

const App = () => {
  return (
      <Switch>
        <Route path="/" render={routeProps => <HomePage {...routeProps} />} exact />
        <Route path="/dashboard/:token" render={routeProps => <DashboardPage {...routeProps} />} />
        <Route path="/vote/:token" render={routeProps => <VotePage {...routeProps} />} />
        <Route path="/:slug" render={routeProps => <ServicePage {...routeProps} />} />
        <Route  render={routeProps => <NotFoundPage {...routeProps} />} />
      </Switch>
  )
}

export default App
