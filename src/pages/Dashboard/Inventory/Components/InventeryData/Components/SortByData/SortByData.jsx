import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import ProductImage from '../../../../../../../assets/images/product-image.png'
import DropDown from '../../../../../../../components/DropDown/DropDown'
import { SELLER_LISTPRODUCT } from '../../../../../../../Redux-Toolkit/Actions/sagaActions'

const SortByData = ({ListProductDD,setShoeActiveData,showActiveData}) => {
  const DropDownData = [{ name: "Popular", id: "1" }, { name: "Latest", id: "2" }, { name: "Price - Low to High", id: "3" },{ name: "Price - High to Low", id: "4" },{ name: "Discount - High to Low", id: "5" }]
 
  console.log(setShoeActiveData,"setShoeActiveData");

  return (
    <div className='sort-by-product'>
      <div className="sort-head">
        <label htmlFor="">Sort By:</label>
        {/* <Dropdown
          id="dropdown-basic-button"
          drop="down-centered"
        >
          <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
            Discount - High to Low
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="Women">Popular</Dropdown.Item>
            <Dropdown.Item eventKey="Man">Latest</Dropdown.Item>
            <Dropdown.Item eventKey="Kids">Price - Low to High</Dropdown.Item>
            <Dropdown.Item eventKey="Kids">Price - High to Low</Dropdown.Item>
            <Dropdown.Item eventKey="Kids">Discount - High to Low</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        <DropDown DropDownCategory={DropDownData} name = "inventerySortData" />
      </div>

     



      <ul className='sort-by-product-list'>
        {ListProductDD?.data?.length > 0 &&
        <>
          {ListProductDD?.data?.map((aa)=>
            <>
             <li className={showActiveData === aa?.id ? "active" : ''} onClick={()=>{
               setShoeActiveData(aa?.id)
             }}>
             <img src={aa?.addVariant?.[0]?.productImages?.[0]?.image} alt="product-image" />
             <div className="details">
               <h3>{aa?.productName}</h3>
                {aa?.addVariant?.[0]?.productSku ? <p>Catalog ID: {aa?.addVariant?.[0]?.productSku}</p> : ''} 
               <p>Catagory: {aa?.mainCategoryName}</p>
               <p>Sub Catagory: {aa?.categoryName}</p>
             </div>
           </li>
           </>
          )}
        </>
        }
        {/* <li className='active'>
          <img src={ListProductDD?.data?.addVariant?.[0]?.productImages?.[0]?.image} alt="product-image" />
          <div className="details">
            <h3>Basanti - Kapde Aur Koffee</h3>
            <p>Catalog ID: 8596858</p>
            <p>Catagory: Women</p>
            <p>Sub Catagory: Lehenga</p>
          </div>
        </li> */}
       
        {/* <li>
          <img src={ProductImage} alt="product-image" />
          <div className="details">
            <h3>Basanti - Kapde Aur Koffee</h3>
            <p>Catalog ID: 8596858</p>
            <p>Catagory: Women</p>
            <p>Sub Catagory: Lehenga</p>
          </div>
        </li>
        <li>
          <img src={ProductImage} alt="product-image" />
          <div className="details">
            <h3>Basanti - Kapde Aur Koffee</h3>
            <p>Catalog ID: 8596858</p>
            <p>Catagory: Women</p>
            <p>Sub Catagory: Lehenga</p>
          </div>
        </li> */}
      </ul>
    </div>



  )
}

export default SortByData