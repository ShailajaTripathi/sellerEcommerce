import React, { useEffect, useState } from 'react'
import InventeryData from '../InventeryData/InventeryData'

const InnerTabs = ({Active , Tabs}) => {
  const [ActiveData,setActiveData] = useState(Tabs[0].Tab_Name)
useEffect(()=> {
console.log("mili",ActiveData)
},[ActiveData])
  return (
    <>
      <ul className='site-inner-tab-list'>
      {console.log("sub inner tabsssss",Active)}
        {Tabs?.map (( TabList,i) => {
          return <>        
            <li key={i} ><button className={ `inner-btn ${ActiveData === TabList.Tab_Name  ? 'active' : ''}`}  onClick={() => {setActiveData(TabList.Tab_Name)
            // console.log("fromparent",fromParent,TabList.Tab_Name )
            console.log(TabList.Tab_Name,"TabList.Tab_Name+++++++++");
            }}>{TabList.Tab_Name} {TabList.count && <span >({TabList.count})</span>} </button></li>
            </>
          })}
      </ul>
      <InventeryData Active={Active} innerTab={ActiveData}/>
    </>
  )
}

export default InnerTabs