import React, { useState, useRef } from 'react'
import { Dropdown } from 'react-bootstrap'
import UserProfile from '../../../assets/images/user-profile.png'
import { ReactComponent as IconStore } from '../../../assets/images/icons/icon-store.svg'
import { ReactComponent as IconCollapseToggle } from '../../../assets/images/icons/icon-collapse-toggle.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { SELLER_LOGOUT } from '../../../Redux-Toolkit/Actions/sagaActions'
import { settings } from '../../../config/routingConsts'

const DashBoardHeader = ({ setChildValue, childValue }) => {
    const { t } = useTranslation()
    const sideMenu = t('common', { returnObjects: true })
    const { seller } = useSelector((action) => action.authSlice)
    console.log(seller,"seller");
    const { state } = useLocation()
    const navigate = useNavigate()
    const handleToggle = () => {
        setChildValue(!childValue)
    }
    const dispatch = useDispatch()
    return (
        <div className="admin-header">
            <div className="header-left">
                {/* <div class={`collapse-toggle ${childValue === false ? 'active' : ''}`} onClick={handleToggle}><i></i></div> */}
                <div className="collapse-toggle-icon" onClick={handleToggle}>
                    <IconCollapseToggle />
                </div>
                <h1>{state ?? 'Dashboard'}</h1>
            </div>
            <div className="header-right">
                <Dropdown>
                    <Dropdown.Toggle variant=" primary" id="dropdown-basic">
                        <img src={UserProfile} alt="user-profile" />
                        Mark Jonsan
                        {/* {seller.fullName} */}
                        {/* Hiren Patel */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <div className="store-head">
                            <span>
                                <IconStore />
                            </span>
                            <div className="detail">
                                <p>Store Name</p>
                                <h3>Moon Light Store</h3>
                            </div>
                        </div>
                        <Dropdown.Item onClick={()=>{navigate(settings)}}>
                            {sideMenu.ProfileSettings}
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={() => {
                                dispatch({ type: SELLER_LOGOUT })
                            }}
                        >
                            {sideMenu.Logout}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    )
}

export default DashBoardHeader
