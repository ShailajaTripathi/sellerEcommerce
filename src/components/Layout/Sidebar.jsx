import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {ReactComponent as IconGST} from '../../assets/images/icons/icon-gst-details.svg'
import {ReactComponent as IconPickupAddress} from '../../assets/images/icons/icon-pickup-address.svg'
import {ReactComponent as IconBankDetails} from '../../assets/images/icons/icon-bank-details.svg'
import {ReactComponent as IconSupplierDetails} from '../../assets/images/icons/icon-supplier-details.svg'
import { bankdetails, gstdetails, pickupaddress, supplierdetails } from "../../config/routingConsts";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { SELLER_GETSTEPS } from "../../Redux-Toolkit/Actions/sagaActions";

const Sidebar = () => {
  const { t } = useTranslation()
  const homePage = t('home', { returnObjects: true })
  const {state,pathname} = useLocation()
  const dispatch = useDispatch()
  const {authToken,isloading,steps} = useSelector((action) => action.authSlice)
  const sellerData = ["gstdetails","pickupaddress","bankdetails","supplierdetails"]
  // const[data,setData] = useState(JSON.parse(localStorage.getItem("steps") ?? JSON.stringify([])))
  // useEffect(()=> {
  //   if(state){
  //     setData((e)=>{
  //       if (e.includes(state)) {
  //         return e
  //       }else{
  //         return [...e,state]
  //       }
  //     })
  //   }
  // },[state])
//  useEffect(() => {
//   localStorage.setItem("steps",JSON.stringify(data))
  
//   return ()=> {
//     localStorage.setItem("steps",JSON.stringify([]))
//   }
//  }, [data])
  return sellerData.includes(state)? (
    <>
    <section className="selling-sidebar">
          <h2>    {homePage.Sidebar.title}</h2>
          <ul className="step-list">
          {/* completed */}
          {/* "active" */}
            {/* <li className={pathname === gstdetails ? "active" :data.includes("GstDetails")?"completed": ""}> */}
            <li className= {steps === 1 ? "active" : steps > 1  ?  "completed" : "" } >
              <span><IconGST/></span>
              {homePage.Sidebar.Tab1}
            </li>
            {/* <li className= {pathname === pickupaddress ? "active" :data.includes("pickupaddress")?"completed": ""}> */}
            <li className= {steps === 2  ? "active" : steps > 2 ?  "completed" :  ""}>
              <span><IconPickupAddress/></span>
              {homePage.Sidebar.Tab2}
            </li>
            {/* <li className= {pathname === bankdetails ? "active" :data.includes("bankdetails")?"completed": ""}> */}
            <li className=  {steps === 3  ? "active" : steps > 3 ?  "completed" : ""} >
              <span><IconBankDetails/></span>
              {homePage.Sidebar.Tab3}
            </li>
            {/* <li className= {pathname === supplierdetails ? "active" :data.includes("supplierdetails")?"completed": ""}> */}
            <li className= {steps === 4  ? "active" : steps > 4 ?  "completed" : ""}>
              <span><IconSupplierDetails/></span>
              {homePage.Sidebar.Tab4}
            </li>
          </ul>
      </section>
      <Outlet /> 
    </>
  ):<Navigate to="/"/>
};

export default Sidebar;
