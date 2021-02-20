import { 
  // SUCCESSS
  USER_LOADED,
  USER_LOADING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,

  // FAILED
  LOGIN_FAILED,
  USER_LOADING_FAILED,
  REGISTER_FAILED
} from 'actions/types'

const initialState = {
  user: null,
  token: localStorage.getItem('usr_token'),
  isLoading: false,
  isAuth: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuth: true
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('usr_token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        isLoading: false
      }
    case USER_LOADING_FAILED:
    case REGISTER_FAILED:
    case LOGOUT_SUCCESS:
    case LOGIN_FAILED:
      localStorage.removeItem('usr_token')
      return {
        ...state,
        user: null,
        isAuth: false,
        isLoading: false,
        token: null
      }
    default:
      return state
  }
}
