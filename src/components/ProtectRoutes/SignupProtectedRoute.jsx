import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const SignupProtectedRoute = () => {
  const [isSignUp, setIsSignUP] = useState(JSON.parse(localStorage.getItem("isSignup")))
  // const [isLogin, setIslogin] = useState(JSON.parse(localStorage.getItem("isLogin")))


//   const {authToken} = useSelector((action) => action.authSlice)
//   return authToken ? <Outlet/> :<Navigate to="/" />
  return isSignUp ? <Outlet/> : <Navigate to="/"  />


  
}

export default SignupProtectedRoute

