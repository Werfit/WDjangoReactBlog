import React, { useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { deletePost } from 'actions/posts'

import { Link, Redirect } from 'react-router-dom'

// For time formatting
import moment from 'moment'

const Post = ({ post, isRetrieved = false }) => {
  const { id, title, body, created_at, author } = post
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)
  const user = useSelector(state => state.auth.user)

  const [isDeleted, setIsDeleted] = useState(false)

  const deleteSelf = e => {
    e.preventDefault()

    dispatch(deletePost(post.id))
    setIsDeleted(true)
  }

  return (isRetrieved && isDeleted) ? <Redirect to='/' /> : (
    <div className="post-card card mt-4 mb-4">
      <div className="card-body">
        <h5 className="card-title">
          {
            !isRetrieved ? (<Link to={ `/posts/${id}` }>
              { title }
            </Link>) : title
          }
        </h5>
        <p className="card-text">{ body }</p>
        <p className="card-text d-flex align-items-center justify-content-between">
          <small className="text-muted">
            {
              // Converting time from Django timezone format to Day - Month - Year
              moment(created_at).format('DD-MM-YYYY') 
            }
          </small>
          <small className="text-muted">
            {
              author
            }
          </small>
          {
            (isAuth && user && author === user.username) && <button className="btn btn-danger" onClick={ e => deleteSelf(e) }>
              Delete
            </button>
          }
        </p>
      </div>
    </div>
  )
}

export default Post
