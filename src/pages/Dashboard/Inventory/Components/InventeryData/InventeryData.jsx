import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { SELLER_GETMAINCATEGORY, SELLER_LISTPRODUCT } from '../../../../../Redux-Toolkit/Actions/sagaActions'
import InventeryHeader from './Components/InventeryHeader.jsx/InventeryHeader'
import SortByData from './Components/SortByData/SortByData'
import SortingTableData from './Components/SortingTableData/SortingTableData'

const InventeryData = ({Active}) => {
  console.log(Active,"active active active");
  const dispatch = useDispatch()
  const { ListProductDD ,getMainCategoryData} = useSelector((action) => action?.catalogSlice)

  const [showActiveData,setShoeActiveData] = useState(null)
  const [inputSearch,setInputSearch] = useState('')
  const [dropDownSearch,setDropDownSearch] = useState('')
  console.log(getMainCategoryData,"getMainCategoryData");
  // const [inputSearch,setInputSearch] = useState('')
  
  useEffect(() => {
    dispatch({
        type: SELLER_LISTPRODUCT,
        payload: {
            limit: "50",
            page: '',
            // search:dropDownSearch,
            sortKey: inputSearch,
            sortBy: '',
            mainCategoryId : dropDownSearch,
            status : Active==="Qc in Process" ? 7 
                    : Active === "Live" ? 1  
                    : Active === "Paused" ? "paused"
                    : Active === "Qc Error" ? 3
                    : ""
        }
    })
    // dispatch({type:SELLER_GETMAINCATEGORY})
}, [dropDownSearch,inputSearch])

useEffect(()=>{
  if(ListProductDD?.data?.length >0){
  setShoeActiveData(ListProductDD?.data?.[0]?.id)}

},[ListProductDD])
  return (
    <>
    <div className='admin-card'>
      <InventeryHeader dropDownSearch={dropDownSearch} setDropDownSearch={setDropDownSearch} setInputSearch={setInputSearch} inputSearch={inputSearch}/>
      <SortByData ListProductDD={ListProductDD} showActiveData ={showActiveData} setShoeActiveData={setShoeActiveData}/>
      <SortingTableData data={ListProductDD?.data?.find((e)=>e.id === showActiveData )} mainTab={Active}/>
    </div>
    </>
  )
}

export default InventeryData