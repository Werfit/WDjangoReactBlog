import { GET_ERRORS, ERROR_401 } from './types'

// Getting Errors
export const createError = error => {
  if (error.status === 401)
    return {
      type: ERROR_401
    }
  
  return {
    type: GET_ERRORS,
    payload: {
      msg: error.data,
      status: error.status
    }
  }
}