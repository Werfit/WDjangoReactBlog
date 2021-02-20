import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { createError } from 'actions/errors'
import { registerUser } from 'actions/auth'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('') // Password confirmation
  const [date, setDate] = useState('')
  const [bio, setBio] = useState('')

  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.auth.isAuth)

  const onSubmit = e => {
    e.preventDefault()

    if (pass !== pass2)
      dispatch(createError({
        data: {
          userError: 'Passwords do not match'
        }
      }))
    else
      dispatch(registerUser({
        username, email, password: pass, profile: {
          birth_date: date,
          bio
        }
      }))
  }

  return !isAuth ? (
    <div className='col-md-6 m-auto'>
      <div className='card card-body mt-5'>
        <h2 className='text-center'>Register</h2>

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
              required
            />
          </div>
          <div className='form-group mb-3'>
            <label>
              Email
            </label>
            <input
              name='email'
              type='email'
              className='form-control'
              value={ email }
              onChange={ e => setEmail(e.target.value) }
              required
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
              required
            />
          </div>
          <div className='form-group mb-3'>
            <label>
              Confirm password
            </label>
            <input
              name='password2'
              type='password'
              className='form-control'
              value={ pass2 }
              onChange={ e => setPass2(e.target.value) }
              required
            />
          </div>
          <div className='form-group mb-3'>
            <label>
              Date of birth
            </label>
            <input
              name='date-of-birth'
              type='date'
              className='form-control'
              value={ date }
              onChange={ e => setDate(e.target.value) }
              required
            />
          </div>
          <div className='form-group mb-3'>
            <label>
              About you
            </label>
            <textarea
              name='bio'
              className='form-control'
              value={ bio }
              onChange={ e => setBio(e.target.value) }
            />
          </div>
          <div className='form-group mb-3'>
            <button type='submit' className='btn btn-primary'>
              Register
            </button>
          </div>
          <p>
            Already have an account? <Link to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  ) : <Redirect to='/' />
}

export default Register
