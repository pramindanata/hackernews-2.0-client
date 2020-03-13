import React from 'react'
import { Switch, Route, useLocation } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Submit from '@/pages/Submit'
import LayoutSelector from '@/layout/Selector'

const App = (): JSX.Element => {
  const loc = useLocation()
  let layout: 'Default' | 'Auth' = 'Default'

  // Only changed per reload
  if (loc.pathname === '/login' || loc.pathname === '/register') {
    layout = 'Auth'
  }

  return (
    <LayoutSelector tag={layout}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/submit">
          <Submit />
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>
      </Switch>
    </LayoutSelector>
  )
}

export default App
