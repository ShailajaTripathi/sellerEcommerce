import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import DropDown from '../../../../../../../components/DropDown'
import { SELLER_GETMAINCATEGORY, SELLER_LISTPRODUCT } from '../../../../../../../Redux-Toolkit/Actions/sagaActions'
const InventeryHeader = ({setDropDownSearch,dropDownSearch,inputSearch,setInputSearch}) => {
  const { getMainCategoryData } = useSelector((action) => action?.catalogSlice);
  const {control} = useForm({mode:"all"})
  const dispatch = useDispatch()
  
/////// dropdown search ////
useEffect(()=>{ dispatch({type:SELLER_GETMAINCATEGORY})},[])
const handleSearch = (e) =>{
  setDropDownSearch(e?._id)
}
///// end dropdown search ////

////// handle input search /////
const handleInputSerch = (e) =>{
  setInputSearch(e.target.value);
}
//// end handle input search ////




  return (
    <div class="head">
      <h2>All Stock</h2>
      <form action="" className='product-table-filter'>
          <input type="search"  placeholder='Search' onChange={(e)=>handleInputSerch(e)} value={inputSearch}/>
          <div className='filter-dropdown'>
            <label htmlFor="">Filter by</label>
            <Controller
              control={control}
              name="name"
              render={({
                field: { register, onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
                formState,
              }) => (
                <Dropdown
                  id="dropdown-basic-button"
                  drop="down-centered"
                  onSelect={(e) => {
                    onChange(JSON.parse(e))
                    handleSearch(JSON.parse(e))
                  }}
                >
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="icontrol"
                  >
                  {value?.name ?? "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      {getMainCategoryData?.map((list, index) => (
                        <Dropdown.Item
                          key={index}
                          eventKey={JSON.stringify(list)}
                          className={value?.name === list?.name ? "active" : ""}
                        >
                          
                          {list?.name}
                        </Dropdown.Item> ))}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            />
            {/* <Dropdown
                id="dropdown-basic-button"
                drop="down-centered"
                onSelect={(e)=>handleSelect(e)}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic" className="icontrol">
                  {dropDownSearch ? dropDownSearch : "All"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="">All</Dropdown.Item>
                  <Dropdown.Item eventKey="Women">Women</Dropdown.Item>
                  <Dropdown.Item eventKey="Man">Man</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown> */}
            {/* <DropDown DropDownCategory={DropDownData} name = "inventery"/> */}
          </div>
      </form>
    </div>
  )
}

export default InventeryHeader