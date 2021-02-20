import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile } from 'actions/profile'

// For time formatting
import moment from 'moment'

import 'styles/profile.css'

const Profile = ({ match }) => {
  const dispatch = useDispatch()
  const { loaded, username, profile } = useSelector(state => state.profile)

  useEffect(() => dispatch(getProfile(match.params.id)), [])

  return (
    <div className="col-md-4 mt-4 mx-auto">
      <div className="card user-card">
        <div className="card-header">
          <h5>Profile</h5>
        </div>
        <div className="card-block">
          <h6 className="f-w-600">{ loaded && username }</h6>
          <p className="text-muted">{ loaded && `Born ${ moment(profile.birth_date).format('DD.MM.YYYY') }` }</p>
        </div>
        <div className='pb-4 px-4 text-center'>
          <span className="text-muted">{ loaded && profile.bio }</span>
        </div>
      </div>
    </div>
  )
}

export default Profile
