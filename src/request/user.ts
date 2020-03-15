import axios from '@/lib/axios'
import * as I from '@/interface'

class UserRequest {
  public static show(id: number | string): Promise<I.Entity.User> {
    return new Promise((resolve, reject) => {
      axios
        .get(`/user/${id}`)
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => reject(err))
    })
  }
}

export default UserRequest
