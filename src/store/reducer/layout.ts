import * as I from '@/interface'

const initialState = (): I.Redux.Store.Layout => ({
  template: 'Default',
})

export default (state = initialState(), action: any): any => {
  if (action.type === 'SET_LAYOUT') {
    if (action.payload !== 'Default' || action.type !== 'Auth') {
      throw Error('Invalid layout choosed')
    }

    return {
      ...state,
      layout: action.payload,
    }
  }

  return state
}
