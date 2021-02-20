import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import 'styles/alerts.css'

const Alerts = () => {
  const error = useSelector(state => state.errors)
  const [isVisible, toggleVisibility] = useState(false)

  const errorMsgs = {
    // COMMON
    detail: 'Server',

    // POSTS
    title: 'Title',
    body: 'Body',

    // AUTH
    userError: 'User',
    username: 'Login',
    password: 'Password'

  }

  // Shows error when the component is loaded
  useEffect(() => {
    // Check if object is empty
    if (Object.keys(error.msg).length !== 0)
      toShowAlert()
  }, [error])

  // Shows error and hides it in 2 seconds
  const toShowAlert = () => {
    toggleVisibility(true)
    setTimeout(() => toggleVisibility(false), 3000)
  }

  return (
    <div className={ `container alert alert-danger alert-msg ${ isVisible && 'alert-to-show' }` }>
      {
        Object.keys(errorMsgs).map((errorMsg, index) => {
          if (error.msg[errorMsg])
            return <p key={ index }>{ errorMsgs[errorMsg] }: { error.msg[errorMsg] }</p>
          return null
        })
      }
      { error.status && (
          <>
            <br />
            <span>Status: { error.status }</span>
          </>
        )
      }
    </div>
  )
}

export default Alerts
