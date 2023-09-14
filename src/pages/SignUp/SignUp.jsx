import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  forgotpassword,
  gstdetails,
  home,
  signup,
} from "../../config/routingConsts";
import { Row, Col } from "react-bootstrap";
import Button from "../../components/Button/Button";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  SELLER_REGISTER,
  SELLER_VERIFICATION,
} from "../../Redux-Toolkit/Actions/sagaActions";
import Spinner from "react-bootstrap/Spinner";
import { sellerSignUpData } from "../../Redux-Toolkit/Slices/authSlice";
import { useEffect } from "react";

const SignUp = () => {
  const { t } = useTranslation();
  const homePage = t("home", { returnObjects: true });
  const dispatch = useDispatch();
  const formSchema = Yup.object().shape({
    otp: Yup.string().required("Please Enter OTP"),
    email: Yup.string().email("Enter Valid Email Address").required("Please Enter Email Address"),
    newPassword: Yup.string()
      .required("Please Enter New Password")
      .min(6, "Password must be 6 to 30 characters long")
      .max(30, "Password must be 6 to 30 characters long"),
    confirmPassword: Yup.string()
      .required("Please Enter Confirm Password")
      .min(6, "Confirm Password must be at 6 char long")
      // .max(15,"Password must be between 6 and 15 characters long ")
      .oneOf([Yup.ref("newPassword")], "Password does not match"),
    agree: Yup.boolean().oneOf([true], "Please Check Agree"),
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(formSchema), mode: "all" });
  const { data } = useSelector((action) => action.authSlice);
  const [passwordShown, setPasswordShown] = useState([]);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [getMobileNumber, setGetMobileNumber] = useState(
    sessionStorage.getItem("phoneNumber")
  );
  const exceptThisSymbols = ["e", "E", "+", "-", "."];
  const handleClick = () => {
    dispatch({
      type: SELLER_VERIFICATION,
      payload: {
        phoneNo: watch("inputName"),
        countryCode: "+91",
      },
    });
    setPhoneNumber({
      phoneNo: watch("inputName"),
      countryCode: "+91",
    });
    sessionStorage.removeItem("phoneNumber");
  };
  const togglePasswordVisiblity = (e) => {
    setPasswordShown((ert) => {
      if (ert.includes(e)) {
        return ert.filter((ttt) => {
          return ttt !== e;
        });
      } else {
        return [...ert, e];
      }
    });
  };
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data, "data");
    dispatch({
      type: SELLER_REGISTER,
      payload: {
        email: data.email,
        password: data.newPassword,
        ...phoneNumber,
        otp: data.otp,
      },
    });
    // dispatch ((sellerSignUpData({payload : {
    //   email : data.email,
    //     password : data.newPassword,
    //    ...phoneNumber,
    //       otp : data.otp,
    //       isverified : 1,
    // } })))

    // navigate(gstdetails)
  };

  return (
    <section className="card-view sign-up-view">
      <form onSubmit={handleSubmit(onSubmit)} action="" className="login-form">
        <div className="top">
          <div className="head">
            <h2
              dangerouslySetInnerHTML={{ __html: homePage.SignUp.title }}
            ></h2>
          </div>
          <div className="form-group my-0">
            <label htmlFor="">{homePage.SignUp.mobileNumber}</label>
            <div className="form-group country-group m-0">
              <span className="countryCode">+91</span>
              {/* {console.log("watch('inputName')", watch('inputName'))} */}
              <input
                type="text"
                placeholder={homePage.SignUp.mobilenoPlaceholder}
                minlength="4"
                maxlength="10"
                {...register("inputName")}
                defaultValue={getMobileNumber}
                onKeyDown={(e) => {
                  if (
                      ![
                          'ArrowLeft',
                          'ArrowRight',
                          'Delete',
                          'Backspace',
                          ...Array.from(
                              { length: 10 },
                              (_, i) =>
                                  i.toString()
                          )
                      ].includes(e.key)
                  ) {
                      e.preventDefault()
                  }
              }}
              />
              <Button
                type="button"
                commonClass="solid-black-btn otp-btn"
                onClick={handleClick}
                text={"Send OTP"}
                disabled={
                  watch("inputName")?.length >= 10 || getMobileNumber
                    ? false
                    : true
                }
              />
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label htmlFor="">{homePage.SignUp.otpTitle} </label>
                <input type="text" name="" id="" placeholder={homePage.SignUp.otpPlaceholder}  {...register("otp")} className={`${errors.otp?.message && 'error'}`} />
                <span style={{ color: 'red' }}>
                {errors.otp?.message}
              </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label htmlFor="">{homePage.SignUp.emailTitle}</label>
                <input
                  type="text"
                  name="email"
                  id=""
                  placeholder={homePage.SignUp.emailPlaceholder}
                  {...register("email")}
                />
                <span style={{ color: "red" }}>{errors.email?.message}</span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label htmlFor="">{homePage.SignUp.passwordTitle}</label>
                <div className="password-group">
                  <input
                    type={
                      passwordShown.includes("newPassword")
                        ? "text"
                        : "password"
                    }
                    name="newPassword"
                    id=""
                    placeholder={homePage.SignUp.passwordPlaceholder}
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
                  ></button>
                </div>
                <span style={{ color: "red" }}>
                  {errors.newPassword?.message}
                </span>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="form-group">
                <label htmlFor="">{homePage.SignUp.ConfirmPassTitle}</label>
                <div className="password-group">
                  <input
                    type={
                      passwordShown.includes("confirmPassword")
                        ? "text"
                        : "password"
                    }
                    name="confirmPassword"
                    id=""
                    placeholder={homePage.SignUp.ConfirmPassPlaceholder}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      togglePasswordVisiblity("confirmPassword");
                    }}
                    className={
                      passwordShown.includes("confirmPassword")
                        ? "eye show"
                        : "eye hidden"
                    }
                  ></button>
                </div>
                <span style={{ color: "red" }}>
                  {errors.confirmPassword?.message}
                </span>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="form-group">
                <p className="policy-link">
                  <input
                    type="checkbox"
                    name="agree"
                    id=""
                    {...register("agree")}
                  />{" "}
                  I accept all the <Link>Terms & Condition </Link> and{" "}
                  <Link> Privacy Policy</Link>{" "}
                </p>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <Button
                commonClass="solid-red-btn otp-btn"
                text={"Create Account"}
                disabled={!watch("agree")}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
