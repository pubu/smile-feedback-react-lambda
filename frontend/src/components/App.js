import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
      <Switch>
        <Route path="/" render={routeProps => <HomePage {...routeProps} />} exact />
        <Route path="/dashboard/:token" render={routeProps => <DashboardPage {...routeProps} />} />
        <Route path="/vote/:token" render={routeProps => <DashboardPage {...routeProps} />} />
        <Route path="/impressum" render={routeProps => <DashboardPage {...routeProps} />} />
        <Route path="/datenschutz" render={routeProps => <DashboardPage {...routeProps} />} />
        <Route  render={routeProps => <NotFoundPage {...routeProps} />} />
      </Switch>
  )
}

export default App
