import React, { useState } from 'react'

import { useDispatch } from 'react-redux'
import { addPost } from 'actions/posts'

const Form = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useDispatch()

  const submitPost = e => {
    e.preventDefault()

    const post = {
      title, body
    }

    dispatch(addPost(post))
    setTitle('')
    setBody('')
  }

  return (
    <form className="row g-3" onSubmit={ e => submitPost(e) }>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title"
        value={ title } onChange={ e => setTitle(e.target.value) } />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">Body</label>
        <textarea className="form-control" id="body" rows="3"
        value={ body } onChange={ e => setBody(e.target.value) } />
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary mb-5">Share</button>
      </div>
    </form>
  )
}

export default Form
