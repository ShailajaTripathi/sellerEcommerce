import { createSlice, current } from "@reduxjs/toolkit";
import Swal from "sweetalert2";
import { SELLER_LOGOUT } from "../Actions/sagaActions";
import { openDB } from "idb";
import { del, loadInitialVariantDataFromIndexedDB } from "../../Functions/indexdb";

const catalogSlice = createSlice({
  name: "catalogs",
  initialState: {
    isloading: false,
    data: [],
    materialData: [],
    colorData: [],
    sizeData: [],
    getMainCategoryData: [],
    getSubCategoryData: [],
    viewProductDD: [],
    ListProductDD: [],
    addVariantDataList: [],
    addVariantEditDataList: [],
    timedata : [],
    addSubCategorydata:[],
    addMaterialData:[],
    viewCatalogDataList:[],
    error: null,
    activePopup:null,
    selectedData:null,
    materialSelectedData:null,
    selectedColorData: null,
    SelectedtypeData : null,
    viewCatalogEditVariantDataList:[],
    typeData: [],
    deleteImage : [],
    deleteVariantData:[]
  },
  reducers: {
      removeIndexDBData (state){
        return {...state,addVariantDataList:[]}
      },
    ////////// on view catalog edit data for add variant ///////
     
      viewcatalogEditVariant(state,action){
        return {...state,isloading : false , viewCatalogEditVariantDataList : action.payload}
      },
     
    /////// end ///////


    /////// delete prvious data from indexDB /////
  //   sellerDeleteProductSuccess: (state, action) => {
  //     // Remove the deleted data from the Redux state
  //     state.addVariantDataList = state.addVariantDataList.filter(
  //         (item) => item.id !== action.payload
  //     );
  // },
    ////// end delete previous data /////



    //////// Delete api on click on image cross icon in cataloge //////
    deleteImageDataRequest(state){
      return {...state,isloading :true}
    },
    deleteImageDataSuccess(state,action){
      return{...state,deletImage : action?.payload , isloading:false}
    },
    deleteImageDataFailure(state,action){
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return {...state,isloading:false}
    },
    /////// End Delete api calling //////







    showingPopup(state,action){
      return { ...state, isloading: true , activePopup : action.payload};
    },
    addSubcategoryRequest(state){
      return { ...state, isloading: true };
    },
    addSubcategorySuccess(state,action){
      return { ...state, addSubCategorydata: action.payload, isloading: false }
    },
    addSubcategoryFailure(state,action){
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return { ...state, isloading: false };
    },
    sellerAppendSubCategoryData(state,action){
      return {...state,getSubCategoryData:[...state.getSubCategoryData,action?.payload]}
    },
    addMaterialRequest(state){
      return { ...state, isloading: true };
    },
    addMaterialSuccess(state,action){
      return { ...state, addMaterialData: action.payload, isloading: false }
    },
    addMaterialFailure(state,action){
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return { ...state, isloading: false };
    },
    sellerAppendMaterialData(state,action){
      return {...state,materialData:[...state.materialData,action?.payload]}
    },
    sellerSelectedMaterialData(state,action){
      return {...state,selectedData:action?.payload}
    },
    // add product type on drop down list 
    addProductTypeRequest(state){
      return { ...state, isloading: true };
    },
    addProductTypeSuccess(state,action){
      return { ...state, addMaterialData: action.payload, isloading: false }
    },
    addProductTypeFailure(state,action){
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return { ...state, isloading: false };
    },

    sellerAppendProductTypeData(state,action){
      return {...state,typeData:[...state.typeData,action?.payload]}
    },

    sellerSelectedTypeData(state,action){
      return {...state,SelectedtypeData:action?.payload}
    },

    // add product color on dropdown list
    addProductColorRequest(state){
      return { ...state, isloading: true };
    },
    addProductColorSuccess(state,action){
      return { ...state, addMaterialData: action.payload, isloading: false }
    },
    addProductColorFailure(state,action){
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return { ...state, isloading: false };
    },

    sellerAppendProductColorData(state,action){
      return {...state,colorData:[...state.colorData,action?.payload]}
    },
    sellerSelectedcolorData(state,action){
      return {...state,selectedColorData:action?.payload}
    },
    sellerTimeRequest(state) {
      return { ...state, isloading: true };
    },
    sellerTimeSuccess(state, action) {
      return { ...state, timedata: action.payload, isloading: false };
    },
    sellerTimeFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return { ...state, isloading: false };
    },



    sellerTypeRequest(state) {
      return { ...state, isloading: true };
    },
    sellerTypeSuccess(state, action) {
      return { ...state, typeData: action.payload, isloading: false };
    },
    sellerTypeFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerMaterialRequest(state) {
      return { ...state, isloading: true };
    },
    sellerMaterialSuccess(state, action) {
      return { ...state, materialData: action.payload, isloading: false };
    },
    sellerMaterialFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerColorRequest(state) {
      return { ...state, isloading: true };
    },
    sellerColorSuccess(state, action) {
      return { ...state, colorData: action.payload, isloading: false };
    },
    sellerColorFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerSizeRequest(state) {
      return { ...state, isloading: true };
    },
    sellerSizeSuccess(state, action) {
      return { ...state, sizeData: action.payload, isloading: false };
    },
    sellerSizeFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerGetMainCategoryRequest(state) {
      return { ...state, isloading: true };
    },
    sellerGetMainCategorySuccess(state, action) {
      return {
        ...state,
        getMainCategoryData: action.payload,
        isloading: false,
      };
    },
    sellerGetMainCategoryFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerGetSubCategoryRequest(state) {
      return { ...state, isloading: true };
    },
    sellerGetSubCategorySuccess(state, action) {
      return { ...state, getSubCategoryData: action.payload, isloading: false };
    },
    sellerGetSubCategoryFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerFinalCatalogSubmitRequest(state, action) {
      return { ...state, isloading: true };
    },
    sellerFinalCatalogSubmitSuccess(state, action) {
      return { ...state, isloading: false, addVariantDataList: [] };
    },
    sellerFinalCatalogSubmitFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerVariantDataFromIndexedDBRequest(state){
      return{...state,isloading:true}
    },
    sellerVariantDataFromIndexedDB(state, action) {
      return { ...state, addVariantDataList: action.payload , isloading:false ,addVariantEditDataList:[],viewCatalogEditVariantDataList:[]};
    },
    viewDataGetInIndexDB(state,action){
      return{...state,addVariantDataList:action.payload, isloading:false ,viewCatalogEditVariantDataList:[]}
    },
    sellerAddProductSuccess(state, action) {
      return {
        ...state,
        // addVariantDataList: [...state.addVariantDataList, ...action.payload],
        // isloading:true  
      };
    },
    sellerDeleteProductSuccess(state, action) {
      // Update IndexedDB and Redux state
      const dbName = "myIndexedDB";
      const storeName = "variants";
      const deletedProductId = action.payload; // Assuming the payload is the ID of the deleted product
      async function deleteDataFromIndexedDB() {
        const db = await openDB(dbName, 1);
        await db.delete(storeName, deletedProductId);
      }
      deleteDataFromIndexedDB()

      // Update Redux state
      const updatedAddVariantDataList = state.addVariantDataList.filter(
        (variant) => variant.id !== deletedProductId
      );

      return {
        ...state,
        addVariantDataList: updatedAddVariantDataList,
        isloading:false 
      };
    },
    sellerEditProductSuccess(state, action) {
      // sessionStorage.setItem("addVariantDataList",JSON.stringify(action.payload))
      return { ...state, addVariantEditDataList: action.payload };
    },
    sellerUpdateProductSuccess(state, action) {
      // Update IndexedDB and Redux state
      const dbName = "myIndexedDB";
      const storeName = "variants";
      const updateData = action?.payload

      console.log(updateData?.[0]?.id,"updateDataupdateDataupdateDataupdateDataupdateData")
      // Update IndexedDB
      async function updateDataInIndexedDB() {
        try {
          const db = await openDB(dbName, 1);
          await db.put(storeName, ...updateData?.addVariant, updateData?.[0]?.id) // Update the product in IndexedDB
        } catch (error) {
          console.error("Error updating IndexedDB:", error);
        }
      }

      updateDataInIndexedDB()

      //   let final = [...current(state.addVariantDataList)]
      //   console.log(final,"ggggggggggggggggggg")
      //   console.log(updateData?.addVariant,"VARIANT")
      //  const UpdateDataFinal = final.splice(updateData?.key,1,updateData?.addVariant)
      //  console.log(UpdateDataFinal,"UpdateDataFinal")
       
      return {
        ...state,
        // addVariantDataList: action.payload,
        addVariantEditDataList: [],
        // isloading:true
      };
    },
    // sellerAddProductFailure(state, action) {
    //   Swal.fire({
    //     type: "error",
    //     position: "center",
    //     // title:action.payload.statusCode,
    //     text: action.payload.message,
    //     // footer: '<a href="">Why do I have this issue?</a>'
    //   });
    //   return { ...state, isloading: false };
    // },
    sellerViewProductDDRequest(state) {
      return { ...state, isloading: true };
    },
    sellerViewProductDDSuccess(state, action) {
      return { ...state, viewProductDD: action.payload, isloading: false };
    },
    sellerViewProductDDFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },
    sellerListProductDDRequest(state) {
      return { ...state, isloading: true };
    },
    sellerListProductDDSuccess(state, action) {
      return { ...state, ListProductDD: action.payload, isloading: false };
    },
    sellerListProductDDFailure(state, action) {
      Swal.fire({
        type: "error",
        position: "center",
        // title:action.payload.statusCode,
        text: action.payload.message,
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      return { ...state, isloading: false };
    },

    // view api calling when i click on view button in catalog listing page
    sellerViewCatalogDetailDataRequest(state){
      return {...state,isLoading : true}
    },
    sellerViewCatalogDetailDataSuccess(state,action){
      return {...state,viewCatalogDataList : action.payload,isloading:false}
    },
    sellerViewCatalogDetailDataFailure(state,action){
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return {...state,isloading:false}
    },

    //////// Delete product's variant data on id when view catalog ////
    variantDeleteProductRequest(state){
      return {...state,isloading : true}
    },
    variantDeleteProductSuccess(state,action){
      return {...state,isloading:false,deleteVariantData: action.payload}
    },
    variantDeleteProductFailure(state,action){
      Swal.fire({
        type: "error",
        position: "center",
        text: action.payload.message,
      });
      return{...state, isloading:false}
    }
    /////// end Delete product's variant data on id when view catalog ////
  },
  extraReducers: (builder) => {
    builder.addCase(SELLER_LOGOUT, (state, action) => {
      localStorage.removeItem("seller");
      localStorage.removeItem("seller_tokenData");
      return {
        isloading: false,
        data: [],
        error: null,
      };
    });
  },
});

