import axios from '@/lib/axios'
import * as I from '@/interface'

class NewsRequest {
  public static index(): Promise<I.NewsFeed> {
    return new Promise((resolve, reject) => {
      axios
        .get('/news')
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }
}

export default NewsRequest
