import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotpassword, signup , home} from '../../config/routingConsts'
import Button from '../../components/Button/Button'
import { useForm } from 'react-hook-form'

import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { SELLER_LOGIN } from '../../Redux-Toolkit/Actions/sagaActions'

const Login = () => {
  const { t } = useTranslation()
  const homePage = t('home', { returnObjects: true })
  const [loginuser, setloginUser] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setloginUser({ ...loginuser, [e.target.name]: e.target.value })
  }
  
  const validationSchema = yup.object({
    email: yup.string().required('Please Enter Email Address'),
    // .max(
    //     30,
    //     'Username or Email must be between 8 to 30 characters long'
    // ),
    password: yup
      .string()
      .required('Please Enter Password')
      .min(6, 'Password must be 6 to 30 characters long')
      .max(30, 'Password must be 6 to 30 characters long'),
    agree: yup.boolean().oneOf([true], 'Please Check Agree')
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' })
  

  const [passwordShown, setPasswordShown] = useState(false)
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true)
}

  const onSubmit = (data)=> {
    dispatch({type : SELLER_LOGIN, payload : {
      email : data.email,
      password : data.password
    }})
    // navigate(home)
  }
  return (
    <>
      <section className='card-view'>

        <div className="head">
          <h2>{homePage.Login.title}</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} action="" className='login-form'>
          <div className="form-group">
            <label htmlFor="">{homePage.Login.emailTitle}</label>
            <input type="text" name="email" id="" placeholder={homePage.Login.emailPlaceholder} {...register(
              'email',
              {
                onChange: (
                  e
                ) => {
                  handleChange(
                    e
                  )
                }
              }
            )} />
            <span
              style={{
                color: 'red'
              }}
            >
              {
                errors.email
                  ?.message
              }
            </span>
          </div>
          <div className="form-group m-0">
            <label htmlFor="">{homePage.Login.passwordTitle}</label>
            <div className='password-group'>
              <input type={
                passwordShown
                  ? 'text'
                  : 'password'
              } name="password" id="" placeholder={homePage.Login.passwordPlaceholder} {...register(
                'password',
                {
                  onChange: (
                    e
                  ) => {
                    handleChange(
                      e
                    )
                  }
                }
              )} />
              <button type='button'
              onClick={togglePasswordVisiblity}
              className={passwordShown ? 'eye show' : 'eye hidden'}
                // className='eye show'
              // className='eye hidden'
              ></button>
            </div>
            <span className='invalid' style={{color: 'red'}}>
              {errors?.password?.message}
            </span>
          </div>
          <div className="form-group forgot-group">
            <Link to={forgotpassword}>{`${homePage.Login.forgotpassword}`}?</Link>
          </div>
          <div className="form-btn-group">
            <Button commonClass="solid-red-btn form-btn" text={homePage.Login.btnLogin} />
          </div>
          <p className='redirect-link'>{homePage.Login.accountTitle} <Link to={signup}>{homePage.Login.linkSignup}</Link></p>
        </form>
      </section>
    </>
  )
}

export default Login