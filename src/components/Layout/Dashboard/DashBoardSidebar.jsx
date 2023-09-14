import React,{useEffect, useRef,useState} from 'react'
import {Link, NavLink, useLocation, useParams} from 'react-router-dom'
import { catalogsupload, home, inventory, newsboard, ordermanagement, payment, returnorder, settings, support } from '../../../config/routingConsts'

import Logo from '../../../assets/images/logo.svg'
import CollapseLogo from '../../../assets/images/collapse-logo.svg'

import {ReactComponent as IconDashboard} from '../../../assets/images/icons/icon-dashboard.svg'
import {ReactComponent as IconOrderManagement} from '../../../assets/images/icons/icon-order-management.svg'
import {ReactComponent as IconReturnOrders} from '../../../assets/images/icons/icon-return-orders.svg'
import {ReactComponent as IconInventory} from '../../../assets/images/icons/icon-inventory.svg'
import {ReactComponent as IconPayments} from '../../../assets/images/icons/icon-payments.svg'
import {ReactComponent as IconCatalogsUpload} from '../../../assets/images/icons/icon-catalogs-upload.svg'
import {ReactComponent as IconNewsBoard} from '../../../assets/images/icons/icon-news-board.svg'
import {ReactComponent as IconSupport} from '../../../assets/images/icons/icon-support.svg'
import {ReactComponent as IconSettings} from '../../../assets/images/icons/icon-settings.svg'
import {ReactComponent as IconMenuClose} from '../../../assets/images/icons/icon-menu-close.svg'
import { useTranslation } from 'react-i18next'

const DashBoardSidebar = ({childValue,setChildValue}) => {
  const { t } = useTranslation()
  const sideMenu = t('common', { returnObjects: true })
  const handleToggle = () => {
    setChildValue(true)
  }
  const refdata= useRef()
  useEffect(() => {
  refdata.current.addEventListener("click",(e)=>{
    if (e.view.outerWidth<=991 && e.target.tagName==="A") {
      setChildValue(true)
    } 
  })
  }, [])
  const {pathname , state} = useLocation()
  console.log(pathname,state,"pppppppppp")
  const {id} = useParams()
  return (
    <div className={`admin-sidebar ${childValue  === false ? 'active' : ''}`}>
      <div className="head">
        <Link to={home} className="logo"><img src={Logo} alt="logo" /><img src={CollapseLogo} alt="collapse-logo" className='collapse-logo' /></Link>
        {/* <div class="collapse-toggle active" onClick={handleToggle}><i></i></div> */}
        <div className='mobile-menu-close' onClick={handleToggle}><IconMenuClose/></div>
      </div>
      <ul className='sidebar-menu' ref={refdata} >
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.Dashboard}
            to={home} state="Dashboard">
            <IconDashboard/>{sideMenu.Dashboard}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.OrderManagement}
            to={ordermanagement} state = "Order Management"><IconOrderManagement/>{sideMenu.OrderManagement}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.ReturnOrders}
            to={returnorder} state = "Return Orders"><IconReturnOrders/>{sideMenu.ReturnOrders}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.Inventory}
           to={inventory} state = "Inventory" ><IconInventory/>{sideMenu.Inventory}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.Payments}
           to={payment} state = "Payments" ><IconPayments/>{sideMenu.Payments}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.CatalogsUpload}
            to={catalogsupload} state = "Catalogs Upload" className={((pathname === "/addcatalog") || (pathname === `/viewcatalog/${id}`)) && "active"}><IconCatalogsUpload/>{sideMenu.CatalogsUpload}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.NewsBoard}
           to={newsboard} state = "News Board" ><IconNewsBoard/>{sideMenu.NewsBoard}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.Support}
           to={support} state = "Support" ><IconSupport/>{sideMenu.Support}
          </NavLink>
        </li>
        <li>
          <NavLink
            data-toggle="tooltip"
            data-placement="top"
            title={sideMenu.Settings}
           to={settings} state = "Settings" ><IconSettings/>{sideMenu.Settings}
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default DashBoardSidebar