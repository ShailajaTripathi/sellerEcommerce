import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { useSelector } from 'react-redux'

const SignUpLayout = () => {
const {isloading} = useSelector((action)=> action.authSlice)
  return (
    <>
        <Header hideSubMenu/>
        <main className='login-wrapper'>
         {isloading && <Loader /> } 
          <Outlet />
        </main>
    </>
  )
}

export default SignUpLayout