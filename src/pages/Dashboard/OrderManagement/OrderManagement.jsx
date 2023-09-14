import React, { useState } from 'react'
import OnHold from './components/OnHold/OnHold';
import Pending from './components/Pending/Pending';
import ToBeDispatch from './components/ToBeDispatch/ToBeDispatch';
import ReadyToShip from './components/ReadyToShip/ReadyToShip';
import Shipped from './components/Shipped/Shipped';
import Cancelled from './components/Cancelled/Cancelled';



const OrderManagement = () => {
  const [Active, setActive] = useState(0)
 const [Tabdata,setTabData] = useState(
  [
    {
      Tab_Name: "On Hold",
      count:"2",
      innerData : <li className='tab-body'><OnHold id= "On Hold"/></li>
    },
    {
      Tab_Name: "Pending",
      count:"2",
      innerData :<li className='tab-body'><Pending id= "Pending"/></li>
    },
    {
      Tab_Name: "To Be Dispatch",
      count:"2",
      innerData :<li className='tab-body'><ToBeDispatch id= "To Be Dispatch"/></li>
    },
    {
      Tab_Name: "Ready to Ship",
      count:"2",
      innerData :<li className='tab-body'><ReadyToShip id= "Ready to Ship"/></li>
    },
    {
      Tab_Name: "Shipped",
      innerData :<li className='tab-body'><Shipped id= "Shipped"/></li>
    },
    {
      Tab_Name: "Cancelled",
      innerData :<li className='tab-body'><Cancelled id= "Cancelled"/></li>
    }
  ])

  return (
    <div className="order-management-body">
      <ul className='site-tab-list desktop'>
        {Tabdata.map ((TabdataList,i)=> {
          return (
           
            <>
              <li key={i}><button  className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(i)}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
            </>
          )
        })}
      </ul>

      <ul className='site-tab-list mobile'>
      {Tabdata.map ((TabdataList,i)=> {
        return (
          
          <>
            <li key={i}><button className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() =>{
              if (Active===i) {
                setActive(null)
              }else{
                setActive(i)
              }
              // setActive(i)
              }}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
            { Active === i && TabdataList.innerData}
          </>
        )
      })}
      </ul>
    </div>
  )
}

export default OrderManagement