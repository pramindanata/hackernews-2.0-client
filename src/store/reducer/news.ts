import * as I from '@/interface'

const initialState = (): I.Redux.Store.News => ({
  refetch: false,
})

export default (state = initialState(), action: any): any => {
  if (action.type === 'SET_NEWS_REFETCH') {
    return {
      ...state,
      refetch: action.payload,
    }
  }

  return state
}
