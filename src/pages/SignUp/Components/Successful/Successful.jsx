import React from 'react'
import { ReactComponent as IconSuccessful } from '../../../../assets/images/icons/icon-successful.svg'
import Button from '../../../../components/Button/Button'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { home, login } from '../../../../config/routingConsts'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { SELLER_REGISTER } from '../../../../Redux-Toolkit/Actions/sagaActions'
import { sellerProtectedData } from '../../../../Redux-Toolkit/Slices/authSlice'

const Successful = ({hide}) => {
  const { t } = useTranslation()
  const homePage = t('home', { returnObjects: true })
  const navigate = useNavigate()
  const { data } = useSelector((action) => action.authSlice)
  const dispatch = useDispatch()
  const {state} = useLocation()
  const handleLogin = () => {
    dispatch(sellerProtectedData(0))
    navigate(home, { state: "dashboard", replace: true });
    // navigate("/")
  }
  return (
    <>
    {/* {hide && <> */}
{state === "successful" ? <section className='card-view successful-view'>
      <IconSuccessful />
      <h2>{homePage.Successful.title}</h2>
      <p>{homePage.Successful.description}</p>
      <Button commonClass='solid-red-btn' type="button" text={homePage.Successful.btnSuccesful} onClick={handleLogin} />
    </section> : <Navigate to={home}/> }
    
    {/* </>
    } */}
    </>
  )
}

export default Successful