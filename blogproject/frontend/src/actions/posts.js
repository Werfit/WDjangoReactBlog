import {
  GET_POSTS,
  ADD_POST,
  DELETE_POST
} from './types'

import axios from 'axios'

import { createError } from './errors'
import tokenConfig from 'utils/tokenConfig'

// GET POSTS
export const getPosts = () => dispatch => {
  axios.get('/api/posts/')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err => {
      dispatch(createError(err.response))
    })
}

// ADD POST
export const addPost = post => (dispatch, getState) => {
  axios.post('/api/posts/', post, tokenConfig(getState))
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => {
      dispatch(createError(err.response))
    })
}

// DELETE POST
export const deletePost = id => (dispatch, getState) => {
  axios.delete(`/api/posts/${id}/`, tokenConfig(getState))
    .then(() => dispatch({
      type: DELETE_POST,
      payload: id
    }))
    .catch(err => dispatch(createError(err.response)))
}