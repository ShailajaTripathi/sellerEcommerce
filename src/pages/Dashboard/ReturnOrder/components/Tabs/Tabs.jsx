import React, { useEffect, useState } from 'react'
import InnerTabs from '../InnerTabs/InnerTabs'
const Tabs = () => {
    // const [Active, setActive] = useState("Delivering Today")
    // const [Tabdata, setTabData] = useState([
    //     {
    //         Tab_Name: "Delivering Today",
    //         count: "2",
    //         innerTab : (flag)=>  <InnerTabs flag={flag}  />,
    //         innerData : <h1> 11111111111111111</h1>,
    //     },
    //     {
    //         Tab_Name: "Completed",
    //         count: "2",
    //         innerTab : (flag)=>  <InnerTabs flag={flag} />,
    //         innerData : <h1> 222222222222</h1>,
    //     }
    // ])
    const [Active, setActive] = useState("Delivering Today")
    const [Tabdata,setTabData] = useState(
     [
       {
        Tab_Name: "Delivering Today",
         count:"2",
        //  innerTab : <div className='tab-body'><InnerTabs/></div>
       },
       {
        Tab_Name: "Completed",
         count:"3095",
        //  innerTab : <div className='tab-body'><InnerTabs/></div>
       }
     ])
useEffect (()=> {
 console.log("heloooo",Active,"Delivered")
},[Active])
    return (
        <>
            <ul className='site-tab-list desktop'>
                {Tabdata?.map((Tabdata, i) => {
                    return <>
                        <li key={i}><button className={ Active === Tabdata.Tab_Name ? 'tab-btn active' : "tab-btn"  } onClick={() => setActive(Tabdata.Tab_Name)}>{Tabdata.Tab_Name} {Tabdata.count && <span >{Tabdata.count}</span>} </button></li>
                        {/* { Active === Tabdata.Tab_Name && Tabdata.innerTab} */}
                    </>
                })}
            </ul>

            <ul className='site-tab-list mobile'>
                {Tabdata?.map((Tabdata, i) => {
                    return <>
                        <li key={i}><button className={ Active === Tabdata.Tab_Name ? 'tab-btn active' : "tab-btn"  } onClick={() =>{
                            if (Active===Tabdata.Tab_Name) {
                                setActive(null)
                            }else{
                                setActive(Tabdata.Tab_Name)
                            }
                            // setActive(i)
                            }}
                        >{Tabdata.Tab_Name} {Tabdata.count && <span >{Tabdata.count}</span>} </button></li>
                        {/* { Active === Tabdata.Tab_Name && Tabdata.innerTab} */}
                        {Active === Tabdata.Tab_Name &&  <li className='tab-body'><InnerTabs Active ={ Active}/></li>}
                    </>
                })}

            </ul>
                {/* <ul className='site-tab-list desktop'>
                    {Tabdata.map ((TabdataList,i)=> {
                    return (
                    
                        <>
                        <li key={i}><button  className={ Active === TabdataList.Tab_Name ? 'tab-btn active' : "tab-btn"  }  onClick={() => setActive(TabdataList.Tab_Name)}>{TabdataList.Tab_Name} {TabdataList.count && <span >{TabdataList.count}</span> } </button></li>
                      <div> { Active === TabdataList.Tab_Name && TabdataList.innerTab}</div>  
                        </>
                    )
                    })}
                </ul> */}

                {/* <ul className='site-tab-list mobile'>
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
                        { Active === TabdataList.Tab_Name && TabdataList.innerTab}
                    </>
                    )
                })}
                </ul> */}
        </>
    )
}

export default Tabs