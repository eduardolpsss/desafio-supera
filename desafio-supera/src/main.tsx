import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// CSS do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Routes do React Router
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Fragment>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Fragment>,
)
