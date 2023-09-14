import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet ,Redirect} from 'react-router-dom'

const AuthRoutes = ({children}) => {
  const {authToken} = useSelector((action) => action.authSlice)

    return authToken ? <Navigate to="/"/> : <Outlet/>
}

export default AuthRoutes