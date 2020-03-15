import * as I from '@/interface'

const initialState = (): I.Redux.Store.Auth => ({
  user: null,
})

export default (state = initialState(), action: any): any => {
  if (action.type === 'SET_USER') {
    return {
      ...state,
      user: action.payload,
    }
  }

  return state
}
