import { combineReducers } from 'redux'
import layout from '@/store/reducer/layout'
import auth from '@/store/reducer/auth'

export default combineReducers({
  auth,
  layout,
})
