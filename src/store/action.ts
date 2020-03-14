import * as I from '@/interface'

export const setLayout = (layout: 'Default' | 'Auth'): any => ({
  type: 'SET_LAYOUT',
  payload: layout,
})

export const setUser = (user: I.Redux.Store.Auth['user'] | null): any => ({
  type: 'SET_USER',
  payload: user,
})

export const setSubmitModalShow = (value: boolean): any => ({
  type: 'SET_SUBMIT_MODAL_SHOW',
  payload: value,
})

export const setNewsRefetch = (value: boolean): any => ({
  type: 'SET_NEWS_REFETCH',
  payload: value,
})
