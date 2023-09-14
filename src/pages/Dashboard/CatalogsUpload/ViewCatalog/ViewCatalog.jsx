import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as IconBackArrow } from "../../../../assets/images/icons/icon-back-red.svg";
import Button from '../../../../components/Button/Button'
import TableListing from '../../../../components/TableListing/TableListing'
import ModalPopup from '../../../../components/Modal/ModalPopup'
import DeleteRedIcon from '../../../../assets/images/icons/delete-red-icon.svg'
import {
    DELETE_VIEW_PRODUCT_VARIANT_DATA,
    SELLER_ADDPRODUCT,
    VIEW_CATALOG_DATA_LIST
} from '../../../../Redux-Toolkit/Actions/sagaActions'
import BinIcon from '../../../../assets/images/icons/bin-icon.svg'
import EditIcon from '../../../../assets/images/icons/icon-edit-black.svg'
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'
import AddProductBasicDetails from '../AddCatalog/components/AddProductBasicDetails'
import { ReactComponent as Plus } from '../../../../assets/images/icons/icon-plus-white.svg'
import {
    removeIndexDBData,
    sellerDeleteProductSuccess,
    sellerEditProductSuccess,
    showingPopup,
    viewcatalogEditVariant
} from '../../../../Redux-Toolkit/Slices/catalogSlice'
import AddVariant from '../AddCatalog/components/AddProductVariant/InnerComponents/AddVariant/AddVariant'
import { catalogsupload, resetpassword } from '../../../../config/routingConsts'
import { useForm } from 'react-hook-form'
import {
    loadInitialVariantDataFromIndexedDB,
    storeDataInIndexedDB
} from '../../../../Functions/indexdb'
import { deleteDB, openDB } from 'idb'

