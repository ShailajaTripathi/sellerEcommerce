import React, { useEffect, useState } from 'react'
import SupportData from './components/SupportData'

const Support = () => {
  const [Active, setActive] = useState(JSON.parse(sessionStorage.getItem ("SupportTabs")) || 0)
  const [Tabdata,setTabData] = useState(
  [
    { 
      Tab_Name: "Catalogs & Pricing",
    },
    {
      Tab_Name: "Orders & Delivery",
    },
    {
      Tab_Name: "Returns & Exchange",
    }
  ])
  useEffect(()=> {
    sessionStorage.setItem("SupportTabs",JSON.stringify(Active))
    return () => {
      sessionStorage.removeItem("SupportTabs")
    }
  },[Active])
  return (
    <div className="support-body">
      <div className="sidebar-tab-main">
        <ul className='sidebar-tab desktop'>
          {Tabdata.map ((TabdataList,i)=> {
            return (
            
              <>
                <li key={i}><button  className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(i)}>{TabdataList.Tab_Name}</button></li>
              </>
            )
          })}
        </ul>

        <ul className='sidebar-tab mobile'>
        {Tabdata.map ((TabdataList,i)=> {
          return (
            
            <>
            {
              console.log( Active === i," Active === i")
            }
              <li key={i}><button className={ Active === i ? 'tab-btn active' : "tab-btn"  }  onClick={() =>{
                if (Active===i) {
                  setActive(null)
                }else{
                  setActive(i)
                }
                // setActive(i)
                }}>{TabdataList.Tab_Name}</button></li>

                  {Active === i && <> 
                    <li className='tab-body'><SupportData/></li>
                 </> }
            </>
          )
        })}
        </ul>
      </div>
    </div>
  )
}

export default Support