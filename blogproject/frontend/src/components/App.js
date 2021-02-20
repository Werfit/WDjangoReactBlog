import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import Header from 'components/layout/Header'
import Dashboard from 'components/posts/Dashboard'

import PostPage from 'components/pages/PostPage'
import Alerts from 'components/layout/Alerts'

import Login from 'components/accounts/Login'
import Register from 'components/accounts/Register'
import Profile from 'components/accounts/Profile'

// import PrivateRoute from 'components/common/PrivateRoute'

import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import { loadUser } from 'actions/auth'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => dispatch(loadUser()), [])

  return (
    <Router>
      <Header />
      <div className='container'>
        <Switch>
          <Route exact path='/' component={ Dashboard } />
          <Route exact path='/posts/:id' component={ PostPage } />
          <Route exact path='/auth/login' component={ Login }/>
          <Route exact path='/auth/register' component={ Register } />
          <Route exact path='/profile/:id' component={ Profile } />
        </Switch>
        <Alerts />
      </div>
    </Router>
  )
}

export default App