const ViewCatalog = () => {
    const { id } = useParams()
    const { reset } = useForm({ mode: 'all' })
    const {
        viewCatalogDataList,
        viewCatalogEditVariantDataList,
        addVariantDataList,
        isloading
    } = useSelector((action) => action?.catalogSlice)
    const getSessionEditData = JSON.parse(sessionStorage.getItem('ProductBD'))

    const [subBtnDisable,setSubBtnDisable] = useState(false)

// console.log(viewCatalogDataList?.data?.id,"999",viewCatalogDataList?.data?.addVariant?.[0]?.variantId);
    const [first, setfirst] = useState(null)
    console.log(addVariantDataList,"***update",isloading);
    const [addVariant, setAddVariant] = useState(false)
    const dispatch = useDispatch()
    const [no, setNo] = useState(0)
    const navigate = useNavigate()
    const {pathname,state} = useLocation()
    console.log(state,"---state---");
    const [deleteModal,setDeleteModalShow] = useState(false)

  
////////// delete index db ////////
    useEffect(() => {
        dispatch({ type: VIEW_CATALOG_DATA_LIST, payload: { catalogId: id } })
        // if(pathname)
        return async () => {
            sessionStorage.removeItem('ProductBD')
            const dbName = 'myIndexedDB'
            try {
                await deleteDB(dbName) // Delete the entire IndexedDB database
            } catch (error) {
                console.error('Error deleting IndexedDB database:', error)
            }
        }
    }, [id])

/////////// end index db //////

    /////// delete modal show //////
    const [delID,setDelID] = useState(null)
    const deleteModalFunction = (e) =>{
        setDeleteModalShow(true)
        setDelID(e)
    }

    const onDeleteYesBtnClick = () =>{
        if(delID?.variantId){
            dispatch({type:DELETE_VIEW_PRODUCT_VARIANT_DATA,payload:{catalogId:viewCatalogDataList?.data?.id,variantId:delID?.variantId},
                callback:()=>{
                    dispatch(sellerDeleteProductSuccess(delID?.indexDbId))
                }
            })
        } else{
            dispatch(sellerDeleteProductSuccess(delID?.indexDbId))
        }
        setDeleteModalShow(false)
        // dispatch(sellerDeleteProductSuccess(delID?.indexDbId))
    }
    /////// delete modal show end ///




    ////// index DB
    useEffect(() => {
        if (viewCatalogDataList?.data?.addVariant?.length > 0) {
            dispatch(loadInitialVariantDataFromIndexedDB())
        }
    }, [viewCatalogDataList?.data?.addVariant?.length])



    useEffect(() => {
        //////// Add variant start/////
        // if (viewCatalogEditVariantDataList?.length !== 0) {
        // console.log(viewCatalogEditVariantDataList, 'VVVVVVVVVVVVV')
        const XYZ = viewCatalogDataList?.data?.addVariant?.map((res, index) => {
            const ABC = res?.variantList?.map((v) => ({
                availableQty: v?.availableQty,
                price: v?.mrp,
                SellingPrice: v?.sellingPrice,
                size: { name: v?.size, _id: v?.sizeId}
            }))
            const PQR = res?.productImages?.map((Y) => ({
                blobUrl: Y?.image,
                preview: Y?.image,
                id : Y?._id
            }))
            return {
                color: { name: res?.color, _id: res?.colorId },
                file: PQR,
                addSize: ABC,
                variantId : res?.variantId,
                discountInOne: res?.discountInOne,
                id: index + 1
            }
        })
        const finalDataresult = { addVariant: XYZ }
        console.log(finalDataresult, 'XYZ')
        dispatch(storeDataInIndexedDB({ addData: XYZ }))
        // }
        ////// Add variant end

       /////////// indexDB delete previous data ///////

    //    const deleteDataFromIndexedDB = async (key) => {
    //     const dbName = 'myIndexedDB';
    //     const storeName = 'variants';
    //     const db = await openDB(dbName, 1);
    
    //     if (db) {
    //         const tx = db.transaction(storeName, 'readwrite');
    //         const store = tx.objectStore(storeName);
    
    //         try {
    //             await store.delete(key);
    //             dispatch(sellerDeleteProductSuccess(key)); // Dispatch action to update Redux state
    //         } catch (error) {
    //             console.error('Error deleting data from IndexedDB:', error);
    //         } 
    //         // finally {
    //         //     tx.done;
    //         // }
    //         db.close();
    //     }
    // };

       ////////// End previous data //////



        // //// make new array for getting data from view api ////
        // const NEWARAY = {
        //     description: viewCatalogDataList?.data?.description,
        //     estimatedTime: {
        //         name: viewCatalogDataList?.data?.shippingTime,
        //         id: viewCatalogDataList?.data?.shippingTimeId
        //     },
        //     gst: viewCatalogDataList?.data?.gst,
        //     country: {
        //         name: viewCatalogDataList?.data?.countryName,
        //         id: viewCatalogDataList?.data?.countryId
        //     },
        //     type: {
        //         name: viewCatalogDataList?.data?.type,
        //         id: viewCatalogDataList?.data?.typeId
        //     },
        //     productMaterial: {
        //         name: viewCatalogDataList?.data?.materialName,
        //         id: viewCatalogDataList?.data?.materialId
        //     },
        //     productWeight: viewCatalogDataList?.data?.productWeight,
        //     productTitle: viewCatalogDataList?.data?.productName,
        //     discountInAll: viewCatalogDataList?.data?.discountInAll
        // }
        // sessionStorage.setItem('ProductBD', JSON.stringify(NEWARAY))
        // setSessionGetData(JSON.parse(sessionStorage.getItem('ProductBD')))
        ///// end array for view api ////
    }, [viewCatalogDataList?.data?.addVariant?.length])

    // ///// end indexDB

    ///// new useEffect ///
    //  useEffect(() => {
    //   const variable = (JSON.parse(sessionStorage.getItem('ProductBD')))
    //   setSessionGetData(variable)
    //  }, [getSessionEditData])

    // end ///

    // const transformDataForTable = (data) => {
    //     console.log(data?.addVariant,"table data in view");
    //     return data?.addVariant?.map((item,index) => ({
    //       productImages: (
    //         <div className="product-thumbnail">
    //           {item?.productImages?.length > 0 && (
    //             <>
    //               <img
    //                 key={item?.productImages?.[0]?._id}
    //                 className=""
    //                 src={item?.productImages?.[0]?.image}
    //                 alt="product-image"
    //                 // style={{height:"200px",weidth:"200px"}}
    //               />
    //               <div className="variant-count">
    //                 +{item?.productImages?.length}
    //               </div>
    //             </>
    //           )}
    //         </div>
    //       ),
    //       color: item?.color,
    //       size : item?.variantList?.map((s)=>s?.size),
    //       availableQty: item?.variantList?.map((s)=>s?.availableQty).join(","),
    //       price: item?.variantList?.map((s)=>s?.sellingPrice).join(","),
    //       action: (
    //         <div className="action">
    //           <span className="edit-btn"
    //           onClick={()=> {
    //             console.log("edit");
    //             dispatch(viewcatalogEditVariant({addVariant:[item],key:item?.variantId}))
    //             // dispatch(sellerEditProductSuccess({addVariant:[item],key:item?.id}))
    //             setAddVariant(true)
    //           // JSON.stringify(sessionStorage.setItem('AddVariant',true))
    //         }}
    //           >
    //             <img src={EditIcon}  />
    //             Edit
    //           </span>

    //           <span className="delete-btn"
    //             // onClick={()=> dispatch (sellerDeleteProductSuccess(item?.id))}
    //             >
    //             <img src={BinIcon} />
    //             Delete
    //           </span>
    //         </div>
    //       ),
    //       // size :
    //     }));
    //   };

    //   const columnHelper = createColumnHelper();

    //   const columns = [
    //     columnHelper.display({
    //       id: "productImages",
    //       header: () => "Variant Photos",
    //       cell: (row) => row?.row?.original?.productImages,
    //     }),
    //     columnHelper.accessor((row) => row?.color, {
    //       id: "color",
    //       header: () => "Color",
    //     }),
    //     columnHelper.accessor((row) => row?.size, {
    //       id: "size",
    //       header: () => "Size",
    //     }),
    //     columnHelper.accessor((row) => row?.availableQty, {
    //       id: "availableQty",
    //       header: () => "Available Qty",
    //     }),
    //     columnHelper.accessor((row) => row?.price, {
    //       id: "price",
    //       header: () => "Price",
    //     }),
    //     columnHelper.display({
    //       id: "action",
    //       header: () => "Action",
    //       cell: (row) => row?.row?.original?.action,
    //     }),
    //   ];

    // Transform the viewProductDD data

    // const transformedData = transformDataForTable(viewCatalogDataList?.data);

    /////// update new table  HHHH/////

    const transformDataForTable = (data) => {
        console.log(data, 'data')
        return data?.map((item, index) => ({
            productImages: (
                <div className="product-thumbnail">
                    {item?.file?.length > 0 && (
                        <>
                            <img
                                key={item?.file[0]?._id}
                                className=""
                                src={item?.file[0]?.blobUrl}
                                alt="product-image"
                            />
                            <div className="variant-count">
                                +{item?.file?.length}
                            </div>
                        </>
                    )}
                </div>
            ),
            color: item?.color?.name,
            // color:item?.color?.colorId,
            size: item?.addSize?.map((size) => size?.size?.name).join(','),
            availableQty: item?.addSize
                ?.map((qty) => qty?.availableQty)
                .join(','),
            price: item?.addSize?.map((price) => price?.price).join(','),
            action: (
                <div className="action">
                    {/* {console.log(item,'item')} */}
                    {console.log(item,'123')}
                    <span
                        className="edit-btn"
                        onClick={() => {
                            console.log(index,"index")
                            setfirst(index)
                            dispatch(
                                sellerEditProductSuccess({
                                    addVariant: [item],
                                    key: item?.id
                                })
                            )
                            setAddVariant(true)
                        }}
                    >
                        <img src={EditIcon} />
                        Edit
                    </span>
                    <span
                        className="delete-btn"
                        // onClick={()=>{deleteModalFunction(item?.id,item?.addVariant?.map((varID)=>varID?.variantId))}
                        onClick={()=> {
                            
                            deleteModalFunction({indexDbId :item?.id, variantId : item?.variantId})
                        }}
                        //   setDeleteModalShow(true)
                          // dispatch(sellerDeleteProductSuccess(item?.id))
                        // }
                    >
                        <img src={BinIcon} />
                        Delete
                    </span>
                </div>
            )
            // size :
        }))
    }

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.display({
            id: 'productImages',
            header: () => 'Variant Photos',
            cell: (row) => row?.row?.original?.productImages
        }),
        columnHelper.accessor((row) => row?.color, {
            id: 'color',
            header: () => 'Color'
        }),
        columnHelper.accessor((row) => row?.size, {
            id: 'size',
            header: () => 'Size'
        }),
        columnHelper.accessor((row) => row?.availableQty, {
            id: 'availableQty',
            header: () => 'Available Qty'
        }),
        columnHelper.accessor((row) => row?.price, {
            id: 'price',
            header: () => 'Price'
        }),
        columnHelper.display({
            id: 'action',
            header: () => 'Action',
            cell: (row) => row?.row?.original?.action
        })
    ]

    ////// table end HHHH ///
    console.log(addVariantDataList,"ABCD");
    const transformedData = transformDataForTable(addVariantDataList)
    const table = useReactTable({
        data: transformedData || [],
        columns: columns || [],
        getCoreRowModel: getCoreRowModel()
    })
    const viewProductBasicDetailData = (id) => {
        // console.log("edit product basic details",id);
        setNo(1)
    }

    /////// submit cataloge function ///////
    const SubmitCatalog = () => {
        setSubBtnDisable(true)
        const FinalData = addVariantDataList.map((res) => {
            const { id, ...rest } = res
            const modifiedSizes = res.addSize.map((size) => ({
                size: size.size._id,
                availableQty: String(size.availableQty),
                price: String(size?.price)
            }))
            const modifiedFiles = res.file.map((file) => ({
                blobUrl: file.blobUrl,
                imageName: file.imageName
            }))

            return {
                // ...rest,
                discountInOne:res?.discountInOne,
                color: res?.color?._id,
                addSize: modifiedSizes,
                file: modifiedFiles.filter((e) => !!e.imageName)
                //  file: modifiedFiles
            }
        })
        console.log(FinalData, 'FinalData')

        dispatch({
            type: SELLER_ADDPRODUCT,
            payload: {
                catalogId: viewCatalogDataList?.data?.id,
                mainCategoryId: viewCatalogDataList?.data?.mainCategoryId,
                categoryId: viewCatalogDataList?.data?.categoryId,
                productName: getSessionEditData
                    ? getSessionEditData?.productTitle
                    : viewCatalogDataList?.data?.productName,
                discountInAll: getSessionEditData
                    ? String(getSessionEditData?.discountInAll)
                    : String(viewCatalogDataList?.data?.discountInAll),
                productWeight: getSessionEditData
                    ? getSessionEditData?.productWeight
                    : viewCatalogDataList?.data?.productWeight,
                materialId: getSessionEditData
                    ? getSessionEditData?.productMaterial?.id
                    : viewCatalogDataList?.data?.materialId,
                typeId: getSessionEditData
                    ? getSessionEditData?.type?.id
                    : viewCatalogDataList?.data?.typeId,
                countryId: getSessionEditData
                    ? getSessionEditData?.country?.id
                    : viewCatalogDataList?.data?.countryId,
                gst: getSessionEditData
                    ? getSessionEditData?.gst
                    : viewCatalogDataList?.data?.gst,
                shippingTimeId: getSessionEditData
                    ? getSessionEditData?.estimatedTime?.id
                    : viewCatalogDataList?.data?.shippingTimeId,
                description: getSessionEditData
                    ? getSessionEditData?.description
                    : viewCatalogDataList?.data?.description,
                addVariant: FinalData
            },
            callback : ()=> { 
                navigate('/catalogsupload')
                dispatch(showingPopup(1)) 
                dispatch(removeIndexDBData())
                setSubBtnDisable(false)
            }
        })
        // navigate('/catalogsupload')
        // dispatch(showingPopup(1))
        // sessionStorage.removeItem("ProductBD")
        // sessionStorage.removeItem("selectCG")
        // sessionStorage.removeItem("addVariantDataList")
        // discountInAll :parseFloat(productBD?.discountInAll)     this is for when i pass paylod then disountInAll is pass in number type
    }

    ////// end submit cataloge //////

    return (
        <>
            {no === 0 && !addVariant ? (
                <>
                    <div className="site-tab-list add-product-variant add-catalog-steps">
                        <div className="white-bg">
                        {/* <Link to={-1} className="tab-btn">
                            <IconBackArrow /> Back
                        </Link> */}
                            <div className="title-wrapper">
                                Product Variant Details
                                <div className="title-right">
                                    {/* <input type="search" placeholder="Search" /> */}
                                    <button
                                        type="button"
                                        className="solid-red-btn"
                                        onClick={() => {
                                            setAddVariant(true);
                                            // sessionStorage.setItem("AddVariant", JSON.stringify(true));
                                        }}
                                    >
                                        <Plus />
                                        Add Variant
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="white-bg product-listing">
                            <div className="product-detail-box">
                                <div className="detail-left">
                                    <div className="product-title">
                                        {/* { viewCatalogData && viewCatalogData?.productName} */}
                                        {/* {viewCatalogDataList?.data && viewCatalogDataList?.data?.productName} */}
                                        {getSessionEditData?.productTitle
                                            ? getSessionEditData?.productTitle
                                            : viewCatalogDataList?.data
                                                  ?.productName}
                                    </div>
                                    <ul className="product-list">
                                        <li>
                                            Product Weight (gms):{' '}
                                            <b>
                                                {/* {ProductBD &&ProductBD?.productWeight} */}
                                                {/* {viewCatalogDataList?.data && viewCatalogDataList?.data?.productWeight} */}
                                                {getSessionEditData?.productWeight
                                                    ? getSessionEditData?.productWeight
                                                    : viewCatalogDataList?.data
                                                          ?.productWeight}
                                            </b>
                                        </li>
                                        <li>
                                            {' '}
                                            Product Material:{' '}
                                            <b>
                                                {/* {ProductBD && ProductBD?.productMaterial?.name} */}
                                                {/* {viewCatalogDataList?.data && viewCatalogDataList?.data?.materialName} */}
                                                {getSessionEditData
                                                    ?.productMaterial?.name
                                                    ? getSessionEditData
                                                          ?.productMaterial
                                                          ?.name
                                                    : viewCatalogDataList?.data
                                                          ?.materialName}
                                            </b>
                                        </li>
                                        <li>
                                            Type:{' '}
                                            <b>
                                                {/* {ProductBD && ProductBD?.type?.name} */}
                                                {/* {viewCatalogDataList?.data && viewCatalogDataList?.data?.type} */}
                                                {getSessionEditData?.type?.name
                                                    ? getSessionEditData?.type
                                                          ?.name
                                                    : viewCatalogDataList?.data
                                                          ?.type}
                                            </b>
                                        </li>
                                        <li>
                                            Country of Origin:{' '}
                                            <b>
                                                {/* {ProductBD && ProductBD?.country?.name} */}
                                                {/* {viewCatalogDataList?.data && viewCatalogDataList?.data?.countryName} */}
                                                {getSessionEditData?.country
                                                    ?.name
                                                    ? getSessionEditData
                                                          ?.country?.name
                                                    : viewCatalogDataList?.data
                                                          ?.countryName}
                                            </b>
                                        </li>
                                        <li>
                                            GST%:{' '}
                                            <b>
                                                {/* {ProductBD && ProductBD?.gst} */}
                                                {/* {viewCatalogDataList?.data && viewCatalogDataList?.data?.gst} */}
                                                {getSessionEditData?.gst
                                                    ? getSessionEditData?.gst
                                                    : viewCatalogDataList?.data
                                                          ?.gst}
                                            </b>
                                        </li>
                                    </ul>
                                    {/* <div className="desc">
                  <span>Description: </span>
                  {ProductBD && ProductBD?.description}
                  {viewCatalogDataList?.data && viewCatalogDataList?.data?.description}
                  </div> */}
                                </div>
                                <div
                                    className="detail-right"
                                    onClick={() => {
                                        viewProductBasicDetailData(
                                            viewCatalogDataList?.data?.id
                                        )
                                    }}
                                >
                                    Edit Product basic details
                                </div>
                            </div>
                        </div>
                        {viewCatalogDataList?.data?.addVariant?.length !== 0 && (
                            <div className="product-listing">
                                {/* <TableListing table={table} addVariantDataList={viewCatalogDataList} /> */}
                                <TableListing
                                    table={table}
                                    addVariantDataList={addVariantDataList}
                                />

                                <div className="button-wrapper">
                                    <Button
                                        text="Discard Catalog"
                                        className="solid-black-btn"
                                        type="button"
                                        onClick={()=>{navigate(catalogsupload)}}
                                    />
                                    <Button
                                        type="button"
                                        text="Submit Catalog"
                                        className="solid-red-btn"
                                        onClick={() => SubmitCatalog()}
                                        disabled={subBtnDisable}
                                        // onClick={(e) => {
                                        //   //  alert('123')
                                        //   // setShow(true)
                                        // }}
                                    />
                                </div>
                            </div>
                         )} 
                    </div>
                </>
            ) : !addVariant ? (
                <AddProductBasicDetails
                    viewEdit={viewCatalogDataList?.data}
                    setNo={setNo}
                />
            ) : (
                <AddVariant
                    first={first}
                    setAddVariant={setAddVariant}
                    viewAddVariantData={viewCatalogDataList?.data}
                />
            )}

          {/* Delete Modal */}
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
                            onDeleteYesBtnClick(delID)
                            // setDeleteModalShow(false)
                            // dispatch(sellerDeleteProductSuccess(delID))
                        }}
                    />
                </div>
            </ModalPopup>
          {/* end delete modal */}


        </>
    )
}

export default ViewCatalog
