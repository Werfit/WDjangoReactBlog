import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { loginUser } from 'actions/auth'

const Login = () => {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const isAuth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()

  const onSubmit = e => {
    e.preventDefault()

    const user = {
      username, password: pass
    }

    dispatch(loginUser(user))

    setUsername('')
    setPass('')
  }
  
  return !isAuth ? (
    <div className='col-md-6 m-auto'>
      <div className='card card-body mt-5'>
        <h2 className='text-center'>Login</h2>
        <form onSubmit={ e => onSubmit(e) }>
          <div className='form-group mb-3'>
            <label>
              Name
            </label>
            <input
              name='name'
              type='text'
              className='form-control'
              value={ username }
              onChange={ e => setUsername(e.target.value) }
            />
          </div>
          <div className='form-group mb-3'>
            <label>
              Password
            </label>
            <input
              name='password'
              type='password'
              className='form-control'
              value={ pass }
              onChange={ e => setPass(e.target.value) }
            />
          </div>
          <div className='form-group mb-3'>
            <button type='submit' className='btn btn-primary'>
              Login
            </button>
          </div>
          <p>
            Don't have an account? <Link to='/auth/register'>Register</Link>
          </p>
        </form>
      </div>
    </div>
  ) : <Redirect to='/' />
}

export default Login
