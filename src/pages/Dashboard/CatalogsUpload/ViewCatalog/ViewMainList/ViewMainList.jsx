// import React from 'react'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import {ReactComponent as Plus} from '../../../../../assets/images/icons/icon-plus-white.svg'
// import { viewCatalogDataList } from '../../../../../config/routingConsts'

// const ViewMainList = () => {
//   const {viewCatalogDataList} = useSelector((action)=>action?.catalogSlice)

//   console.log(viewCatalogDataList,"viewCatalogDataList");

//   const navigate = useNavigate()
//   return (
//     <div className='add-product-variant add-catalog-steps'>
//     <div className="white-bg">
//         <div className="title-wrapper">
//             {/* Product Variant Details */}
//             <h2>View catalog</h2>
//             <div className="title-right">
//                 {/* <input type="search" placeholder="Search" /> */}
//                 <button
//                 type="button"
//                 className="solid-black-btn"
//                 // onClick={() => {navigate(`${viewcatalog}/${item?.id}`)
//                 //     // setAddVariant(true);
//                 //     // sessionStorage.setItem("AddVariant", JSON.stringify(true));
//                 // }}
//                 >
//                 {/* <Plus /> */}
//                 Edit
//                 </button>
//                 <button className='solid-black-btn' type="button">Delete</button>
//             </div>
//             </div>
//             <div className="white-bg product-listing">
//             <div className="product-detail-box">
//             <div className="detail-left">
//                 <div className="product-title">
//                 {/* { viewCatalogData && viewCatalogData?.productName} */}
//                 {viewCatalogDataList?.data && viewCatalogDataList?.data?.productName}
//                 </div>
//                 <ul className="product-list">
//                 <li>
//                     Product Weight (gms):{" "}
//                     <b>
//                     {/* {ProductBD &&ProductBD?.productWeight} */}
//                     {viewCatalogDataList?.data && viewCatalogDataList?.data?.productWeight}

//                     </b>
//                 </li>
//                 <li>
//                     {" "}
//                     Product Material:{" "}
//                     <b>
//                     {/* {ProductBD && ProductBD?.productMaterial?.name} */}
//                     {viewCatalogDataList?.data && viewCatalogDataList?.data?.materialName}

//                     </b>
//                 </li>
//                 <li>
//                     Type:{" "}
//                     <b>
//                     {/* {ProductBD && ProductBD?.type?.name} */}
//                     {viewCatalogDataList?.data && viewCatalogDataList?.data?.type}

//                     </b>
//                 </li>
//                 <li>
//                     Country of Origin:{" "}
//                     <b>
//                     {/* {ProductBD && ProductBD?.country?.name} */}
//                     {viewCatalogDataList?.data && viewCatalogDataList?.data?.countryName}

//                     </b>
//                 </li>
//                 <li>
//                     GST%:{" "}
//                     <b>
//                     {/* {ProductBD && ProductBD?.gst} */}
//                     {viewCatalogDataList?.data && viewCatalogDataList?.data?.gst}

//                     </b>
//                 </li>
//                 </ul>
//                 <div className="desc">
//                 <span>Description: </span>
//                 {/* {ProductBD && ProductBD?.description} */}
//                 {viewCatalogDataList?.data && viewCatalogDataList?.data?.description}

//                 </div>
//             </div>
//             {/* <div
//                 className="detail-right"
//                 onClick={() => {viewProductBasicDetailData(viewCatalogDataList?.data?.id)}}
//             >
//                 Edit Product basic details
//             </div> */}
//             </div>
        
//             {/* {addVariantDataList?.length === 0 && (
//             <div className="add-variant-box">
//                 <img src={supplychain} alt="supplychain" />
//                 <div className="title">You haven’t added variant over here.</div>
//                 <div className="sub-title">So please add the variant here.</div>
//                 <button type="button" className="solid-red-btn">
//                 <Plus />
//                 Add Variant
//                 </button>
//             </div>
//             )} */}
//             </div>
//         </div>
//    </div>
//   )
// }

// export default ViewMainList