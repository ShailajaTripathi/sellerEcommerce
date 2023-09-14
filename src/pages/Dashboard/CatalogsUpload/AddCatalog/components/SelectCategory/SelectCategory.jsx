import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { ADD_SUBCATEGORYLISTDATA, SELLER_GETSUBCATEGORY } from '../../../../../../Redux-Toolkit/Actions/sagaActions'
import ModalPopup from '../../../../../../components/Modal/ModalPopup'
import Button from '../../../../../../components/Button/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'



const SelectCategory = ({ setNext, setActive }) => {
    const { getMainCategoryData, getSubCategoryData , addSubCategorydata} = useSelector(
        (action) => action.catalogSlice
    )
    const valiadteionMSG =  Yup.object({
        subcategory : Yup.string().required('Please Enter Sub-Category.').max(20,"Sub-Category must be 0 to 20 charaters long.")
    })
    const {handleSubmit,reset,formState:{errors},register} = useForm({resolver:yupResolver(valiadteionMSG),mode:"onChange"})
    const [mainCategory, setMainCategory] = useState(null)
    const [subCategory, setSubCategory] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalInputValue, setModalInputValue] = useState()
    const [selectedMainCategory,setSelectedMainCategory] = useState(false)
    const dispatch = useDispatch()
    useEffect(() => {
        if (mainCategory) {
            dispatch({
                type: SELLER_GETSUBCATEGORY,
                payload: { mainCategoryId: mainCategory?._id }
            })
        }   
        setSubCategory(null)

    }, [mainCategory])
   
    const CategoryData = () => {
        // setNext(1)
        sessionStorage.setItem(
            'selectCG',
            JSON.stringify({ mainCategory, subCategory })
        )
        setActive(1)
    }

    const addSubCategoryListData = (data) => {
        dispatch({type : ADD_SUBCATEGORYLISTDATA, payload : {mainCategoryId: mainCategory?._id,categoryName:data?.subcategory}})
        setShowModal(false)
        reset()
        setSubCategory([modalInputValue, ...getSubCategoryData]);
        setModalInputValue('');
    }

    return (
        <div className="select-category">
            {/* <input type="search" placeholder="Search" /> */}
            <div className="content-box">
                <div className="choose-list">
                    <Row className='gy-3'>
                        <Col xl="3" lg="3">
                            <label className="title">Select Category</label>
                            <div className="white-bg">
                                <div className="content">
                                    {getMainCategoryData?.map((list) => {
                                        return (
                                            <div
                                                key={list?._id}
                                                class="custom-radio"
                                            >
                                                <input
                                                    type="radio"
                                                    id="456346436363"
                                                    name="mainCategory"
                                                    value={list?._id}
                                                    checked={
                                                        mainCategory?._id ===
                                                        list._id
                                                    }
                                                    onChange={(e) =>{
                                                        setMainCategory(list)
                                                        setSelectedMainCategory(e.target.checked)
                                                    }
                                                    }
                                                />
                                                <label for="456346436363">
                                                    {list?.name}
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Col>
                        {getSubCategoryData?.length !== 0 && selectedMainCategory &&(
                            <>
                                <Col  xl="3" lg="4">
                                    <label className="title">
                                        Select Sub-Category
                                    </label>
                                    <div className="white-bg">
                                        <div className="content">
                                            {getSubCategoryData?.map((list) => {
                                                return (
                                                    <div
                                                        class="custom-radio"
                                                        key={list?.categoryId}
                                                    >
                                                        <input
                                                            type="radio"
                                                            id="456346436363"
                                                            checked={
                                                                addSubCategorydata?.categoryId === list?.categoryId ? addSubCategorydata?.categoryId === list?.categoryId : 
                                                                subCategory?.categoryId ===
                                                                list?.categoryId
                                                            }
                                                            name="subCategory"
                                                            onChange={() =>
                                                                setSubCategory(
                                                                    list
                                                                )
                                                            }
                                                        />
                                                        <label for="456346436363">
                                                            {list?.categoryName}
                                                        </label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="sub-category-btn">
                                        <Button
                                            type="button"
                                            commonClass="solid-red-btn"
                                            text="Add Sub-Category"
                                            onClick={() => {setShowModal(true)}}
                                        />
                                    </div>
                                </Col>
                            </>
                        )}
    {console.log(subCategory,"subCategory")}
                        {subCategory && (
                            <Col  xl="5" lg="5">
                                <div className="add-product-box">
                                    <div className="add-title">
                                        {/* Women / Lehenga */}
                                        {mainCategory?.name}/{subCategory?.categoryName}
                                    </div>
                                    <div className="white-bg">
                                        <div className="add-product">
                                            <div className="heading">
                                                Please add the product here and
                                                fill the details.
                                            </div>
                                            <button
                                                type="submit"
                                                class="solid-red-btn"
                                                onClick={CategoryData}
                                                // onClick = {()=>testView()}
                                            >
                                                Add Product
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>

            {showModal && (
                <ModalPopup
                    show={showModal}
                    handleClose={() => setShowModal(true)}
                    handleShow={() => setShowModal(true)}
                    cname="accept-item confirm-modal delete-modal"
                >
                    <h2>Add Sub-Category</h2>
                    <form onSubmit={handleSubmit(addSubCategoryListData)}>
                        {/* onSubmit={handleSubmit(editOnSubmit)} */}
                    <div className='form-group'>
                        <label>Add Sub-Category</label>
                        <input
                            type="text"
                            name="subcategory"
                            {...register('subcategory')}
                            // onChange={(e)=>{setModalInputValue(e.target.value)}}
                            autoFocus={false}
                            autoComplete="off"
                        />
                        {errors.subcategory?.message && <span style={{ color: 'red'}} >{errors.subcategory?.message}</span>}
                    </div>
                    <div className="modal-btn-group">
                        <Button
                            type="submit"
                            commonClass="solid-red-btn modal-btn "
                            text="Yes"
                            // onClick={() => {addSubCategoryListData()}}
                        />
                         <Button
                            type="button"
                            commonClass="solid-black-btn modal-btn "
                            text="No"
                            onClick={() => {
                                setShowModal(false)
                                reset()
                            }}
                        />
                    </div>
                    </form>
                </ModalPopup>
            )}
        </div>
    )
}

export default SelectCategory
