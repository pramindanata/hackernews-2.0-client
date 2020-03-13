import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '@/layout/Default'

const Home = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Hacker News 2.0</title>
      </Helmet>

      <Layout>
        <h2>Test Header</h2>
        <p>Hello World</p>
        <button className="btn btn-primary">test 1234</button>
      </Layout>
    </>
  )
}

export default Home
