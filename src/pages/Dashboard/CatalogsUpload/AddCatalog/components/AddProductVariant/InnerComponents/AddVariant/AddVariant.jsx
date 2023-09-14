import React, { useEffect, useState } from 'react'
import DeleteIcon from '../../../../../../../../assets/images/icons/delete-icon.svg'
import Exlmation from '../../../../../../../../assets/images/icons/exlmation.svg'
import imageGallary from '../../../../../../../../assets/images/image-gallary1.png'
import { ReactComponent as Plus } from '../../../../../../../../assets/images/icons/icon-plus-white.svg'
import DeleteRoundIcon from '../../../../../../../../assets/images/icons/delete-round-icon.svg'
import { useDropzone } from 'react-dropzone'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Col, Dropdown, Row } from 'react-bootstrap'
import DropDown from '../../../../../../../../components/DropDown/DropDown'
import AddSizes from './innerComponents/AddSizes/AddSizes'
import AddImages from './innerComponents/AddImages/AddImages'
import ModalPopup from '../../../../../../../../components/Modal/ModalPopup'
import DeleteRedIcon from '../../../../../../../../assets/images/icons/delete-red-icon.svg'
import RightSignIcon from '../../../../../../../../assets/images/icons/right-sign.svg'
import Button from '../../../../../../../../components/Button/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import {
    ADD_PRODUCT_COLOR_DATA,
    DELETE_CATALOG_IMAGE,
    SELLER_ADDPRODUCT,
    SELLER_COLOR,
    SELLER_SIZE
} from '../../../../../../../../Redux-Toolkit/Actions/sagaActions'
import {
    addMaterialSuccess,
    sellerAddProductSuccess,
    sellerDeleteProductSuccess,
    sellerUpdateProductSuccess
} from '../../../../../../../../Redux-Toolkit/Slices/catalogSlice'
import Loader from '../../../../../../../../components/Loader/Loader'
import {
    storeDataInIndexedDB,
    updateDataInIndexedDB,
    updateInitialVariantDataFromIndexedDB
} from '../../../../../../../../Functions/indexdb'
import AddColorModel from '../../../../../../../../components/AllModelForm/AddColorModel/AddColorModel'
import { useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddVariant = ({
    setAddVariant,
    first:SCOLOR,
    setEditViewAddVariant,
    viewAddVariantData
}) => {
    const dispatch = useDispatch()
    const [colorModalShow, setColorModalShow] = useState(false)
    const [deleteModal, setDeleteModalShow] = useState(false)
    const [delId, setDelId] = useState(null)
    const [fileRejectionError, setFileRejectionError] = useState('')
    const {
        colorData,
        addVariantEditDataList,
        addVariantDataList,
        isloading,
        selectedColorData,
        viewCatalogEditVariantDataList
    } = useSelector((action) => action.catalogSlice)
    const [category, setCategory] = useState(null)
    const [productBD, setProductBD] = useState(null)
    const [discountValue, setDiscountValue] = useState(0)
    const [priceValue, setPriceValue] = useState('')
    // const [viewListData,setViewListData] = useState(JSON.parse(sessionStorage.getItem("addVariantList")|| "[]") )

    const validationSchema = yup.object({
        addVariant: yup
            .array()
            .of(
                yup.object({
                    color: yup.object().required('Please select a color'),
                    addSize: yup
                        .array()
                        .of(
                            yup.object({
                                size: yup
                                    .object()
                                    .required('Please select a size'),
                                price: yup
                                    .string()
                                    .required('Please enter a price'),
                                availableQty: yup
                                    .string()
                                    .required(
                                        'Please enter the available quantity'
                                    )
                            })
                        )
                        .required('Add at least one size'),
                    file: yup
                        .array()
                        .test(
                            'fileCount',
                            'Please select at least 2 and at most 3 files',
                            (files) => {
                                return files?.length >= 2 && files?.length <= 3
                            }
                        )
                        .required('Please select a file')
                })
            )
            .min(1, 'Add at least one variant')
    })

    const {
        register,
        control,
        handleSubmit,
        reset,
        getValues,
        setValue,
        watch,
        setError,
        getFieldState,
        formState: { errors, submitCount }
    } = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: { addSize: [], addVariant: [] }
    })

    const { fields, append, prepend, remove } = useFieldArray({
        control,
        name: 'addVariant'
    })

    const handleButtonClick = (e) => {
        // Trigger the file input programmatically when the button is clicked
        document.getElementById(`fileInput${e}`).click()
    }
    useEffect(() => {
        // if(viewCatalogEditVariantDataList === 0){
        prepend({})
        // }
    }, [prepend])

    
    const removeImages = (id, index,a) => {
        const newFiles = watch(`addVariant.${index}.file`)
        if (
            newFiles.filter((res, a) => {
                return a !== id
            }).length === 0
            ) {
                setError(`addVariant.${index}.file`, {
                    type: 'custom',
                    message: 'Please select a file'
            })
        }
        if (
            newFiles.filter((res, a) => {
                return a !== id
            }).length === 1
            ) {
            setError(`addVariant.${index}.file`, {
                type: 'custom',
                message: 'Please select at least 2 and at most 3 files'
            })
        }
        if (
            newFiles.filter((res, a) => {
                return a !== id
            }).length === 2
            ) {
                setError(`addVariant.${index}.file`, {
                    type: 'custom',
                    message: ''
                })
            }
            setValue(
                `addVariant.${index}.file`,
                newFiles.filter((res, a) => {
                    return a !== id
                })
                )
                if(a){
                dispatch({type:DELETE_CATALOG_IMAGE,payload:{catalogId:viewAddVariantData?.id,imageId:a}})
                }
            }
            
            useEffect(() => {
                if (sessionStorage.getItem('selectCG')) {
            const Category = JSON.parse(sessionStorage.getItem('selectCG'))
            setCategory(Category)
        }
        if (sessionStorage.getItem('ProductBD')) {
            const ProductBD = JSON.parse(sessionStorage.getItem('ProductBD'))
            setProductBD(ProductBD)
        }
    }, [
        sessionStorage.getItem('selectCG'),
        sessionStorage.getItem('ProductBD')
    ])

  
    useEffect(() => {
        if (addVariantEditDataList.length !== 0) {
            reset(addVariantEditDataList)
        }
    }, [addVariantEditDataList])

    ///// for filter colore data drop down //////
    const [first, setfirst] = useState([])
    useEffect(()=> {
      const abc =   addVariantDataList.map((res)=> {
        return res?.color?._id
    })
    setfirst(abc)
},[])
        

    const getAvailableVariantOptions = () => {
        const selectedValues = fields.map((field, i) => {
            // if(viewCatalogEditVariantDataList){
            //   return  setValue(`addVariant.${i}.color`,{name:viewCatalogEditVariantDataList?.addVariant?.[0]?.color,
            //         id:viewCatalogEditVariantDataList?.addVariant?.[0]?.colorId})
            // }
            // setColorData(i)
            return first?.length > 0 ? first : watch(`addVariant.${i}.color`)
        })
        const colorFilter = colorData.filter((option) =>{
            console.log(option,"!!!");
              return  !selectedValues?.map((ert) => ert?.name).includes(option?.name)
        })
        colorFilter?.push({ name: 'Add Color' })
        console.log(colorFilter,"colorFilter");
        return colorFilter
        // return colorData.filter((option) => !selectedValues?.map((ert)=> ert?.name ).includes(option?.name));
    }
   
    
    const onSubmit = (data) => {
        console.log(data, 'clickckkckc')
        
        if (data.addVariant?.[0]?.id >= 0) {
            dispatch(updateDataInIndexedDB(data))
            // setEditViewAddVariant &&  setEditViewAddVariant(false)
            setAddVariant && setAddVariant(false)
            JSON.stringify(sessionStorage.setItem('AddVariant', false))
        } else {
            dispatch(storeDataInIndexedDB({ addData: data?.addVariant}))
            setAddVariant && setAddVariant(false)
            // setEditViewAddVariant &&  setEditViewAddVariant(false)
            // setAddVariant(false)
            JSON.stringify(sessionStorage.setItem('AddVariant', false))
        }
        // setViewListData((pre) => [...pre,data])
        // const FinalData = data?.addVariant?.map((res)=> {
        //   res.addSize.map((res)=> {
        //    delete res.size.name
        //    delete res.size.status
        //   res.size = res.size._id
        //   })

        //   res.color = res?.color?._id
        //   res.file.map((res)=> {
        //      delete res?.preview
        //   })
        //   return res
        // })

        // dispatch({type: SELLER_ADDPRODUCT,payload : {
        //   mainCategoryId : category?.mainCategory?._id,
        //   categoryId : category?.subCategory?.categoryId,
        //   productName : productBD?.productTitle,
        //   productWeight : productBD?.productWeight,
        //   materialId : productBD?.productMaterial?._id,
        //   typeId : productBD?.type?._id,
        //   countryId : productBD?.country?._id,
        //   gst : productBD?.gst,
        //   description : productBD?.description,
        //   addVariant : FinalData
        // }})
    }

    // Listen for changes in selectedColorData and update the color field value
    useEffect(() => {
        if (selectedColorData) {
            fields.forEach((field, index) => {
                setValue(`addVariant.${index}.color`, selectedColorData)
            })
        }
    }, [selectedColorData, fields])

    ////////////////////////////

    // const [discountValue12, setDiscountValue12] = useState(discountInAllll || '')
    // useEffect(() => {
    //   fields.forEach((field, index) => {
    //     setValue(`addVariant.${index}.discountInOne`, discountValue12);
    //   });
    // }, [discountValue12, fields]);

    //////////////////////////

    //  for getting discount value on product
    const storedDataJSON = sessionStorage.getItem('ProductBD')
    const storedData = JSON.parse(storedDataJSON)
    const discountInAll = storedData?.discountInAll
    const [discountValue12, setDiscountValue12] = useState(discountInAll || '')

    // calculation function //
    const [payOutValue, setPayoutValue] = useState(null)
    const [payoutPrices, setPayoutPrices] = useState([])
    const [discoutName, setDiscoutName] = useState(undefined)

    // useEffect(() => {
    //   // Calculate the payout price based on the current price and discount
    //   const currentPrice = parseFloat(watch(`addVariant.${index}.addSize.${sizeIndex}.price`));
    //   const discount = parseFloat(watch(`addVariant.${index}.discountInOne`)) || discountInAll;
    //   const discountAmount = (currentPrice * discount) / 100;
    //   const payoutPrice = currentPrice - discountAmount;

    //   // Update the payoutPrices array with the new payout price
    //   setPayoutPrices((prevPayoutPrices) => {
    //     const updatedPayoutPrices = [...prevPayoutPrices];
    //     updatedPayoutPrices[index][sizeIndex] = payoutPrice;
    //     return updatedPayoutPrices;
    //   });
    // }, [watch(`addVariant.${index}.addSize.${sizeIndex}.price`), discountInAll]);
    const calculationPayOutFunction = () => {
        const additiondiscount = parseInt(discountValue12 || discountInAll)
        const discountAmountFinal = (priceValue * additiondiscount) / 100
        const totalValue = priceValue - discountAmountFinal
        // setValue(discoutName, totalValue)
    }
    // BBBBBBBBBBB ////

    // const storedDataJSONNN = sessionStorage.getItem('ProductBD')
    // const storedDataaaa = JSON.parse(storedDataJSONNN)
    // const discountInAllll = storedDataaaa?.discountInAll
    // const [discountValue12, setDiscountValue12] = useState(discountInAllll || '')

    const [variantIndex, setVariantIndex] = useState('')
    const handlePriceChange = (e, index) => {
        // const updatedData = [...allData]; // Create a copy of the original data
      
        const addSizeArray = getValues(`addVariant`)[0].addSize;
        const discount = parseFloat(discountValue12) || 0;
        const getIndex = index;
        
      
        for (let index = 0; index < addSizeArray.length; index++) {
            console.log('getIndex',getIndex)
            const price = addSizeArray[index].price
            console.log('price==>',price)
            const payoutPrice = getValues(`addVariant`)[getIndex].addSize[index]?.price - (getValues(`addVariant`)[getIndex].addSize[index]?.price * parseFloat(e.target.value)) / 100;
            console.log(payoutPrice,'payoutPricepayoutPrice')
            setValue(`addVariant.${getIndex}.addSize.${index}.SellingPrice`, payoutPrice.toFixed(2));
        }
      
      };

    useEffect(() => {
        calculationPayOutFunction()
    }, [priceValue, discountValue12, discountInAll])

    // call api for color listing and size listing

    useEffect(() => {
        if (viewAddVariantData) {
            dispatch({ type: SELLER_COLOR })
            dispatch({ type: SELLER_SIZE })
        }
    }, [viewAddVariantData])

    ///// for add color in dropDown color list /// 
    const addType = () =>{
    const finalData = colorData
        return [...finalData,{name:"Add Color"}]
    } 
   ///// end color drop down  //////
    return (
        <>
            {isloading && <Loader />}
            <form
                className="add-product-variant add-catalog-steps"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="white-bg variant-details-wrapper">
                    {/* {viewAddVariantData ? <Link to={-1}>Back</Link> : "" } */}
                    <div className="title-wrapper">
                        Product Variant Details
                        <div className="title-right">
                            <button type="submit" className="solid-red-btn">
                                Submit Variant
                            </button>
                        </div>
                    </div>
                </div>
                {fields?.map((list, index) => {
                    return (
                        <React.Fragment key={list?.id}>
                            <div className="variant-wrapper white-bg" onClick={() => setVariantIndex(index)}>
                                <div className="delete-variant">
                                    {fields.length > 1 && (
                                        <img
                                            src={DeleteIcon}
                                            alt="not found"
                                            onClick={() => {
                                                setDeleteModalShow(true)
                                                setDelId(index)
                                            }}
                                        />
                                    )}
                                </div>
                                <Row className="gy-3">
                                    <Col lg="12">
                                        <div className="upload-images-box mt-3">
                                            <div className="title">
                                                Upload Images
                                            </div>

                                            <Controller
                                                name={`addVariant.${index}.file`}
                                                control={control}
                                                render={({ field }) => (
                                                    <ul className="image-gallary">
                                                        {field.value?.map(
                                                            (upFiles, i) => (
                                                                <React.Fragment
                                                                    key={i}
                                                                >
                                                                    <li>
                                                                        <div className="image-wrapper">
                                                                            <img
                                                                                key={
                                                                                    i
                                                                                }
                                                                                src={
                                                                                    upFiles.blobUrl
                                                                                }
                                                                                className="thumnail-image"
                                                                                alt=" not found"
                                                                            />
                                                                            <img
                                                                                src={
                                                                                    DeleteRoundIcon
                                                                                }
                                                                                alt=" not found"
                                                                                className="close-icon"
                                                                                onClick={() =>
                                                                                    removeImages(
                                                                                        i,
                                                                                        index,
                                                                                        upFiles?.id
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </li>
                                                                </React.Fragment>
                                                            )
                                                        )}
                                                    </ul>
                                                )}
                                            />
                                        </div>
                                        {errors && (
                                            <span
                                                className="invalid mb-3 d-inline-block"
                                                style={{ color: 'red' }}
                                            >
                                                {/* {submitCount !== 0 && */}
                                                {
                                                    errors?.addVariant?.[index]
                                                        ?.file?.message
                                                }
                                                {/* } */}
                                            </span>
                                        )}
                                        {fileRejectionError &&
                                            fileRejectionError}
                                    </Col>
                                    <Col lg="12" className="mb-3 mt-0">
                                        <button
                                            type="button"
                                            className="solid-black-btn upload-btn"
                                            onClick={() =>
                                                handleButtonClick(index)
                                            }
                                        >
                                            Upload Photo
                                        </button>
                                        <Controller
                                            control={control}
                                            name={`addVariant.${index}.file`}
                                            render={({
                                                field: { onChange }
                                            }) => (
                                                <AddImages
                                                    control={control}
                                                    watch={watch}
                                                    index={index}
                                                    name={`addVariant.${index}.file`}
                                                    register={register}
                                                    errors={errors}
                                                    setValue={(value) => {
                                                        onChange(value)
                                                    }}
                                                    setError={setError}
                                                    setFileRejectionError={
                                                        setFileRejectionError
                                                    }
                                                    // fileRejectionError={(e) => {
                                                    //   setFileRejectionError(e);
                                                    // }}
                                                />
                                            )}
                                        />
                                    </Col>
                                    <Col lg="12">
                                        <div className="color-wrapper">
                                            <div className="add-basic-details-form add-product-variant-form">
                                                <Row>
                                                    <Col xl="3" lg="6" md="6">
                                                        <div className="form-group">
                                                            <label>
                                                                Color
                                                                <span className="error">
                                                                    *
                                                                </span>
                                                                <img
                                                                    src={
                                                                        Exlmation
                                                                    }
                                                                    className="error-icon"
                                                                    alt="not found"
                                                                />
                                                            </label>
{/* {console.log("*****",SCOLOR ?? index,first,colorData?.filter((e)=>!first?.includes(e?._id)))} */}
                                                            <DropDown
                                                                DropDownCategory={colorData?.filter((e)=>!first?.includes(e?._id))}
                                                                // DropDownCategory={addType()}
                                                                control={
                                                                    control
                                                                }
                                                                setfirst={(ert)=>{
                                                            
                                                                    let a = [...first]
                                                                    a[SCOLOR ?? index]= ert?._id
                                                                    console.log(a,"1a1");
                                                                    setfirst(a)
                                                                }}
                                                                ddname="name"
                                                                name={`addVariant.${index}.color`}
                                                                // colorData
                                                                setColorModalShow={
                                                                    setColorModalShow
                                                                }
                                                            />
                                                            {errors && (
                                                                <span
                                                                    className="invalid"
                                                                    style={{
                                                                        color: 'red'
                                                                    }}
                                                                >
                                                                    {/* {submitCount !== 0 && */}
                                                                    {
                                                                        errors
                                                                            ?.addVariant?.[
                                                                            index
                                                                        ]?.color
                                                                            ?.message
                                                                    }
                                                                    {/* } */}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </Col>

                                                    <Col xl="3" lg="6" md="6">
                                                        <div className="form-group">
                                                            <label>
                                                                Discount(%)
                                                            </label>
                                                            <input
                                                                type="number"
                                                                name={`addVariant.${index}.discountInOne`}
                                                                {...register(
                                                                    `addVariant.${index}.discountInOne`
                                                                )}
                                                                onChange={(e) =>{
                                                                    // setfour(e.target.value)
                                                                    handlePriceChange(e, index)
                                                                    setDiscountValue12(e.target.value)
                                                                    }
                                                                }
                                                                defaultValue={
                                                                    discountInAll
                                                                        ? discountInAll
                                                                        : discountValue12
                                                                }
                                                            />
                                                            {/* {errors && (
                                <span
                                  className="invalid"
                                  style={{ color: "red" }}
                                >
                                  {errors?.addVariant?.[index]?.discount?.message}
                                </span>
                              )} */}
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </div>

                                        <AddSizes
                                        variantIndex={variantIndex}
                                        startName={'addVariant'}
                                            viewCatalogEditVariantDataList={
                                                viewCatalogEditVariantDataList
                                            }
                                            addVariantEditDataList={
                                                addVariantEditDataList
                                            }
                                            errors={errors}
                                            name={`addVariant.${index}.addSize`}
                                            index={index}
                                            control={control}
                                            register={register}
                                            watch={watch}
                                            getValues={getValues}
                                            setValue={setValue}
                                            setPriceValue={setPriceValue}
                                            priceValue={priceValue}
                                            setDiscoutName={setDiscoutName}
                                            discountValue12={discountValue12}
                                            payOutValue={payOutValue}
                                            reset={reset}
                                            updateVariantData={
                                                viewAddVariantData?.addVariant
                                            }
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </React.Fragment>
                    )
                })}
                {
                    addVariantEditDataList?.length === 0 && (
                        // (viewCatalogEditVariantDataList?.length === 0 && (
                        <button
                            type="button"
                            className="solid-red-btn custom-margin"
                            onClick={() => {
                                append({})
                            }}
                        >
                            <Plus />
                            Add Variant
                        </button>
                    )
                    // ))
                }
            </form>

            {/* Add Color Model Start */}
            <AddColorModel
                setColorModalShow={setColorModalShow}
                colorModalShow={colorModalShow}
            />
            {/* Add Color Model Ends */}

            {/* Delete Variant Model Start */}
            <ModalPopup
                show={deleteModal}
                handleClose={() => setDeleteModalShow(true)}
                handleShow={() => setDeleteModalShow(true)}
                cname="accept-item confirm-modal delete-modal"
            >
                <img src={DeleteRedIcon} alt="" />
                <h2>Do you want to delete your variant?</h2>
                <div className="modal-btn-group">
                    <Button
                        type="button"
                        commonClass="border-red-btn modal-btn"
                        text={'No'}
                        onClick={() => setDeleteModalShow(false)}
                    />
                    <Button
                        type="button"
                        commonClass="solid-red-btn modal-btn"
                        text={'Yes'}
                        onClick={() => {
                            remove(delId)
                            setDeleteModalShow(false)
                        }}
                    />
                </div>
            </ModalPopup>
            {/* Delete Variant Model Ends */}
        </>
    )
}

export default AddVariant
