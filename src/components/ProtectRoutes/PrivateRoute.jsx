import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  // const [isLogin, setIslogin] = useState(JSON.parse(localStorage.getItem("isLogin")))
  
  const {authToken} = useSelector((action) => action.authSlice)
  return authToken ? <Outlet/> : <Navigate to="/" />
}

export default PrivateRoute

