import axios from '@/lib/axios'
import * as I from '@/interface'

interface Payload {
  username: string
  password: string
}

class AuthRequest {
  public static login(payload: Payload): Promise<I.AuthPayload> {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/login', {
          username: payload.username,
          password: payload.password,
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }
}

export default AuthRequest
