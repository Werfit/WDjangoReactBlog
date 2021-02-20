import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logoutUser } from 'actions/auth'

const Header = () => {
  const { isAuth, user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const logout = e => {
    e.preventDefault()

    dispatch(logoutUser())
  }

  const notAuthNav = (
    <ul className='navbar-nav'>
      <li className="nav-item">
        <Link className="nav-link" to="/auth/login">Log in</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/auth/register">Sign up</Link>
      </li>
    </ul>
  )

  const isAuthNav = (
    <ul className='navbar-nav'>
      <li className="nav-item">
        <Link className="nav-link" to={ user ? `/profile/${ user.id }` : '/' }>Profile</Link>
      </li>
      <li className="nav-item">
        <button type="button" className="btn btn-primary" onClick={ e => logout(e) }>Logout</button>
      </li>
    </ul>
  )

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container py-2">
        <a className="navbar-brand" href="#">Blog</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          { isAuth ? isAuthNav : notAuthNav }
        </div>
      </div>
    </nav>
  )
}

export default Header
