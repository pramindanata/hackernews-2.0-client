import * as I from '@/interface'

const initialState = (): I.Redux.Store.Modal => ({
  submit: false,
})

export default (state = initialState(), action: any): any => {
  if (action.type === 'SET_SUBMIT_MODAL_SHOW') {
    return {
      ...state,
      submit: action.payload,
    }
  }

  return state
}
