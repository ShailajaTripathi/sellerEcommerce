import React, { useEffect, useState } from 'react'
import ProfileSettings from './components/ProfileSettings'
import BankAccountInfo from './components/BankAccountInfo'
import ShippingAndReturn from './components/ShippingAndReturn'
import GSTSettings from './components/GSTSettings'
import ChangePassword from './components/ChangePassword'
import LegalAndPolicies from './components/LegalAndPolicies'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { SELLER_VIEWPROFILE } from '../../../Redux-Toolkit/Actions/sagaActions'

const Settings = () => {
  // API fetch for viewProfile
  const dispatch = useDispatch()
  const {pathname} = useLocation()
  useEffect (()=> {
      dispatch({type : SELLER_VIEWPROFILE})
  },[])
  const [Active, setActive] = useState(JSON.parse(sessionStorage.getItem("SettingTabkey")) || 0)
  const [Tabdata,setTabData] = useState(
  [
    { 
      Tab_Name: "Profile Settings",
      innerData :<li className='tab-body'><ProfileSettings/></li>
    },
    {
      Tab_Name: "Bank Account Info",
      innerData :<li className='tab-body'><BankAccountInfo/></li>
    },
    {
      Tab_Name: "Shipping and Return",
      innerData :<li className='tab-body'><ShippingAndReturn/></li>
    },
    {
      Tab_Name: "GST Settings",
      innerData :<li className='tab-body'><GSTSettings/></li>
    },
    {
      Tab_Name: "Change Password",
      innerData :<li className='tab-body'><ChangePassword/></li>
    },
    {
      Tab_Name: "Legal and Policies",
      innerData :<li className='tab-body'><LegalAndPolicies/></li>
    }
  ])
  useEffect (()=> {
    sessionStorage.setItem("SettingTabkey", JSON.stringify(Active))
    return () => {
      sessionStorage.removeItem("SettingTabkey")
    }
  },[Active])
  return (
    <div className='settings-body'>
      <div className='sidebar-tab-main'>
        <ul className='sidebar-tab desktop'>
            {Tabdata.map ((TabdataList,i)=> {
              return (
                  <li key={i}><button  className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(i)}>{TabdataList.Tab_Name}</button></li>
              )
            })}
          </ul>

          <ul className='sidebar-tab mobile'>
          {Tabdata.map ((TabdataList,i)=> {
            {console.log( Active === i," Active === i")}
            return (
              <React.Fragment key={i}>
              <li><button className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() =>{
                if (Active===i) {
                  setActive(null)
                }else{
                  setActive(i)
                }
                // setActive(i)
                }}>{TabdataList.Tab_Name}</button></li>
              { Active === i && TabdataList.innerData}
              </React.Fragment>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Settings