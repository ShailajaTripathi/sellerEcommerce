import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Button from '../../../../../components/Button/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { SELLER_CHANGEPASSWORD } from '../../../../../Redux-Toolkit/Actions/sagaActions'
import Loader from '../../../../../components/Loader/Loader'

function ChangePassword() {
  const dispatch = useDispatch()
  const formSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .required('Please Enter New Password')
      .min(6, 'Password must be 6 to 30 characters long')
      .max(30, 'Password must be 6 to 30 characters long'),
    newPassword: Yup.string()
      .required('Please Enter New Password')
      .min(6, 'Password must be 6 to 30 characters long')
      .max(30, 'Password must be 6 to 30 characters long'),
    confirmPassword: Yup.string()
      .required('Please Enter Confirm Password')
      .min(6, 'Confirm Password must be at 6 char long')
      // .max(15,"Password must be between 6 and 15 characters long ")
      .oneOf([Yup.ref('newPassword')], 'Password does not match')
  })
  const { register,
    handleSubmit,
    formState: { errors },
    reset, } = useForm({ resolver: yupResolver(formSchema), mode: 'all' })

  const [passwordShown, setPasswordShown] = useState([])
  const {isloading} = useSelector((action)=> action.settingsSlice)
  const toggleVisibility = (e) => {
    setPasswordShown((pre) => {
      if (pre.includes(e)) {
        return pre.filter((index) => {
          return index !== e
        })
      } else {
        return [...pre, e]
      }
    })
  }

  const onSubmit = (data) => {
    dispatch ({type : SELLER_CHANGEPASSWORD,payload : data})
    reset()
  }

  return (
    <div class="admin-card setting-content">
      <div class="head">
        <h2>Password Details</h2>
      </div>
      {isloading && <Loader />}
      <div class="support-body-content">
        <form action="" className='profile-setting-form' onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col xxl="4" lg="6" md="6">
              <div className="form-group">
                <label htmlFor="">Current Password</label>
                <div className="password-group">
                  <input type={passwordShown.includes("oldPassword") ? "text" : "password"} {...register("oldPassword")} />
                  <button
                    type="button"
                    className={passwordShown.includes("oldPassword") ? 'eye show' : 'eye hidden'}
                    onClick={() => toggleVisibility("oldPassword")}
                  ></button>
                </div>
                <span style={{ color: 'red' }}>
                  {errors.oldPassword?.message}
                </span>
              </div>
            </Col>
            <Col xxl="4" lg="6" md="6">
              <div className="form-group">
                <label htmlFor="">New Password</label>
                <div className="password-group">
                  <input type={passwordShown.includes("newPassword") ? "text" : "password"} {...register("newPassword")} />
                  <button
                    type="button"
                    className={passwordShown.includes("newPassword") ? 'eye show' : 'eye hidden'}
                    onClick={() => toggleVisibility("newPassword")}
                  ></button>
                </div>
                <span style={{ color: 'red' }}>
                  {errors.newPassword?.message}
                </span>
              </div>
            </Col>
            <Col xxl="4" lg="6" md="6">
              <div className="form-group">
                <label htmlFor="">Confirm Password</label>
                <div className="password-group">
                  <input type={passwordShown.includes("confirmPassword") ? "text" : "password"} {...register("confirmPassword")} />
                  <button
                    type="button"
                    className={passwordShown.includes("confirmPassword") ? 'eye show' : 'eye hidden'}
                    onClick={() => toggleVisibility("confirmPassword")}
                  ></button>
                </div>
                <span style={{ color: 'red' }}>
                  {errors.confirmPassword?.message}
                </span>
              </div>
            </Col>
            <Col lg="12">
              <Button commonClass='solid-red-btn' text={'Change Password'} />
            </Col>
          </Row>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword