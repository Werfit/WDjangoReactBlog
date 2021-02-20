import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from 'actions/posts'

import Post from './Post'
import Form from './Form'

const Dashboard = () => {

  const posts = useSelector(state => state.posts.posts)
  const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()

  // Loads posts
  useEffect(() => dispatch(getPosts()), [])

  return (
    <div className='mt-4'>
      { isAuth && (
          <>
            <h2>New post</h2>
            <Form />
          </>
        )
      }
      <h2>Your feed</h2>

      {
        posts.map(post => (
          <Post key={ post.id } post={ post }/>
        ))
      }
    </div>
  )
}

export default Dashboard
