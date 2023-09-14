import React,{useState} from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import DashBoardHeader from './DashBoardHeader'
import DashBoardSidebar from './DashBoardSidebar'
import { useSelector } from 'react-redux'
const DashboardLayout = () => {
    const [childValue, setChildValue] = useState(true);
     const {state} = useLocation()
     const {steps} = useSelector((action)=> action.authSlice)
    return (
        <>
        {steps === 0 && 
            <main className={`admin-main ${childValue === false ? 'active' : ''}`}>
                <DashBoardHeader childValue={childValue} setChildValue={setChildValue}/>
                <DashBoardSidebar childValue={childValue} setChildValue={setChildValue}/>
                <div className='admin-content'>
                    <h1 className='title-mobile-only'>{state ?? "Dashboard"}</h1>
                    <Outlet />
                </div>
            </main> }
        </>
    )
}

export default DashboardLayout
