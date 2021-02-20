import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

import { createError } from 'actions/errors'
import Post from 'components/posts/Post'

const PostPage = ({ match }) => {
  const [post, setPost] = useState({ notFound: true })
  const dispatch = useDispatch()

  useEffect(() => {
    axios.get(`/api/posts/${ match.params.id }`)
      .then(res => {
        setPost(res.data)
      })
      .catch(err => {
        dispatch(createError(err.response))
      })
  }, [])

  return (
    <div>
      { post.notFound ? <></> : <Post post={ post } isRetrieved={ true } /> }
    </div>
  )
}

export default PostPage