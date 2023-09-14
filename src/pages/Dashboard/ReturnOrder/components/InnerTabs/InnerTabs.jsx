import React, { useState } from 'react'
import ReturnData from '../ReturnData/ReturnData'
import FilterModal from '../../../../../components/FilterModal/FilterModal'

const InnerTabs = ({Active:fromParent}) => {
    const [Active,setActive] = useState("Delivered")
    const [Tabdata, setTabData] = useState([
        {
            Tab_Name: "Delivered",
            count: "3079",
        },
        {
            Tab_Name: "Lost",
            count: "16",
        }
    ])

  return (
  <>
    <div className='tab-left'>
        <ul className='site-inner-tab-list'>
            {Tabdata?.map (( TabName,i) => {
            return <>
            {console.log("helooo",Active === TabName.Tab_Name  )}
            
                <li key={i} ><button className={ `inner-btn ${Active === TabName.Tab_Name  ? 'active' : ''}`}  onClick={() => {setActive(TabName.Tab_Name)
            console.log("fromparent",fromParent,TabName.Tab_Name )
                }}>{TabName.Tab_Name} {TabName.count && <span >({TabName.count})</span>} </button></li>
            
            </>
            })}
        </ul>
        <ReturnData/>
    </div>
    <div className='tab-right'>
        <FilterModal id={1}/>
    </div>
    {/* <ul className='site-tab-list desktop'>
                    {Tabdata.map ((TabdataList,i)=> {
                    return (
                    
                        <>
                        <li key={i}><button  className={ Active === TabdataList.Tab_Name ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(TabdataList.Tab_Name)}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
                        </>
                    )
                    })}
                </ul> 

                <ul className='site-tab-list mobile'>
                {Tabdata.map ((TabdataList,i)=> {
                    return (                   
                    <>
                        <li key={i}><button className={ Active === TabdataList.Tab_Name ? 'tab-btn active' : "tab-btn"  }  onClick={() =>{
                        if (Active===i) {
                            setActive(null)
                        }else{
                            setActive(TabdataList.Tab_Name)
                        }
                        // setActive(i)
                        }}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
                     
                    </>
                    )
                })}
                </ul> */}
    
  
{/* <ReturnData/> */}
  </>
  )
}

export default InnerTabs