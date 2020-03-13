import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import store from '@/store'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Layout from '@/layout/Default'

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