export const {
  sellerViewCatalogDetailDataRequest,
  sellerViewCatalogDetailDataSuccess,
  sellerViewCatalogDetailDataFailure,
  addSubcategoryRequest,
  addSubcategorySuccess,
  addSubcategoryFailure,
  sellerTimeFailure,
  sellerTimeRequest,
  sellerTimeSuccess,
  sellerTypeFailure,
  sellerTypeRequest,
  sellerTypeSuccess,
  sellerMaterialFailure,
  sellerMaterialRequest,
  sellerMaterialSuccess,
  sellerColorFailure,
  sellerColorRequest,
  sellerColorSuccess,
  sellerSizeFailure,
  sellerSizeRequest,
  sellerSizeSuccess,
  sellerGetMainCategoryFailure,
  sellerGetMainCategoryRequest,
  sellerGetMainCategorySuccess,
  sellerGetSubCategoryFailure,
  sellerGetSubCategoryRequest,
  sellerGetSubCategorySuccess,
  sellerAddProductFailure,
  sellerAddProductRequest,
  sellerAddProductSuccess,
  sellerViewProductDDFailure,
  sellerViewProductDDSuccess,
  sellerViewProductDDRequest,
  sellerDeleteProductSuccess,
  sellerEditProductSuccess,
  sellerUpdateProductSuccess,
  sellerFinalCatalogSubmitFailure,
  sellerFinalCatalogSubmitRequest,
  sellerFinalCatalogSubmitSuccess,
  sellerListProductDDFailure,
  sellerListProductDDRequest,
  sellerListProductDDSuccess,
  sellerVariantDataFromIndexedDB,
  sellerVariantDataFromIndexedDBRequest,
  sellerAppendSubCategoryData,
  sellerAppendMaterialData,
  addMaterialFailure,
  addMaterialRequest,
  addMaterialSuccess,
  removeIndexDBData,
  addProductTypeRequest,
  addProductTypeSuccess,
  addProductTypeFailure,
  sellerAppendProductTypeData,
  addProductColorRequest,
  addProductColorSuccess,
  addProductColorFailure,
  sellerAppendProductColorData,
  showingPopup,
  sellerSelectedMaterialData,
  sellerSelectedTypeData,
  sellerSelectedcolorData,
  viewDataGetInIndexDB,
  viewcatalogEditVariant,
  deleteImageDataRequest,
  deleteImageDataSuccess,
  deleteImageDataFailure,
  variantDeleteProductRequest,variantDeleteProductSuccess,variantDeleteProductFailure
} = catalogSlice.actions;
export default catalogSlice.reducer;
