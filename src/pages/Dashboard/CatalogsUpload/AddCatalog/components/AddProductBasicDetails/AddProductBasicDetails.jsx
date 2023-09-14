import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Exlmation from "../../../../../../assets/images/icons/exlmation.svg";
import DropDown from "../../../../../../components/DropDown";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_MATERIAL_LIST_DATA,
  ADD_PRODUCT_TYPE_DATA,
  SELLER_ADDPRODUCT,
  SELLER_COUNTRY,
  SELLER_MATERIAL,
  SELLER_TIME,
  SELLER_TYPE,
  VIEW_CATALOG_DATA_LIST,
} from "../../../../../../Redux-Toolkit/Actions/sagaActions";
import Loader from "../../../../../../components/Loader/Loader";
import ModalPopup from "../../../../../../components/Modal/ModalPopup";
import Button from "../../../../../../components/Button/Button";

const AddProductBasicDetails = ({ setActive, viewEdit, setNo, reducer }) => {
  const { data, isloading ,} = useSelector((action) => action.cityStateSlice);
  const {
    isloading: isloadingCatalog,
    timedata,
    materialData,
    selectedData,
    materialSelectedData,
    SelectedtypeData,
    typeData,
  } = useSelector((action) => action.catalogSlice);
  const [editData, setEditData] = useState(null);
  const [addMaterialModal, setAddMaterialModal] = useState(false);
  const [modalInputValue, setModalInputValue] = useState();
  const dispatch = useDispatch();
  const [addTypeModal, setAddTypeModal] = useState(false);

  const validationSchema = yup.object({
    productTitle: yup.string().required("Please Enter Product Title"),
    productWeight: yup.string().required("Please Enter Product Weight"),
    productMaterial: yup.object().required("Please Select Product Material"),
    type: yup.object().required("Please Select Type"),
    country: yup.object().required("Please Select Country"),
    gst: yup
      .string()
      .required("Please Enter GST")
      .matches(/^[0-9]+$/, "Must be only digits")
      .max(3, "GST must be a percentage 100 "),
    estimatedTime: yup.object().required("Please Select Time Duration"),
    description: yup
      .string()
      .required("Please Enter Product Description")
      .max(300, "Type min 300 length Product Description"),
  });

  const validationMaterial = yup.object({
    productMaterial : yup.string().required("Please Enter Product Material.").max(20,"Product Material Must be 0 to 20 Charaters Long.")
  });
  // .test("Custom Type","",(e)=>setModalInputValue(e?.target?.value))
  // .test("Custom Type","",(e)=>setModalInputValue(e?.target?.value))
  const validationType = yup.object({
    productType : yup.string().required("Please Enter Product Type.").max(20,"Product Type Must be 0 to 20 Charaters Long.")
  });

  console.log(addTypeModal,"setAddTypeModal setAddTypeModal setAddTypeModal");
  const { control, register, handleSubmit ,setValue ,formState: { errors },reset} = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
    shouldUnregister:true
  });

  //////// material type ///////
  const { control:controlM, register : registerM, handleSubmit:handleSubmitM  ,formState: { errors : errorsM },reset :resetM}  = useForm({
    resolver: yupResolver(validationMaterial),
    mode: "onChange",
    shouldUnregister:true
  });
  
  const { control: controlT, register :registerT , handleSubmit:handleSubmitT  ,formState: { errors : errorsT },reset:resetT} = useForm({
    resolver: yupResolver(validationType),
    mode: "onChange",
    shouldUnregister:true
  });

  ////////   
