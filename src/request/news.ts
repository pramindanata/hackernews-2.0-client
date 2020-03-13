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
          },
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }
}

export default NewsRequest
