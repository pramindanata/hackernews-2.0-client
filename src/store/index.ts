import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '@/store/reducer'

export default createStore(reducers, composeWithDevTools())
