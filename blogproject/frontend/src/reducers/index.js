import { combineReducers } from 'redux'

import posts from './posts'
import errors from './errors'
import profile from './profile'
import auth from './auth'

export default combineReducers({
  posts, errors, auth, profile
})