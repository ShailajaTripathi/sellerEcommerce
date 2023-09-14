import React from "react";
import Button from "../../../../components/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { pickupaddress } from "../../../../config/routingConsts";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReactComponent as IconRight } from "../../../../assets/images/icons/icon-right-green.svg";
import { useDispatch, useSelector } from "react-redux";
import { sellerProtectedData } from "../../../../Redux-Toolkit/Slices/authSlice";
import { SELLER_GSTDETAILS } from "../../../../Redux-Toolkit/Actions/sagaActions";
const GstDetails = () => {
  const { t } = useTranslation();
  const homePage = t("home", { returnObjects: true });

  const navigate = useNavigate();
  const validationSchema = yup.object({
    gst: yup.string().required("Please Enter GST Number Only").min(15,"GST Number Length Minimum 15"),
  });
  const { step, data } = useSelector((action) => action.authSlice);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({ resolver: yupResolver(validationSchema), mode: "all" });
  const exceptThisSymbols = ["/", "+", "-", ".","*"]

  const onSubmit = (data) => {
    dispatch({
      type: SELLER_GSTDETAILS,
      payload: {
        gstNo: data,
      },
    });
  };

  const handleContinue = () => {
    dispatch(sellerProtectedData(step));
  };

  return (
    <section className="card-view sign-up-steps">
      <div className="head">
        <h2>{homePage.GstDetails.title}</h2>
      </div>
      <div className="body-content">
        <form action="" className="steps-form">
          <div className="form-group">
            <label htmlFor="">{homePage.GstDetails.inutGstTitle}</label>
            <div className="verify-group">
              <input
                type="text"
                name=""
                maxlength="15"
                id=""
                {...register("gst")}
                onKeyDown={e => exceptThisSymbols.includes(e.key) && e.preventDefault()}
              />
              <button
                type="button"
                className={
                  data.length !== 0
                    ? "solid-black-btn verify"
                    : "solid-black-btn"
                }
                onClick={handleSubmit(onSubmit)}
              >
                <IconRight />
                {homePage?.GstDetails?.btnGst}
              </button>
            </div>
            {errors?.gst?.message && (
              <span style={{ color: "red" }}>{errors?.gst?.message}</span>
            )}
          </div>
          {data.length !== 0 && (
            <>
              <ul className="gst-detail-list">
                <li>
                  <span>State</span>{" "}
                  <span>{data?.data?.gst?.pradr?.addr?.stcd}</span>
                </li>
                <li>
                  <span>Registration Type</span>{" "}
                  <span>{data?.data?.gst?.dty}</span>
                </li>
                <li>
                  <span>Assessee of other territory?</span> <span>no</span>
                </li>
                <li>
                  <span>GSTIN/UIN</span> <span>{data?.data?.gst?.gstin}</span>
                </li>
                <li>
                  <span>Application From</span>{" "}
                  <span>{data?.data?.gst?.rgdt}</span>
                </li>
                <li>
                  <span>Periodicity of GSTR1</span> <span>Monthly</span>
                </li>
                <li>
                  <span>E-Way Bill Application?</span> <span>Yes</span>
                </li>
                <li>
                  <span>E-Way Bill Application Form</span>{" "}
                  <span>1-April-2021</span>
                </li>
                <li>
                  <span>E-Way Bill Threshold</span> <span>50,000</span>
                </li>
              </ul>
              <Button
                type="button"
                commonClass="solid-red-btn"
                text={homePage.GstDetails.btnGst2}
                onClick={handleContinue}
              />
            </>
          )}
        </form>
      </div>
    </section>
  );
};

export default GstDetails;
