import React, { useEffect, useState } from "react";
import { ReactComponent as Plus } from "../../../../../../../../assets/images/icons/icon-plus-white.svg";
import EditIcon from "../../../../../../../../assets/images/icons/icon-edit-black.svg";
import BinIcon from "../../../../../../../../assets/images/icons/bin-icon.svg";
import supplychain from "../../../../../../../../assets/images/supplychain.svg";
import RightSignIcon from "../../../../../../../../assets/images/icons/right-sign.svg";
import Loader from '../../../../../../../../components/Loader'
import {
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableListing from "../../../../../../../../components/TableListing/TableListing";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../../../../../components/Button/Button";
import ModalPopup from "../../../../../../../../components/Modal/ModalPopup";
import { useNavigate } from "react-router-dom";
import { sellerDeleteProductSuccess, sellerEditProductSuccess, showingPopup } from "../../../../../../../../Redux-Toolkit/Slices/catalogSlice";
import { SELLER_ADDPRODUCT } from "../../../../../../../../Redux-Toolkit/Actions/sagaActions";
import { loadInitialVariantDataFromIndexedDB } from "../../../../../../../../Functions/indexdb";
import { catalogsupload } from "../../../../../../../../config/routingConsts";
import DeleteRedIcon from '../../../../../../../../assets/images/icons/delete-red-icon.svg'


const ProductListing = ({ setActive, setAddVariant}) => {
  const ProductBD = JSON.parse(sessionStorage.getItem("ProductBD"));
  // const viewProductDD = JSON.parse(sessionStorage.getItem("addVariantList")||"[]")
  const [show, setShow] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [category,setCategory] = useState(null)
  const[productBD,setProductBD] = useState(null)
  const { addVariantDataList,isloading } = useSelector((action) => action.catalogSlice);
  // const [isChecked,setIsChecked] = useState([])
//  console.log(viewProductDD,"viewProductDD")

console.log(addVariantDataList,"addVariantDataList");
  const transformDataForTable = (data) => {
    return data?.map((item,index) => ({
      // checkBox: (
      //   <input
      //     type="checkbox"
      //     // checked={isChecked[index] || false}
      //     onChange={() => alert('')}
      //   />
      // ),
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
      size: item?.addSize?.map((size) => size?.size?.name).join(","),  
      availableQty: item?.addSize?.map((qty) => qty?.availableQty).join(","),
      price: item?.addSize?.map((price) => price?.price).join(","),
      action: (
        <div className="action">
          {console.log(item,"HHHHH")}
          <span className="edit-btn" onClick={()=> {
            dispatch(sellerEditProductSuccess({addVariant:[item],key:item?.id}))
            setAddVariant(true)
          JSON.stringify(sessionStorage.setItem('AddVariant',true))

          } }>
            <img src={EditIcon}  />
            Edit
          </span>
          <span className="delete-btn" onClick={()=>{
            deleteModalFunction(item?.id)
            console.log(index,"index")
            // setfirst(index)
            // dispatch (sellerDeleteProductSuccess(item?.id))} 
          }}>
            <img src={BinIcon} />
            Delete
          </span>
        </div>
      ),
      // size :
    }));
  };

  const columnHelper = createColumnHelper();

  const columns = [
    // columnHelper.display({
    //   id: "checkBox",
    //   header: (
    //     <input
    //     checked={addVariantDataList.length === isChecked.length}
    //       type="checkbox"
    //       onChange={(e) => {
    //         if(e.target.checked){
    //           console.log(Array.from({length:addVariantDataList.length},(_,i)=>i),"kkkkkkkkkkkkk")
    //           setIsChecked(Array.from({length:addVariantDataList.length},(_,i)=>i))
    //         } else{
    //           setIsChecked([])
    //         }
    //       }}
    //     />
    //   ),
    //   cell: (row, index) => (
    //     <input
    //       type="checkbox"
    //       onChange = {(e) => {
    //           setIsChecked((pre)=> {
    //             if(pre.includes(row.row.index)){
    //               return pre.filter((e)=> e !== row.row.index )
    //             } else{
    //               return [...pre,row.row.index]
    //             }
    //           })
    //       }}
    //       checked={isChecked.includes(row?.row?.index)}
    //       // checked={isChecked[index] || false}
    //     />
    //   ),
    //   width: 40,
    // }),
    columnHelper.display({  
      id: "productImages",
      header: () => "Variant Photos",
      cell: (row) => row?.row?.original?.productImages,
    }),
    columnHelper.accessor((row) => row?.color, {
      id: "color",
      header: () => "Color",
    }),
    columnHelper.accessor((row) => row?.size, {
      id: "size",
      header: () => "Size",
    }),
    columnHelper.accessor((row) => row?.availableQty, {
      id: "availableQty",
      header: () => "Available Qty",
    }),
    columnHelper.accessor((row) => row?.price, {
      id: "price",
      header: () => "Price",
    }),
    columnHelper.display({
      id: "action",
      header: () => "Action",
      cell: (row) => row?.row?.original?.action,
    }),
  ];

  // Transform the viewProductDD data
  
  const transformedData = transformDataForTable(addVariantDataList);
  const table = useReactTable({
    data: transformedData || [] ,
    columns: columns || [] ,
    // createColumnHelper : getCreateColumnHelper(),
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
  });
  useEffect(()=> {
    if(sessionStorage.getItem('selectCG')){
      const Category = JSON.parse(sessionStorage.getItem('selectCG'))
      setCategory(Category)
    } if(sessionStorage.getItem('ProductBD')){
      const ProductBD = JSON.parse(sessionStorage.getItem('ProductBD'))
      setProductBD(ProductBD)
    }
  },[sessionStorage.getItem('selectCG'),sessionStorage.getItem('ProductBD')])

useEffect(()=> {
  dispatch(loadInitialVariantDataFromIndexedDB())
},[])


 ////// Delete Modal function /////
 const [deleteModalShow,setDeleteModalShow] = useState(false)
const [delID,setDelID] = useState(null)
const deleteModalFunction = (e) =>{
  setDeleteModalShow(true)
  setDelID(e)
}
////// End delete modal finction ////



  const SubmitCatalog = () => {
    // alert('helloooo')
     const FinalData = addVariantDataList.map((res)=> {
      const {id,...rest} = res
      const modifiedSizes = res.addSize.map((size) => ({
        size: size.size._id,
        availableQty: size.availableQty,
        price: size?.price,
      }));
      const modifiedFiles = res.file.map((file) => ({
          blobUrl: file.blobUrl,
          imageName: file.imageName,
      }));
    
      return {
        ...rest,
        color: res?.color?._id,
        addSize: modifiedSizes,
        file: modifiedFiles,
      };
    })
    console.log(FinalData,"@@@");
    dispatch({type: SELLER_ADDPRODUCT,payload : {
      mainCategoryId : category?.mainCategory?._id,
      categoryId : category?.subCategory?.categoryId,
      productName : productBD?.productTitle,
      discountInAll :(productBD?.discountInAll),
      productWeight : productBD?.productWeight,
      materialId : productBD?.productMaterial?._id,
      typeId : productBD?.type?._id,
      countryId : productBD?.country?._id,
      gst : productBD?.gst,
      shippingTimeId: productBD?.estimatedTime?.id,
      description : productBD?.description,
      addVariant : FinalData,
    },
    callback : ()=>{
      navigate("/catalogsupload")
      dispatch(showingPopup(1))
    }
  
  })
    // navigate("/catalogsupload")
    // dispatch(showingPopup(1))
    // sessionStorage.removeItem("ProductBD")
    // sessionStorage.removeItem("selectCG")
    // sessionStorage.removeItem("addVariantDataList")
    // discountInAll :parseFloat(productBD?.discountInAll)     this is for when i pass paylod then disountInAll is pass in number type
  }

  return (
    <>
      <div className="white-bg">
        <div className="title-wrapper">
          Product Variant Details
          <div className="title-right">
            <input type="search" placeholder="Search" />
            <button
              type="button"
              className="solid-red-btn"
              onClick={() => {
                setAddVariant(true);
                sessionStorage.setItem("AddVariant", JSON.stringify(true));
              }}
            >
              <Plus />
              Add Variant
            </button>
          </div>
        </div>
      </div>
      {/* {isloading && <Loader/>} */}
      <div className="white-bg product-listing">
        <div className="product-detail-box">
          <div className="detail-left">
            <div className="product-title">
              {ProductBD && ProductBD?.productTitle}
            </div>
            <ul className="product-list">
              <li>
                Product Weight (gms):{" "}
                <b>
                  {ProductBD &&ProductBD?.productWeight}
                </b>
              </li>
              <li>
                {" "}
                Product Material:{" "}
                <b>
                  {ProductBD && ProductBD?.productMaterial?.name}
                </b>
              </li>
              <li>
                Type:{" "}
                <b>
                  {ProductBD && ProductBD?.type?.name}
                </b>
              </li>
              <li>
                Country of Origin:{" "}
                <b>
                  {ProductBD && ProductBD?.country?.name}
                </b>
              </li>
              <li>
                GST%:{" "}
                <b>
                  {ProductBD && ProductBD?.gst}
                </b>
              </li>
            </ul>
            {/* <div className="desc">
              <span>Description: </span>
              {ProductBD && ProductBD?.description}
            </div> */}
          </div>
          <div
            className="detail-right"
            onClick={() => {
              setActive(1);
              sessionStorage.setItem("editBD", 1);
            }}
          >
            Edit Product basic details
          </div>
        </div>
       
        {addVariantDataList?.length === 0 && (
          <div className="add-variant-box">
            <img src={supplychain} alt="supplychain" />
            <div className="title">You haven’t added variant over here.</div>
            <div className="sub-title">So please add the variant here.</div>
            <button type="button" className="solid-red-btn"  onClick={() => {
                setAddVariant(true);
                sessionStorage.setItem("AddVariant", JSON.stringify(true));
              }}>
              <Plus />
              Add Variant
            </button>
          </div>
        )}
      </div>
      {/* {isloading && <Loader /> }  */}
      {addVariantDataList?.length !== 0 && (
        <div className="product-listing">
          <TableListing table={table} addVariantDataList={addVariantDataList} />
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
              onClick={SubmitCatalog }
            />
          </div>
        </div>
      )}

      {/* Delete Modal on variant list */}
      <ModalPopup
                show={deleteModalShow}
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
                          dispatch(sellerDeleteProductSuccess(delID))
                          setDeleteModalShow(false)
                        }}
                    />
                </div>
            </ModalPopup>
      {/* Delete Modal End */}
    </>
  );
};

export default ProductListing;


