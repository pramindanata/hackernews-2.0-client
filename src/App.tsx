import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useLocation } from 'react-router-dom'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Submit from '@/pages/Submit'
import LayoutSelector from '@/layout/Selector'
import AuthRequest from '@/request/auth'
import { setUser } from '@/store/action'

const App = (): JSX.Element => {
  const loc = useLocation()
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  let layout: 'Default' | 'Auth' = 'Default'

  // Only changed per reload
  if (loc.pathname === '/login' || loc.pathname === '/register') {
    layout = 'Auth'
  }
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function getMe(): Promise<void> {
      const me = await AuthRequest.me()

      dispatch(setUser(me))
      setReady(true)
    }

    if (token) {
      getMe()
    }

    setReady(true)
  }, [token])

  if (!ready) {
    return <div>Loading...</div>
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
