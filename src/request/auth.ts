import axios from '@/lib/axios'
import * as I from '@/interface'

interface LoginInput {
  username: string
  password: string
}

interface RegisterInput extends LoginInput {
  email: string
}

class AuthRequest {
  public static login(payload: LoginInput): Promise<I.AuthPayload> {
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

  public static register(payload: RegisterInput): Promise<I.AuthPayload> {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/register', {
          username: payload.username,
          email: payload.email,
          password: payload.password,
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => reject(err))
    })
  }

  public static me(): Promise<I.Entity.User> {
    return new Promise((resolve, reject) => {
      axios
        .get('/auth/me')
        .then(res => {
          resolve(res.data.data)
        })
        .catch(err => reject(err))
    })
  }
}

export default AuthRequest
