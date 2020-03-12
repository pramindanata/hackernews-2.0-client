import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '@/layout/default'

const Login = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <Layout>
        <div>
          <p>Ini halaman login</p>
        </div>
      </Layout>
    </>
  )
}

export default Login
