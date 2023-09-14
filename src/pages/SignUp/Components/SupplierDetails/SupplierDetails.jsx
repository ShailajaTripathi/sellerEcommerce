import React from 'react'
import Button from '../../../../components/Button'
import { useNavigate } from "react-router-dom";
import { successful } from "../../../../config/routingConsts";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { sellerProtectedData } from '../../../../Redux-Toolkit/Slices/authSlice';
import { SELLER_SUPPLIERDETAILS } from '../../../../Redux-Toolkit/Actions/sagaActions';

const SupplierDetails = () => {
  const { t } = useTranslation()
  const { steps } = useSelector((action) => action.authSlice)
  const homePage = t('home', { returnObjects: true })
  const validationSchema = yup.object({
    storeName: yup.string().required('Please Enter Store Name'),
    name: yup.string().required('Please Enter Your Name'),
    agree: yup.boolean().oneOf([true], 'Please Check Agree')
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onSubmit = (data) => {
    dispatch({
      type: SELLER_SUPPLIERDETAILS, payload: {
        storeName: data.storeName,
        fullName: data.name
      }
    })
    // dispatch(sellerProtectedData(steps))
    // navigate(successful,{ replace : true})
  }
  return (
    <section className='card-view sign-up-steps'>
      <div className="head">
        <h2>{homePage.SupplierDetails.title}</h2>
      </div>
      <div className="body-content pickup-address-content supplier-details-content">
        <form onSubmit={handleSubmit(onSubmit)} action="" className='steps-form'>
          <div className="info-label">{homePage.SupplierDetails.innerTitle}</div>
          <Row>
            <Col lg="6" md="6">
              <div className="form-group">
                <label htmlFor="">{homePage.SupplierDetails.storeNameTitle}</label>
                <input type="text" {...register("storeName")} />
                {/* value={'Lightbox'}  */}
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.storeName?.message}
                </span>
              </div>
            </Col>
            <Col lg="6" md="6">
              <div className="form-group">
                <label htmlFor="">{homePage.SupplierDetails.nameTitle}</label>
                <input type="text" {...register("name")} />
                {/* value={'Mark Jonsan'}  */}
                <span className='invalid' style={{ color: 'red' }}>
                  {errors.name?.message}
                </span>
              </div>
            </Col>
          </Row>
          <div className="form-group">
            <p className="policy-link"><input type="checkbox" name="agree" id="" {...register("agree")} /> {homePage.SupplierDetails.agree} <Link to="" >{homePage.SupplierDetails.agreeLink} </Link> {homePage.SupplierDetails.agree2}<Link to=""> {homePage.SupplierDetails.agreeLink2}</Link>  </p>
            <span className='invalid' style={{ color: 'red' }}>
              {errors.agree?.message}
            </span>
          </div>
          <div className='form-btn-group'>
            <Button commonClass="solid-red-btn" text={homePage.SupplierDetails.btnSupplierDetails} />
          </div>
        </form>
      </div>
    </section>
  )
}

export default SupplierDetails