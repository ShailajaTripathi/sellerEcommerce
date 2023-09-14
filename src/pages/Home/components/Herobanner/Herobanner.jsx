

import React from 'react'
import { useTranslation } from 'react-i18next'
import {Container} from 'react-bootstrap'  
import BannerImage from '../../../../assets/images/banner-image.webp'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../../../config/routingConsts'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

const Herobanner = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const validationSchema = Yup.object({
      phoneNumber : Yup.string().max(10,"Phone number should be 0 to 9 number long.").required("please enter mobile number")
    })
    
    const [numberInput,setNumberInput] = useState('')
    const {handleSubmit,reset,formState:{errors},register} = useForm({resolver:yupResolver(validationSchema),mode:"all"})
    const numberCallingFunction = (e) =>{
      sessionStorage.setItem('phoneNumber',numberInput)
      navigate(signup)
    }
    
  return (
    <>
    <section className='banner'>
        <div className="banner-left">
          <Container>
            <h1 dangerouslySetInnerHTML={{__html : `${t('home.banner.heading')}` }}></h1>
              <p>{`${t('home.banner.description')}`}</p>
              <form action="" className='banner-form' onSubmit={handleSubmit(numberCallingFunction)}>
                  <div className="form-group country-group">
                    <span className='countryCode'>{`${t('home.banner.countryCode')}`}</span>
                    <input name='phoneNumber' type="number" placeholder={`${t('home.banner.moPlaceholder')}`} {...register('phoneNumber')} onChange={(e)=>{setNumberInput(e.target.value)}}/>
                    <span style={{color: 'red'}}>{errors.phoneNumber?.message}</span>
                    <button type='submit' className='solid-red-btn'>{`${t('home.banner.StartSelling')}`}</button>
                  </div>
              </form>
          </Container>
        </div>
        <div className="banner-right">
          <img src={BannerImage} alt="banner-click" />
        </div>
      </section>
    </>
  )
}

export default Herobanner