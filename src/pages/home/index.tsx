import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import * as RI from '@/interface'
import NewsRequest from '@/request/news'
import NewsItem from '@/shared/components/NewsItem'
import Filter from '@/shared/components/Filter'

type Sort = 'published' | 'vote'
type Order = 'desc' | 'asc'

const Home = (): JSX.Element => {
  const initialSort = 'published'
  const initialOrder = 'desc'

  const [ready, setReady] = useState(false)
  const [total, setTotal] = useState(0)
  const [sort, setSort] = useState<Sort>(initialSort)
  const [order, setOrder] = useState<Order>(initialOrder)
  const [news, setNews] = useState<RI.Entity.News[]>([])

  const handleFilter = (sort: Sort, order: Order): void => {
    setSort(sort)
    setOrder(order)
  }

  useEffect(() => {
    async function fetch(): Promise<void> {
      const result = await NewsRequest.index()

      setReady(true)
      setTotal(result.total)
      setNews(result.data)
    }

    console.log(sort, order)

    fetch()
  }, [sort, order])

  return (
    <>
      <Helmet>
        <title>Hacker News 2.0</title>
      </Helmet>

      <Filter onChange={handleFilter} initialOrder={order} initialSort={sort} />

      {ready && news.map(item => <NewsItem key={item.id} value={item} />)}
    </>
  )
}

export default Home
