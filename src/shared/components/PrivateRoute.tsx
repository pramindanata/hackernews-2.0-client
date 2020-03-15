import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as I from '@/interface'

const PrivateRoute = ({ children, ...rest }: any): JSX.Element => {
  const user = useSelector<I.Redux.State, I.Entity.User | null>(
    state => state.auth.user,
  )

  return (
    <Route
      {...rest}
      render={({ location }): void =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
