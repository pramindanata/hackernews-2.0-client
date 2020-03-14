import React, { useEffect, useState, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import queryString from 'query-string'
import produce from 'immer'

import * as I from '@/interface'
import NewsRequest from '@/request/news'
import NewsItem from '@/shared/components/NewsItem'
import Filter from '@/shared/components/Filter'
import Pagination from '@/shared/components/Pagination'
import { setNewsRefetch } from '@/store/action'

interface Props {
  userId: number
}

const UserNewsList = (props: Props): JSX.Element => {
  const { userId } = props
  const initialSort = 'published'
  const initialOrder = 'desc'
  const limit = 8

  const params = useLocation()
  const dispatch = useDispatch()
  const refetch = useSelector<I.Redux.State, boolean>(
    state => state.news.refetch,
  )

  const [query, setQuery] = useState(queryString.parse(params.search))

  useEffect(() => {
    setQuery(queryString.parse(params.search))
  }, [params])

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
    const result = await NewsRequest.ownByUser(userId, {
      order,
      sort,
      limit,
      search: query?.q as string,
      offset: page * limit,
    })

    return result
  }, [order, sort, limit, page, query, userId])

  const updateNews = useCallback(
    (index: number, id: number, upvote: boolean): void => {
      let doChange = false

      const nextNews = produce(news, draft => {
        if (draft[index].id === id) {
          const total = draft[index].voteCount as number

          doChange = true
          draft[index].upvoted = upvote
          draft[index].voteCount = total + (upvote ? 1 : -1)
        }
      })

      if (doChange) setNews(nextNews)
    },
    [news],
  )

  useEffect(() => {
    setSort(initialSort)
    setOrder(initialOrder)
    setPage(0)
    setFetchReady(true)
  }, [query])

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
      getNews()
        .then(res => {
          setReady(true)
          setTotal(res.total)
          setNews(res.data)
        })
        .finally(() => {
          setFetchReady(false)
        })
    }
  }, [fetchReady, getNews])

  useEffect(() => {
    setPageCount(Math.ceil(total / limit))
  }, [total])

  return (
    <>
      <Filter onChange={handleFilter} initialOrder={order} initialSort={sort} />

      {ready &&
        news.map((item, index) => (
          <NewsItem
            key={item.id}
            index={index}
            value={item}
            showOwner={false}
            onVote={updateNews}
          />
        ))}

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

export default UserNewsList
