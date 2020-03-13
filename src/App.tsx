import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
