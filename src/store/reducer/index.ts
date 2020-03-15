import { combineReducers } from 'redux'
import layout from '@/store/reducer/layout'
import auth from '@/store/reducer/auth'
import modal from '@/store/reducer/modal'
import news from '@/store/reducer/news'

export default combineReducers({
  auth,
  layout,
  modal,
  news,
})
