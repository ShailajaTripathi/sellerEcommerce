import React, { useState } from 'react'
import {ReactComponent as IconStar} from '../../../../../../../assets/images/icons/icon-star.svg'
import {ReactComponent as IconRedAlert} from '../../../../../../../assets/images/icons/icon-red-alert.svg'
import {ReactComponent as IconMoreDots} from '../../../../../../../assets/images/icons/icon-more-dots.svg'
import {ReactComponent as IconEditBlack} from '../../../../../../../assets/images/icons/icon-edit-black.svg'
import {ReactComponent as IconEditRed} from '../../../../../../../assets/images/icons/icon-edit-red.svg'
import {ReactComponent as IconRightRed} from '../../../../../../../assets/images/icons/icon-right-red.svg'
import { Dropdown } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import Swal from "sweetalert2";
import TableListing from '../../../../../../../components/TableListing/TableListing'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import SortingTable from '../../../../../../../components/SortingTable'
import { useDispatch } from 'react-redux'
import { PAUSE_INVENTORY_LIST_DATA } from '../../../../../../../Redux-Toolkit/Actions/sagaActions'
import { useEffect } from 'react'

const SortingTableData = ({data:shortData,mainTab}) => {
  const [data,seData] = useState(false)
  const {state} = useLocation();
  const dispatch = useDispatch();

  const handleSelectData = (eventKey, id,variantId,statusCode) => {
    if (eventKey === 'Variant') {
      // Handle "Add New Variant" action
    } else if (eventKey === 'Move') {
      // Handle "Move to Active" action
    } else if (eventKey === 'Pause') {
      dispatch(
        {type:PAUSE_INVENTORY_LIST_DATA,payload:{catalogId:id,variantId:variantId,status:statusCode},
        callback:()=>{
          dispatch({type:"SELLER_LISTPRODUCT", payload: {
            limit: "50",
            page: '',
            // search:dropDownSearch,
            // sortKey: inputSearch,
            sortBy: '',
            // mainCategoryId : dropDownSearch,
            // status : Active==="Qc in Process" ? 7 
            //         : Active === "Live" ? 1  
            //         : Active === "Paused" ? "paused"
            //         : Active === "Qc Error" ? 3
            //         : ""
        }})
        }})
    }
  };

  

//  const transformDataForTable = (data) => {
//   // console.log(data,"data data data data view");
//   // return data?.addVariant?.map((AD,index)=>({
//   //   // AD?.variantList?.map((ss)=>{
//   //   //   console.log(ss?.size,"*****");
//   //   // })
//   //   // console.log(AD?.variantList,"AD");
//   //   // size: AD?.variantList?.map((size) => size?.size)
//   //   // variation : AD?.variantList?.map((ss)=>ss?.size)
//   // }))
// };


const columnHelper = createColumnHelper();

const columns = [
  //// first row for check box....//////

//   columnHelper.display({
//     id: "chkBox",
//     header: () => "chkBox",
//     cell: (row) => row?.row?.original?.chkBox,
//   }),
//   columnHelper.accessor(row=>{console.log(row,"row")
//   return row?.color
  
// },
// {
//     id: "chkBox2",
//     cell: info => info.getValue(),
//     footer: info => info.column.id,
//   }
//   ),

  columnHelper.display({
    id:"productSku",
    header: ()=>
              <>
              <div className='thumbnail-head'>
                {/* <input type="checkbox"/>  */}
                <span>SKU</span>
              </div>
              </> ,
     cell: (row) => <>
                  <div className="product-thumbnail">
                    {/* {row?.row?.original?.productImages?.map((img)=><img src={img?.image} alt="product-image"/>)} */}
                    <img src={row?.row?.original?.productImages?.[0]?.image} alt="product-image" />
                    <div className='product-details'>
                      <h3>{shortData?.productName}</h3>
                      {row?.row?.original?.productSku ? <p>SKU ID: {row?.row?.original?.productSku}</p> : ''}

                      {/* {row?.row?.original?.variantList ? <p>Selling Price: {row?.row?.original?.variantList?.map((qq)=>qq?.sellingPrice).join(",")}</p> : "" } */}
                      <p>Selling Price: {row?.row?.original?.variantList?.map((qq)=>qq?.sellingPrice).join(",")}</p>
                    </div>
                    </div>
                    </>     
  }),

  columnHelper.accessor((row) => row?.variantList?.map((s)=>s?.size), {
    id: "variation",
    header: () => "Variation",
  }),
  columnHelper.accessor((row) => row?.shippingTime, {
    id: "estimatedTime",
    header: () => "Estimated Order/Day",
    cell : (row) => <><p>{shortData?.shippingTime}</p></>
  }),
  columnHelper.accessor((row) => row?.subcategory, {
    id: "subcategory",
    header: () => "Day to Stockout",
    cell : (row) => <><p>-</p></>
  }),
  columnHelper.accessor((row) => row?.variantList?.map((s)=>s?.availableQty), {
    id: "productName",
    header: () => "Current Stock",
    cell : (row) => <>
              <p className='text-red'>Out of Stock</p>
                  <p className='since'>(Since 12 Days)</p>
                  <div className="input-group">
                    <input type="text" value={row?.row?.original?.variantList?.map((m)=>m?.availableQty)}/>
                    <button type='button' className='input-action' onClick={()=>{seData(!data)}}>
                      {data === true ? <IconRightRed/> : <IconEditRed/>}
                      </button>
                  </div>
      </>
  }),
  columnHelper.display({
    id: "action",
    header: () => "Action",
    cell: (row) => <>
                   <ul className='action-list'>
                    <li><button className='edit-btn' onClick={()=>{console.log(shortData?.addVariant?.map((dd)=>dd?.variantId))}}><IconEditBlack/>Edit</button></li>
                    <li>
                      <Dropdown
                        id="dropdown-basic-button"
                        drop="down-centered"
                        className='more-dropdown'
                        onSelect={(e)=>handleSelectData(e,shortData?.id,shortData?.addVariant?.[0]?.variantId,shortData?.addVariant?.[0]?.status)}
                      >
                      <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
                      <IconMoreDots/> More
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Variant">Add New Variant</Dropdown.Item>
                        <Dropdown.Item eventKey="Move">Move to Active</Dropdown.Item>
                        <Dropdown.Item eventKey="Pause">Pause</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </li>
                  </ul>
    </>,
  }),
];


//  const transformedData = transformDataForTable(shortData);
  const table = useReactTable({
    data: shortData || [],
    columns: columns || [],
    // createColumnHelper : getCreateColumnHelper(),
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });



  return (
    <div className="product-category-details">
      <div className="category-head">
        <div className="left">
            <h6>{shortData?.productName}</h6>
            <div className='catalog-list'>
              {shortData?.addVariant?.[0]?.productSku ? <p>Catalog ID: {shortData?.addVariant?.[0]?.productSku}</p> : ''} 
              <p>Catagory: {shortData?.mainCategoryName}</p>
              <p>Sub Catagory: {shortData?.categoryName}</p>
            </div>
        </div>
        <div className="right">
            {mainTab === "All"  && <p className='text-end'>View Details</p>}
            {mainTab === "Paused" && <><div className='rating'><IconStar/>4.0</div>  <p className='text-end'>View Details</p></>} 
            {mainTab === "Live" && <div className='rating'><IconStar/>4.0</div>}
            {mainTab === "Qc Error" && <>
              <div className='alert-massage'>
                <IconRedAlert/>
                <div>
                  <p className='text-red'>Qc Error: <b>Dublicate Catalog</b></p>
                  <p>SKU in the catalog are already listed by you</p>
                </div>
                {/* <div className='rating white'><IconStar/>1.0</div> */}
              </div></>}
            {mainTab === "Qc in Process" && <>
              <div className='alert-massage'>
                <IconRedAlert/>
                <div>
                  <p className='text-red'>Activaction delayed. it will be made live soon</p>
                </div>
              </div>
            </>}
            
        </div>
      </div>
      <div className="product-categorytable">
    
    {shortData &&  <SortingTable
          columns={columns} data={shortData}
          // ListProductDD={shortData}
        /> }
        {/* <table className='table'>
            <thead>
              <tr>
                <th><div className='thumbnail-head'><input type="checkbox" /> SKU (5)</div></th>
                <th>Variation</th>
                <th>Estimated Order/Day</th>
                <th>Day to Stockout</th>
                <th>Current Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="product-thumbnail">
                    <input type="checkbox" />
                    <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="product-image" />
                    <div className='product-details'>
                      <h3>Saaksha & Kinni</h3>
                      <p>SKU ID: 8596858</p>
                      <p>Selling Price: ₹1259</p>
                    </div>
                  </div>
                </td>
                <td>XXS</td>
                <td>4</td>
                <td>0</td>
                <td>
                  <p className='text-red'>Out of Stock</p>
                  <p className='since'>(Since 12 Days)</p>
                  <div className="input-group">
                    <input type="text" value={0}/>
                    <button type='button' className='input-action' onClick={()=>{seData(!data)}}>
                      {data === true ? <IconRightRed/> : <IconEditRed/>}
                      </button>
                  </div>
                </td>
                <td className='action'>
                  <ul className='action-list'>
                    <li><button className='edit-btn'><IconEditBlack/>Edit</button></li>
                    <li>
                      <Dropdown
                        id="dropdown-basic-button"
                        drop="down-centered"
                        className='more-dropdown'
                      >
                      <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
                      <IconMoreDots/> More
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Variant">Add New Variant</Dropdown.Item>
                        <Dropdown.Item eventKey="Move">Move to Active</Dropdown.Item>
                        <Dropdown.Item eventKey="Pause">Pause</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="product-thumbnail">
                    <input type="checkbox" />
                    <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="product-image" />
                    <div className='product-details'>
                      <h3>Saaksha & Kinni</h3>
                      <p>SKU ID: 8596858</p>
                      <p>Selling Price: ₹1259</p>
                    </div>
                  </div>
                </td>
                <td>M</td>
                <td>3</td>
                <td>5</td>
                <td>
                  <p className='text-blue'>Low Stock </p>
                  <div className="input-group">
                    <input type="text" value={0}/>
                    <button type='button' className='input-action' onClick={()=>{seData(!data)}}>
                      {data === true ? <IconRightRed/> : <IconEditRed/>}
                      </button>
                  </div>
                </td>
                <td className='action'>
                  <ul className='action-list'>
                    <li><button className='edit-btn'><IconEditBlack/>Edit</button></li>
                    <li>
                      <Dropdown
                        id="dropdown-basic-button"
                        drop="down-centered"
                        className='more-dropdown'
                      >
                      <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
                      <IconMoreDots/> More
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Variant">Add New Variant</Dropdown.Item>
                        <Dropdown.Item eventKey="Move">Move to Active</Dropdown.Item>
                        <Dropdown.Item eventKey="Pause">Pause</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td colSpan={12}><p className='error-massage'><IconRedAlert/> This SKU is Dublicate of <span>659857-XXS</span></p></td>
              </tr>
              <tr>
                <td>
                  <div className="product-thumbnail">
                    <input type="checkbox" />
                    <img src="https://rukminim1.flixcart.com/image/612/612/xif0q/sari/x/m/n/free-star-grey-saree-sangath-unstitched-original-imagk4gua3h8eem2.jpeg?q=70" alt="product-image" />
                    <div className='product-details'>
                      <h3>Saaksha & Kinni</h3>
                      <p>SKU ID: 8596858</p>
                      <p>Selling Price: ₹1259</p>
                    </div>
                  </div>
                </td>
                <td>XXS</td>
                <td>4</td>
                <td>0</td>
                <td>
                  Paused on March 02, 2022
                  <div className="input-group">
                    <input type="text" value={0}/>
                    <button type='button' className='input-action' onClick={()=>{seData(!data)}}>
                      {data === true ? <IconRightRed/> : <IconEditRed/>}
                      </button>
                  </div>
                </td>
                <td className='action'>
                  <ul className='action-list'>
                    <li><button className='edit-btn'><IconEditBlack/>Edit</button></li>
                    <li>
                      <Dropdown
                        id="dropdown-basic-button"
                        drop="down-centered"
                        className='more-dropdown'
                      >
                      <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
                      <IconMoreDots/> More
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item eventKey="Variant">Add New Variant</Dropdown.Item>
                        <Dropdown.Item eventKey="Move">Move to Active</Dropdown.Item>
                        <Dropdown.Item eventKey="Pause">Pause</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
        </table> 
       

        */}
      </div>
    </div>
  )
}

export default SortingTableData



