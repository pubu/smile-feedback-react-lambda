import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'

import { HomePage, ImpressumPage, DatenschutzPage, NotFoundPage } from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'

injectGlobal`
  body {
    margin: 0;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/" component={HomePage} exact />
        <Route path="/datenschutz" component={DatenschutzPage} />
        <Route path="/impressum" component={ImpressumPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  )
}

export default App
