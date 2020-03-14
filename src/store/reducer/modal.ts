import * as I from '@/interface'

const initialState = (): I.Redux.Store.Modal => ({
  submit: false,
  editProfile: false,
  editNews: false,
  editNewsPayload: { id: null, title: '', url: '' },
})

export default (state = initialState(), action: any): any => {
  if (action.type === 'SET_SUBMIT_MODAL_SHOW') {
    return {
      ...state,
      submit: action.payload,
    }
  } else if (action.type === 'SET_EDIT_PROFILE_MODAL_SHOW') {
    return {
      ...state,
      editProfile: action.payload,
    }
  } else if (action.type === 'SET_EDIT_NEWS_MODAL_SHOW') {
    const initialPayload = (): any => ({ id: null, title: '', url: '' })

    return {
      ...state,
      editNews: action.payload.active,
      editNewsPayload: !action.payload.active
        ? initialPayload()
        : {
            id: action.payload.data.id,
            title: action.payload.data.title,
            url: action.payload.data.url,
          },
    }
  }

  return state
}
