import {
  PROFILE_LOADED
} from 'actions/types'

const initialState = {
  username: '',
  profile: null,
  loaded: false,
}

export default function (state=initialState, action) {
  switch (action.type) {
    case PROFILE_LOADED:
      return {
        ...action.payload,
        loaded: true
      }
    default:
      return state
  }
}