import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as BackIcon } from '../../assets/images/icons/icon-back-red.svg'
import { login,resetpassword } from '../../config/routingConsts'
import Button from '../../components/Button/Button'
import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { SELLER_FORGOTPASSWORD } from '../../Redux-Toolkit/Actions/sagaActions'


const ForgotPassword = () => {
  const {t} = useTranslation()
  const home = t('home',{returnObjects:true})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const onSubmit = (data)=> {
    dispatch({type : SELLER_FORGOTPASSWORD, payload :{email : data.email} })
    // navigate(resetpassword)
    reset()
  }
  return (
    <section className='card-view'>
      <div className="head">
        <h2>{home.ForgotPassword.title}</h2>
        <Link to={login} className='back'><BackIcon/>{home.backBtn}</Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} action="" className='login-form' >
        <div className="form-group">
          <label htmlFor="">{home.ForgotPassword.emailTitle}</label>
          <input type="text" name="email" id="" placeholder={home.ForgotPassword.emailPlaceholder}     
           {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Please Enter Valid Email",
                },
                required: {
                  value: true,
                  message: "Please Enter Email",
                },
              })}
            />
            {errors.email?.type === "required" && (
              <span style={{ color: "red" }}> {errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span style={{ color: "red" }}> {errors.email.message}</span>
            )}
        </div>
        <div className="form-btn-group">
          <Button commonClass="solid-red-btn form-btn" text={home.ForgotPassword.btnForgot}  />
        </div>
      </form>
    </section>
  )
}

export default ForgotPassword