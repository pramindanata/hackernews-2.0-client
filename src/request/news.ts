import axios from '@/lib/axios'
import * as I from '@/interface'

class NewsRequest {
  public static index(filter: I.NewsFilter): Promise<I.NewsFeed> {
    return new Promise((resolve, reject) => {
      axios
        .get('/news', {
          params: {
            sort: filter.sort,
            order: filter.order,
            limit: filter.limit,
            offset: filter.offset,
            search: filter.search,
          },
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }

  public static store(data: I.NewsInput): Promise<I.NewsFeed> {
    return new Promise((resolve, reject) => {
      axios
        .post('/news', {
          title: data.title,
          url: data.url,
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }

  public static vote(id: number): Promise<{ id: number; createdAt: string }> {
    return new Promise((resolve, reject) => {
      axios
        .post(`/news/${id}/vote`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }

  public static unvote(id: number): Promise<{ id: number; createdAt: string }> {
    return new Promise((resolve, reject) => {
      axios
        .delete(`/news/${id}/vote`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }
}

export default NewsRequest
