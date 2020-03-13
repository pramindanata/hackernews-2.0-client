import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import * as RI from '@/interface'
import Layout from '@/layout/Default'
import NewsRequest from '@/request/news'

const Home = (): JSX.Element => {
  const [ready, setReady] = useState(false)
  const [total, setTotal] = useState(0)
  const [news, setNews] = useState<RI.Entity.News[]>([])

  useEffect(() => {
    async function fetch(): Promise<void> {
      const result = await NewsRequest.index()

      setReady(true)
      setTotal(result.total)
      setNews(result.data)
    }

    fetch()
  }, [])

  return (
    <>
      <Helmet>
        <title>Hacker News 2.0</title>
      </Helmet>

      <Layout>{ready && <div>News is ready. {total} news given.</div>}</Layout>
    </>
  )
}

export default Home
