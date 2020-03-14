import React, { useEffect, useState, useCallback } from 'react'
import { Helmet } from 'react-helmet'
import { useSelector, useDispatch } from 'react-redux'
import * as I from '@/interface'
import NewsRequest from '@/request/news'
import NewsItem from '@/shared/components/NewsItem'
import Filter from '@/shared/components/Filter'
import Pagination from '@/shared/components/Pagination'
import { setNewsRefetch } from '@/store/action'

const Home = (): JSX.Element => {
  const initialSort = 'published'
  const initialOrder = 'desc'
  const limit = 10

  const dispatch = useDispatch()
  const refetch = useSelector<I.Redux.State, boolean>(
    state => state.news.refetch,
  )
  const [fetchReady, setFetchReady] = useState(false)
  const [ready, setReady] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const [sort, setSort] = useState<I.NewsFilter['sort']>(initialSort)
  const [order, setOrder] = useState<I.NewsFilter['order']>(initialOrder)
  const [news, setNews] = useState<I.Entity.News[]>([])

  const handleFilter = useCallback(
    (sort: I.NewsFilter['sort'], order: I.NewsFilter['order']): void => {
      setSort(sort)
      setOrder(order)
      setPage(0)

      setFetchReady(true)
    },
    [],
  )

  const handlePagination = useCallback(
    (selectedItem: { selected: number }): void => {
      setPage(selectedItem.selected)
      setFetchReady(true)
    },
    [],
  )

  const getNews = useCallback(async () => {
    const result = await NewsRequest.index({
      order,
      sort,
      limit,
      offset: page * limit,
    })

    return result
  }, [order, sort, limit, page])

  useEffect(() => {
    if (refetch) {
      setSort(initialSort)
      setOrder(initialOrder)
      setPage(0)
      setFetchReady(true)
      dispatch(setNewsRefetch(false))
    }
  }, [refetch, dispatch])

  useEffect(() => {
    if (fetchReady) {
      getNews().then(res => {
        setReady(true)
        setTotal(res.total)
        setNews(res.data)
        setFetchReady(false)
      })
    }
  }, [fetchReady, getNews])

  useEffect(() => {
    setPageCount(Math.ceil(total / limit))
  }, [total])

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
          initialPage={0}
          forcePage={page}
          onPageChange={handlePagination}
        />
      </div>
    </>
  )
}

export default Home
