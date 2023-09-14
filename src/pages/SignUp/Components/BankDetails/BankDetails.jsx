import React, { useEffect, useState } from "react";
import Button from '../../../../components/Button'
import { Row, Col } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ReactComponent as IconRightGreen } from '../../../../assets/images/icons/icon-right-green.svg'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from "react-hook-form";
import { supplierdetails } from "../../../../config/routingConsts";
import { useTranslation } from "react-i18next";
import { sellerProtectedData } from "../../../../Redux-Toolkit/Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { SELLER_BANKDETAILS, SELLER_VIEWPROFILE } from "../../../../Redux-Toolkit/Actions/sagaActions";
import Loader from "../../../../components/Loader/Loader";

const BankDetails = ({ setChangeText:setChange, isDispatch }) => {
  const { t } = useTranslation()
  const homePage = t('home', { returnObjects: true })
  let [changeText, setChangeText] = useState(true);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { step, bankData, isloading,error } = useSelector((action) => action.authSlice)
  const onSubmit = (data) => {
    dispatch({
      type: SELLER_BANKDETAILS, payload: {
        "accountNo": data.accountNumber,
        "ifscCode": data.ifscCode,},
        callback : ()=> {setChangeText(!changeText)}
    })
    
  };


  const validationSchema = yup.object({
    accountNumber: yup.string().required('Please Enter Account Number'),
    varifyAccountNumber: yup.string().required('Please Enter Account Number')
      .oneOf([yup.ref('accountNumber')], 'Account Number does not match'),
    ifscCode: yup.string().required('Please Enter IFSC code'),
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' })
  return (
    <section className='card-view sign-up-steps'>
      <div className="head">
        <h2>{homePage.BankDetails.title}</h2>
      </div>
      {isloading && <Loader /> } 
      <div className="body-content pickup-address-content bank-details-content">
        <form onSubmit={handleSubmit(onSubmit)} action="" className='step-form'>
          {changeText ? <>
            <div className="info-label">{homePage.BankDetails.innerTitle}</div>
            <Row>
              <Col lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">{homePage.BankDetails.accountNumberTitle}</label>
                  <input type="password"  {...register("accountNumber")} />
                  {/* value={'454353454'} */}
                  <span className='invalid' style={{ color: 'red' }}>
                    {errors.accountNumber?.message}
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="form-group">
                  <label htmlFor="">{homePage.BankDetails.accountVerifyNumberTitle}</label>
                  <input type="password" {...register("varifyAccountNumber")} />
                  {/* value={'HDFC0125258'} */}
                  <span className='invalid' style={{ color: 'red' }}>
                    {errors.varifyAccountNumber?.message}
                  </span>
                </div>
              </Col>
              <Col lg="6" md="6">
                <div className="form-group m-0">
                  <label htmlFor="">{homePage.BankDetails.IFSCTitle}</label>
                  <input type="text" {...register("ifscCode")} />
                  {/* value={'HDFC0125258'} */}
                  <span className='invalid' style={{ color: 'red' }}>
                    {errors.ifscCode?.message}
                  </span>
                </div>
              </Col>
            </Row>
            <p className='ifsc-link'>{homePage.BankDetails.rememberIFSC} <Link>{homePage.BankDetails.linkTitle}</Link></p>
            <Button commonClass="solid-red-btn" text={homePage.BankDetails.btnBankDetails} />

          </>
            :
            <>
            {console.log(bankData,"bankData")}
              <div className="info-label green"><IconRightGreen />{homePage.BankDetails.innerSuccesfulTitle}</div>
              {/* {bankData?.map((list, index) => { */}
                {/* return ( */}
                  <ul className='gst-detail-list' >
                    <li><span>Bank Holder Name</span> <span>Bhavesh  Sharma</span></li>
                    <li><span>Bank Account Number</span> <span>{bankData?.accountNo}</span></li>
                    <li><span>Bank Type</span> <span>Saving Account</span></li>
                    <li><span>IFSC Code</span> <span>{bankData?.ifscCode}</span></li>
                    <li><span>Branch Name</span> <span>Ahmedabad</span></li>
                  </ul>
                {/* ) */}
              {/* })} */}
              <div className="form-btn-group">
                <Button type="button" commonClass="border-red-btn" text={homePage.BankDetails.btninnerBankDetails} onClick={() => setChangeText(true)} />
                <Button type="button" commonClass="solid-red-btn" text={homePage.BankDetails.btninnerBankDetails2} onClick={() => {
                  if (isDispatch) {
                    dispatch(sellerProtectedData(step))
                  }else{
                    setChange(true)
                    dispatch({type : SELLER_VIEWPROFILE})
                  }
                }} />
              </div>
            </>
          }
        </form>
      </div>
    </section>
  )
}

export default BankDetails