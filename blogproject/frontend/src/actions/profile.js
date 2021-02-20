import {
  PROFILE_LOADED
} from './types'
import { createError } from './errors'

import axios from 'axios'

// GET PROFILE DATA
export const getProfile = user_id => dispatch => {
  axios.get(`/api/user/profile/${user_id}/`)
    .then(res => dispatch({
        type: PROFILE_LOADED,
        payload: res.data
      }))
    .catch(err => dispatch(createError(err.response)))
}