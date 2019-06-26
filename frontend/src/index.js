import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';


const renderApp = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  
  const root = document.getElementById('root')
  render(renderApp(), root)
  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();





