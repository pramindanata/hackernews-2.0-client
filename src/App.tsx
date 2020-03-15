import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useLocation } from 'react-router-dom'
import loadable from '@loadable/component'

import LayoutSelector from '@/layout/Selector'
import AuthRequest from '@/request/auth'
import { setUser } from '@/store/action'

import PrivateRoute from '@/shared/components/PrivateRoute'
import GuestRoute from '@/shared/components/GuestRoute'
import Loading from '@/shared/components/Loading'

const Home = loadable(() => import('@/pages/Home'))
const Login = loadable(() => import('@/pages/Login'))
const Profile = loadable(() => import('@/pages/Profile'))
const Register = loadable(() => import('@/pages/Register'))
const User = loadable(() => import('@/pages/User'))
const NoMatch = loadable(() => import('@/pages/NoMatch'))

const App = (): JSX.Element => {
  const loc = useLocation()
  const [ready, setReady] = useState(false)
  const dispatch = useDispatch()
  const isTargetingGuest =
    loc.pathname === '/login' || loc.pathname === '/register'
  let layout: 'Default' | 'Auth' = 'Default'

  // Only changed per reload
  if (isTargetingGuest) {
    layout = 'Auth'
  }
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function getMe(): Promise<void> {
      const me = await AuthRequest.me()

      dispatch(setUser(me))
      setReady(true)

      if (isTargetingGuest) {
        window.location.href = '/'
      }
    }

    if (token) {
      getMe()
    } else {
      setReady(true)
    }
  }, [token, isTargetingGuest, dispatch])

  if (!ready) {
    return <Loading />
  }

  return (
    <LayoutSelector tag={layout}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/user/:id">
          <User />
        </Route>

        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>

        <GuestRoute exact path="/login">
          <Login />
        </GuestRoute>

        <GuestRoute exact path="/register">
          <Register />
        </GuestRoute>

        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </LayoutSelector>
  )
}

export default App