console.log(errorsM,"==");

  ////// new useEffect Hiren ////
  useEffect(()=>{
    const NEWARAY = {
      description: viewEdit?.description,
      estimatedTime: {
          name: viewEdit?.shippingTime,
          id: viewEdit?.shippingTimeId
      },
      gst: viewEdit?.gst,
      country: {
          name: viewEdit?.countryName,
          id: viewEdit?.countryId
      },
      type: {
          name: viewEdit?.type,
          id: viewEdit?.typeId
      },
      productMaterial: {
          name: viewEdit?.materialName,
          id: viewEdit?.materialId
      },
      productWeight: viewEdit?.productWeight,
      productTitle: viewEdit?.productName,
      discountInAll: viewEdit?.discountInAll
  }
  sessionStorage.setItem('ProductBD', JSON.stringify(NEWARAY))
  },[])
  //// end useEffcet hiren /// 


   useEffect(()=> {
    // if (sessionStorage.getItem("editBD")){
      const EditData = JSON.parse(sessionStorage.getItem("ProductBD"))
      // sessionStorage.removeItem("editBD")
      setEditData(EditData)
    // }
  }, []);
  
  useEffect(() => {
    if (editData) {
      // const {productTitle,...rest}=editData
      for (let name in editData) {
        setValue(name, editData?.[name]);
      }
    }
    // setValue('productTitle',editData?.productTitle)
  }, [editData]);

  useEffect(() => {
    setValue("productMaterial", selectedData);
  }, [selectedData]);
  
  //type data selected

  useEffect(() => {
    setValue("type", SelectedtypeData);
  }, [SelectedtypeData]);

  const onSubmit = (data) => {
    sessionStorage.setItem("ProductBD", JSON.stringify(data));
    // if (!viewEdit) {
      setActive && setActive(2);
      // sessionStorage.setItem("ProductBD",JSON.stringify(data))
    // } else {
      setNo && setNo(0);
      sessionStorage.setItem("ProductBD", JSON.stringify(data));
    // }
  };

  const addCustomMaterialData = (data) =>{
    dispatch({type : ADD_MATERIAL_LIST_DATA, payload : {materialName:data?.productMaterial}})
    setAddMaterialModal(false)
    resetM()
  }

  const addType = () =>{
    const finalData = typeData
    return [...finalData,{name:"Add Type"}]
  }
  
  const addCustomTypeData = (data) =>{
    dispatch({type : ADD_PRODUCT_TYPE_DATA, payload : {type:data?.productType}})
    setAddTypeModal(false)
    resetT()
  }

  useEffect(() => {
    if (viewEdit) {
      dispatch({ type: SELLER_COUNTRY });
      dispatch({ type: SELLER_TYPE });
      dispatch({ type: SELLER_MATERIAL });
      dispatch({ type: SELLER_TIME });
    }
  }, [viewEdit]);

  console.log(viewEdit?.materialName, "viewEdit 11111111");
  useEffect(() => {
    if(viewEdit){
      if (!JSON.parse(sessionStorage.getItem("ProductBD"))) {
        setValue("productTitle",editData?.productName);
        setValue("productWeight",editData?.productWeight);
        setValue("description",editData?.description);
        setValue("gst",editData?.gst);
        setValue("productMaterial", {
          name:editData?.materialName,
          id:editData?.materialId,
        });
        setValue("country", {
          name:editData?.countryName,
          id:editData?.countryId,
        });
        setValue("type", { name:editData?.type, id:editData?.typeId });
        setValue("estimatedTime", {
          name:editData?.shippingTime,
          id:editData?.shippingTimeId,
        });
        setValue("discountInAll",editData?.discountInAll || 0);
      } 
      else {
        reset(JSON.parse(sessionStorage.getItem("ProductBD")));
      }
    }
    // if editData) {
    //     // Mapping between viewEdit keys and form field names
    //     const mapping = {
    //         productName: 'productTitle',
    //         discount :'discountInAll'
    //         // materialName : 'productMaterial',
    //     };

    //     // Set values for form fields based on the mapping
    //     for (let viewEditKey in viewEdit) {
    //         const formFieldName = mapping[viewEditKey] || viewEditKey;
    //         // console.log(viewEdit[viewEditKey],"formFieldName");
    //         setValue(formFieldName, viewEdit[viewEditKey] || 0);
    //     }
    // }
  }, [viewEdit]);



  const backButtonFunction = () => {
    if (!viewEdit) {
      setActive(0);
    } else {
      setNo(0);
    }
  };

  return (
    <div className="add-product-basic-details add-catalog-steps">
      {/* {(isloading || isloadingCatalog ) && <Loader/> }  */}
      <div className="white-bg">
        {viewEdit ? (
          <div className="title-wrapper">Edit Basic Details</div>
        ) : (
          <div className="title-wrapper">Add Basic Details</div>
        )}
        {/* <div className="title-wrapper">Add Basic Details</div> */}
        <form
          action=""
          className="add-basic-details-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Row>
            <Col lg="3">
              <div class="form-group">
                <label for="">
                  Product Title/Name <span className="error">*</span>
                  <img src={Exlmation} className="error-icon" />
                </label>
                <input
                  type="text"
                  name="productTitle"
                  {...register("productTitle")}
                />
                <span className="invalid" style={{ color: "red" }}>
                  {errors?.productTitle?.message}
                </span>
              </div>
            </Col>
            <Col lg="3">
              <div class="form-group">
                <label for="">
                  Product Weight (gms) <span className="error">*</span>
                  <img src={Exlmation} className="error-icon" />
                </label>
                <input
                  type="number"
                  name="productWeight"
                  {...register("productWeight")}
                  // defaultValue={viewEdit?.productWeight}
                />
                <span className="invalid" style={{ color: "red" }}>
                  {errors?.productWeight?.message}
                </span>
              </div>
            </Col>
            <Col lg="3">
              <div class="form-group">
                <label for="">
                  Product Material <span className="error">*</span>
                  <img src={Exlmation} className="error-icon" />
                </label>

                <DropDown
                  DropDownCategory={materialData}
                  control={control}
                  name="productMaterial"
                  materialDataList
                  setAddMaterialModal={setAddMaterialModal}
                  // valueFromViewEdit={viewEdit?.materialName}
                />
                <span className="invalid" style={{ color: "red" }}>
                  {errors?.productMaterial?.message}
                </span>
              </div>
            </Col>

            <Col lg="3">
              <div className="form-group">
                <label>Discount(%)</label>
                <input
                  type="number"
                  name="discountInAll"
                  {...register("discountInAll")}
                  // defaultValue={viewEdit?.discount}
                  // name={`addVariant.${index}.discount`} {...register(`addVariant.${index}.discount`)} onChange ={(e)=>setDiscountValue(e.target.value)}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="3">
              <div className="form-group">
                <label htmlFor="">
                  Type<span className="error">*</span>
                  <img src={Exlmation} className="error-icon" />
                </label>
                <DropDown
                  DropDownCategory={addType()}
                  control={control}
                  name="type"
                  setAddTypeModal={setAddTypeModal}
                  // setAddMaterialModal={setAddMaterialModal}
                  // TypeDD
                />
                <span className="invalid" style={{ color: "red" }}>
                  {errors?.type?.message}
                </span>
              </div>
            </Col>

            <Col lg="3">
              <div class="form-group">
                <label for="">
                  Country of Origin <span className="error">*</span>
                  <img src={Exlmation} className="error-icon" />
                </label>
                <DropDown
                  DropDownCategory={data}
                  control={control}
                  name="country"
                />
                <span className="invalid" style={{ color: "red" }}>
                  {errors?.country?.message}
                </span>
              </div>
            </Col>
            <Col lg="3">
              <div class="form-group">
                <label for="">
                  GST (%) <span className="error">*</span>
                  <img src={Exlmation} className="error-icon" />
                </label>
                <input type="number" name="gst" {...register("gst")} />
                <span className="invalid" style={{ color: "red" }}>
                  {errors?.gst?.message}
                </span>
              </div>
            </Col>

            <Col lg="3">
              <div className="form-group">
                <label>
                  Estimated Time<span className="error">*</span>
                  <img src={Exlmation} className="error-icon" />
                </label>
                <DropDown
                  DropDownCategory={timedata}
                  control={control}
                  name="estimatedTime"
                  // ddname="estimatedTime"
                />
                <span className="invalid" style={{ color: "red" }}>
                  {errors?.estimatedTime?.message}
                </span>
              </div>
            </Col>




            <Col lg="12">
              <div class="form-group">
                <label>Description</label>
                <div className="input-wrapper">
                  <textarea
                    rows="3"
                    type="text"
                    placeholder="Product Description"
                    className="custom-input"
                    {...register("description")}
                  />
                  <span className="invalid" style={{ color: "red" }}>
                    {errors?.description?.message}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Col lg="12">
            <div className="button-wrapper">
              <button
                type="button"
                class="solid-black-btn"
                onClick={() => {
                  backButtonFunction();
                }}
              >
                Back
              </button>
              <button type="submit" class="solid-red-btn">
                Next
              </button>
            </div>
          </Col>
        </form>
      </div>

              {/* {addMaterialModal || addTypeModal && */}


                <ModalPopup
                    show={addMaterialModal || addTypeModal}
                    handleClose={() =>{ 
                      setAddMaterialModal(false) 
                      setAddTypeModal(false)
                    }}
                    handleShow={() => {
                      setAddMaterialModal(true)
                      setAddTypeModal(true)
                    }}
                    cname="accept-item confirm-modal delete-modal"
                >
                  {addMaterialModal && <>
                  <form onSubmit={handleSubmitM(addCustomMaterialData)}>
                    {/* <div style={{ marginBottom: '50px' }}> */}
                    <h2>Add Product Material</h2>
                    <div className='form-group'>
                        <label>Add Product Material</label>
                        <input
                            type="text"
                            name="productMaterial"
                            autoFocus={false}
                            {...registerM("productMaterial")}
                            autoComplete="off"
                            // onChange={(e)=>{setModalInputValue(e.target.value)}}
                            // ,{onChange:(e)=>setModalInputValue(e?.target?.value)}
                        />
                        {errorsM?.productMaterial?.message && <span style={{color:"red"}}>{errorsM?.productMaterial?.message}</span> }
                    </div>
                    <div className="modal-btn-group">
                        <Button
                            type="button"
                            commonClass="solid-black-btn modal-btn "
                            text="No"
                            onClick={()=>{
                              setAddMaterialModal(false)
                              reset()
                            }}
                            // onClick={() =>{addMaterialModal ?  setAddMaterialModal(false) : setAddTypeModal(false)}}
                        />
                        <Button
                            commonClass="solid-red-btn modal-btn "
                            text="Yes"
                            // onClick={() => {addMaterialModal ? addCustomMaterialData() : addCustomTypeData()}}
                        />
                    </div>
                    </form>
                  </>}

                  {addTypeModal && <>
                    <form onSubmit={handleSubmitT(addCustomTypeData)}>
                    <h2>Add Product Type</h2>
                    {/* <div style={{ marginBottom: '50px' }}> */}
                    <div className='form-group'>
                        <label>Add Product Type</label>
                        <input
                            type="text"
                            name="productType"
                            autoFocus={false}
                            {...registerT('productType',{onChange:(e)=>setModalInputValue(e?.target?.value)})}
                            autoComplete="off"
                            // onChange={(e)=>{setModalInputValue(e.target.value)}}
                        />
                        {errorsT?.productType?.message && <span style={{color:"red"}}>{errorsT?.productType?.message}</span> }
                    </div>
                    <div className="modal-btn-group">
                        <Button
                            type="button"
                            commonClass="solid-black-btn modal-btn "
                            text="No"
                            onClick={()=>{
                              setAddTypeModal(false)
                              resetT()
                            }}
                        />
                        <Button
                            
                            commonClass="solid-red-btn modal-btn "
                            text="Yes"
                            // onClick={() => {addMaterialModal ? addCustomMaterialData() : addCustomTypeData()}}
                        />
                    </div>
                    </form>
                  </>}
                    {/* <div className="modal-btn-group">
                        <Button
                            type="button"
                            commonClass="solid-black-btn modal-btn "
                            text="No"
                            onClick={() =>{addMaterialModal ?  setAddMaterialModal(false) : setAddTypeModal(false)}}
                        />
                        <Button
                            
                            commonClass="solid-red-btn modal-btn "
                            text="Yes"
                            // onClick={() => {addMaterialModal ? addCustomMaterialData() : addCustomTypeData()}}
                        />
                    </div> */}
                </ModalPopup> 
                {/* } */}

    </div>
  );
};

export default AddProductBasicDetails;
