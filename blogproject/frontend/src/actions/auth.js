import {
  // AUTH SUCCESS
  LOGIN_SUCCESS,
  USER_LOADING,
  USER_LOADED,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,

  // AUTH FAILED
  LOGIN_FAILED,
  USER_LOADING_FAILED,
  REGISTER_FAILED
} from './types'
import { createError } from './errors'
import tokenConfig from 'utils/tokenConfig'

import axios from 'axios'

// LOGIN USER
export const loginUser = user => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  axios.post('/api/user/login', user, config)
    .then(res => dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(createError(err.response))
      dispatch({
        type: LOGIN_FAILED
      })
    })
}

// REGISTER USER
export const registerUser = user => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  })

  axios.post('api/user/register', user, tokenConfig(getState))
    .then(res => dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(createError(err.response))
      dispatch({
        type: REGISTER_FAILED
      })
    })
}

// LOAD USER
export const loadUser = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  })

  axios.get('/api/user/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(createError(err.response))
      dispatch({
        type: USER_LOADING_FAILED
      })
    })
}

// LOGOUT USER
export const logoutUser = () => (dispatch, getState) => {
  axios.post('/api/user/logout', null, tokenConfig(getState))
    .then(() => dispatch({
      type: LOGOUT_SUCCESS
    }))
    .catch(err => dispatch(createError(err.response)))
}