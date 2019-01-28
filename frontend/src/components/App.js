import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/dashboard/:token" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
  )
}

export default App
