import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import * as RI from '@/interface'
import NewsRequest from '@/request/news'
import NewsItem from '@/shared/components/NewsItem'
import Filter from '@/shared/components/Filter'
import Pagination from '@/shared/components/Pagination'

const Home = (): JSX.Element => {
  const initialSort = 'published'
  const initialOrder = 'desc'
  const limit = 3

  const [fetchReady, setFetchReady] = useState(false)
  const [ready, setReady] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [sort, setSort] = useState<RI.NewsFilter['sort']>(initialSort)
  const [order, setOrder] = useState<RI.NewsFilter['order']>(initialOrder)
  const [news, setNews] = useState<RI.Entity.News[]>([])

  const handleFilter = (
    sort: RI.NewsFilter['sort'],
    order: RI.NewsFilter['order'],
  ): void => {
    setSort(sort)
    setOrder(order)
  }

  const handlePagination = (selectedItem: { selected: number }): void => {
    setPage(selectedItem.selected)
  }

  useEffect(() => {
    async function fetch(): Promise<void> {
      const result = await NewsRequest.index({
        order,
        sort,
        limit,
        offset: page * limit,
      })

      setReady(true)
      setTotal(result.total)
      setNews(result.data)
    }

    if (fetchReady) {
      fetch()
      setFetchReady(false)
    }
  }, [fetchReady, sort, order, page])

  useEffect(() => {
    setPageCount(Math.ceil(total / limit))
  }, [total])

  useEffect(() => {
    setPage(0)
    setFetchReady(true)
  }, [order, sort])

  useEffect(() => {
    setFetchReady(true)
  }, [page])

  return (
    <>
      <Helmet>
        <title>Hacker News 2.0</title>
      </Helmet>

      <Filter onChange={handleFilter} initialOrder={order} initialSort={sort} />

      {ready && news.map(item => <NewsItem key={item.id} value={item} />)}

      <div className="mt-4">
        <Pagination
          pageCount={pageCount}
          forcePage={page}
          initialPage={0}
          onPageChange={handlePagination}
        />
      </div>
    </>
  )
}

export default Home
