import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LOGO from "../../assets/images/logo.svg"
import { home,login,signup } from '../../config/routingConsts';

const Header = ({onClickEvent, hideSubMenu}) => {
  const {t} = useTranslation()
  const {pathname} =  useLocation()
  const common = t('common', { returnObjects: true })
  const {state} = useLocation()
  const sellerData = ["gstdetails","pickupaddress","bankdetails","supplierdetails"]

  const ToggleOn = () =>{
    document.body.classList.toggle('mobile-open')
  }
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     setScroll(window.scrollY > 150);
  //   });
  // }, []);
  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     setScroll(window.scrollY > 150);
  //   });
  // }, []);
  return (
    <header className={!hideSubMenu ? 'site-header' : "site-header login-header" }>
      <div className="header-top">
        <div className="container">
          <div className="header-inner">
            <Link className={`logo ${sellerData.includes(state)  ? "eventNone" : ''}` } to = {home}><img src={LOGO} alt="logo"/></Link>
              {/* {pathname ==="/" &&  
              <> */}
              {
                !hideSubMenu&&<>
                <div className="btn-group">
                <NavLink to={login} className='border-white-btn'>{`${t('common.login')}`}</NavLink>
                <NavLink to={signup} className='solid-red-btn'>{`${t('common.StartSelling')}`}</NavLink>
                <div className="mobile-toggle" onClick={ToggleOn}><i></i></div>
                </div>
                </>
              }
              
              {/* </>
              } */}
        </div>
      </div>
      </div>
      {/* {pathname ==="/" &&  */}
      <>
      {!hideSubMenu && <><div className="header-bottom">
      <div className="container"> 
        <ul className='site-menu'>
          <li><Link onClick={() => onClickEvent(0)} className='menu-link'>{common.SellOnline}</Link></li>
          <li><Link onClick={() => onClickEvent(5)} className='menu-link'>{common.Howitworks}</Link></li>
          <li><Link onClick={() => onClickEvent(2)} className='menu-link'>{common?.["Pricing&Commission"]}</Link></li>
          <li><Link onClick={() => onClickEvent(3)} className='menu-link'>{common?.['Shipping&Returns']}</Link></li>
          <li><Link onClick={() => onClickEvent(7)} className='menu-link'>{common.GrowBusiness}</Link></li>
        </ul>
      </div>
    </div>
    </>
    }
   
    </>
      {/* } */}
      
    </header>
  )
}

export default Header