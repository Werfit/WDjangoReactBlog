import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = (props) => {
  const isAuth = useSelector(state => state.auth.isAuth)
  console.log('hi')
  return isAuth ? <Route { ...props } /> : <Redirect to='/' />
}

export default PrivateRoute
