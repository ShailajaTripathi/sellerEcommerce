import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { SELLER_LISTPRODUCT } from '../../../../../Redux-Toolkit/Actions/sagaActions'
import InnerTabs from '../InnerTabs/InnerTabs'
import InventeryData from '../InventeryData/InventeryData'
const ActiveInnerTabs =  [
    {
        Tab_Name: "All Stock",
        count: "16",
    },
    {
        Tab_Name: "Out of Stock",
        count: "16",
    },
    {
        Tab_Name: "Low Stock",
        count: "16",
    }
]
// const BlockedInnerTabs =  [
//     {
//         Tab_Name: "Dublicates",
//         count: "16",
//     },
//     {
//         Tab_Name: "Poor Quality",
//         count: "16",
//     },
//     {
//         Tab_Name: "Other",
//         count: "16",
//     }
// ]


const Tabs = () => {
    const [Active,setActive] = useState("All")
  const {ListProductDD}  = useSelector((action) => action?.catalogSlice);

    console.log(ListProductDD?.meta?.totalCount,"ListProductDD tabs");
  //// list api calling /////
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch({
//       type: SELLER_LISTPRODUCT,
//       payload: {
//         limit: '',
//         page: '',
//         search: '',
//         sortKey: '',
//         sortBy: -1,
//       },
//     //   callback :()=>{
//     //     console.warn("for war");
//     //   }
//     });
//   }, []);

////// end list api calling /////

    const [Tabdata,setTabData] = useState(
        [
          {
           Tab_Name: "All",
            count:ListProductDD?.meta?.totalCount,
          },
          {
           Tab_Name: "Qc in Process",
            count:ListProductDD?.meta?.pendingCount,
           //  innerTab : <div className='tab-body'><InnerTabs/></div>
          },
          {
            Tab_Name: "Live",
             count:ListProductDD?.meta?.activeCount,
            //  innerTab : <div className='tab-body'><InnerTabs/></div>
           },
           {
            Tab_Name: "Qc Error",
             count:ListProductDD?.meta?.inActiveCount,
            //  innerTab : <div className='tab-body'><InnerTabs/></div>
           },
           {
            Tab_Name: "Paused",
             count:"5",
            //  innerTab : <div className='tab-body'><InnerTabs/></div>
           }
        ])
     
        useEffect(() => {
            setTabData([
                {
                  Tab_Name: "All",
                  count: ListProductDD?.meta?.totalCount || '0',
                },
                {
                  Tab_Name: "Qc in Process",
                  count: ListProductDD?.meta?.pendingCount || "0",
                },
                {
                  Tab_Name: "Live",
                  count: ListProductDD?.meta?.activeCount || "0",
                },
                {
                  Tab_Name: "Qc Error",
                  count: ListProductDD?.meta?.inActiveCount || "0",
                },
                {
                  Tab_Name: "Paused",
                  count: ListProductDD?.meta?.paused || "0",
                },
              ]);
          }, [ListProductDD?.meta]);
        
  return (
    <>
        <ul className='site-tab-list desktop'>
                {Tabdata?.map((Td, i) => {
                    return <>
                        <li key={i}><button className={ Active === Td.Tab_Name ? 'tab-btn active' : "tab-btn"  } onClick={() => setActive(Td.Tab_Name)}>{Td.Tab_Name} {Td.count && <span >{Td.count}</span>} </button></li>
                        {/* { Active === Tabdata.Tab_Name && Tabdata.innerTab} */}
                    </>
                })}
        </ul>

            <ul className='site-tab-list mobile'>
                {Tabdata?.map((TD, i) => {
                    console.log(TD?.count,"TABBBBBB");
                    console.log(ListProductDD?.meta?.[TD?.count],"meta");
                    return <>
                        <li key={i}><button className={ Active === TD.Tab_Name ? 'tab-btn active' : "tab-btn"  } onClick={() =>{
                            if (Active===TD.Tab_Name) {
                                setActive(null)
                            }else{
                                setActive(TD.Tab_Name)
                            }
                            // setActive(i)
                            }}
                        >{TD.Tab_Name} {TD.count && <span >{TD?.count}</span>} </button></li>
                        {/* { Active === Tabdata.Tab_Name && Tabdata.innerTab} */}
                        {/* {ListProductDD?.meta?.[TabdataList?.count] || "0"} */}
                           

                {Active === TD.Tab_Name && <> 
                    {Active === "All"  &&  <li className='tab-body'><InnerTabs Active ={ Active} Tabs={ ActiveInnerTabs} /></li>} 
                    { Active === "Live" &&  <li className='tab-body'><InventeryData Active ={ Active}/></li>} 
                    {Active === "Qc in Process"  &&  <li className='tab-inner-data'><InventeryData Active ={ Active}/></li>}
                    {Active === "Qc Error"  &&  <li className='tab-inner-data'><InventeryData Active ={ Active}/></li>} 
                    { Active === "Paused" &&  <li className='tab-inner-data'><InventeryData Active ={ Active}/></li>} 
                 </> } 
                        
                    </>
                })}
                
                {/* { Active === "Active" || "Live" &&  <div className='tab-body'><InnerTabs Active ={ Active}/></div>} */}
                {/* {Active === "Active"  &&  <li className='tab-body'><InnerTabs Active ={ Active} Tabs={ ActiveInnerTabs} /></li>} 
                        { Active === "Live" &&  <li className='tab-body'><InnerTabs Active ={ Active} Tabs={ BlockedInnerTabs}/></li>} 
                        {Active === "Qc in Process"  &&  <li className='tab-inner-data'><InventeryData/></li>} 
                          { Active === "Paused" &&  <li className='tab-inner-data'><InventeryData/></li>}  */}

            </ul>
    </>
  )
}

export default Tabs