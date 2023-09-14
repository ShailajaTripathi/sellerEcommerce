import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ReactComponent as BackIcon } from "../../assets/images/icons/icon-back-red.svg";
import { login, resetpassword } from "../../config/routingConsts";
import Button from "../../components/Button/Button";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SELLER_RESETPASSWORD } from "../../Redux-Toolkit/Actions/sagaActions";
import { useDispatch } from "react-redux";

const ResetPassword = () => {
  const { t } = useTranslation();
  const home = t("home", { returnObjects: true });
  const {token} = useParams()
  // document.cookie = `authToken=${token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  // localStorage.setItem("authToken",JSON.stringify(token || `[]`))
  const dispatch = useDispatch()
  console.log(token,"tkn");
  const navigate = useNavigate();
  const formSchema = Yup.object().shape({
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(formSchema), mode: 'all' });

  const [passwordShown, setPasswordShown] = useState([]);
  const togglePasswordVisiblity = (e) => {
    setPasswordShown((ert) => {
      if (ert.includes(e)) {
        return ert.filter((ttt) => {
          return ttt !== e
        });
      } else {
        return [...ert, e];
      }
    });
  };
  const onSubmit = (e) => {
    // navigate(login)
    // console.log(e,"3333");
            // localStorage.removeItem('authToken')
    dispatch({type:SELLER_RESETPASSWORD,payload:{token:token,data:e},callback:()=>{
      navigate(login)
      // alert("callback")
      // localStorage.clear(')
      // localStorage.removeItem('authToken')
    }})
    // alert(e)
    // reset()
  }
  return (
    <section className="card-view">
      <div className="head">
        <h2>{home.ResetPassword.title} </h2>
        <Link to={login} className="back">
          <BackIcon />
          {home.backBtn}
        </Link>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <div className="form-group">
          <label htmlFor="">{home.ResetPassword.passwordTitle}</label>
          <div className="password-group">
            <input
              // type='text'
              type={passwordShown.includes("newPassword") ? "text" : "password"}
              name="newPassword"
              id=""
              placeholder={home.ResetPassword.passwordPlaceholder}
              {...register("newPassword")}
            />
            <button
              type="button"
              onClick={(e) => {
                togglePasswordVisiblity("newPassword");
              }}
              className={
                passwordShown.includes("newPassword")
                  ? "eye show"
                  : "eye hidden"
              }
            // className='eye hidden'
            ></button>

          </div>
          <span style={{ color: 'red' }}>
            {errors.newPassword?.message}
          </span>

        </div>
        <div className="form-group">
          <label htmlFor="">{home.ResetPassword.ConfirmPassTitle}</label>
          <div className="password-group">
            <input
              // type="text"
              type={
                passwordShown.includes("confirmPassword") ? "text" : "password"
              }
              name="confirmPassword"
              id=""
              placeholder={home.ResetPassword.ConfirmPassPlaceholder}
              {...register('confirmPassword')}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisiblity("confirmPassword")}
              className={passwordShown.includes(
                'confirmPassword'
              ) ? 'eye show' : 'eye hidden'}
            ></button>

          </div>
          <span style={{ color: 'red' }}>
            {errors.confirmPassword?.message}
          </span>
        </div>
        <div className="form-btn-group">
          <Button
            type="submit"
            commonClass="solid-red-btn form-btn"
            text={home.ResetPassword.btnReset}
          />
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;
