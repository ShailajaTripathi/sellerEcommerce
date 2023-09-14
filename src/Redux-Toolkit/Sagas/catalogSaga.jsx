import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { ADD_PRODUCT_TYPE_DATA,ADD_MATERIAL_LIST_DATA, ADD_SUBCATEGORYLISTDATA, SELLER_ADDPRODUCT, SELLER_COLOR, SELLER_GETMAINCATEGORY, SELLER_GETSUBCATEGORY, SELLER_LISTPRODUCT, SELLER_MATERIAL, SELLER_SIZE, SELLER_TIME, SELLER_TYPE, SELLER_VIEWPRODUCTVARIANT, ADD_PRODUCT_COLOR_DATA, VIEW_CATALOG_DATA_LIST, DELETE_CATALOG_IMAGE, DELETE_VIEW_PRODUCT_VARIANT_DATA } from '../Actions/sagaActions'
import { sellerAppendSubCategoryData ,addSubcategoryFailure, addSubcategoryRequest, addSubcategorySuccess, sellerAddProductFailure, sellerAddProductRequest, sellerAddProductSuccess, sellerColorFailure, sellerColorRequest, sellerColorSuccess, sellerFinalCatalogSubmitFailure, sellerFinalCatalogSubmitRequest, sellerFinalCatalogSubmitSuccess, sellerGetMainCategoryFailure, sellerGetMainCategoryRequest, sellerGetMainCategorySuccess, sellerGetSubCategoryFailure, sellerGetSubCategoryRequest, sellerGetSubCategorySuccess, sellerListProductDDFailure, sellerListProductDDRequest, sellerListProductDDSuccess, sellerMaterialFailure, sellerMaterialRequest, sellerMaterialSuccess, sellerSizeFailure, sellerSizeRequest, sellerSizeSuccess, sellerTimeFailure, sellerTimeRequest, sellerTimeSuccess, sellerTypeFailure, sellerTypeRequest, sellerTypeSuccess, sellerViewProductDDFailure, sellerViewProductDDRequest, sellerViewProductDDSuccess, addMaterialRequest, addMaterialSuccess, sellerAppendMaterialData, addMaterialFailure, addProductTypeRequest, addProductTypeSuccess, sellerAppendProductTypeData, addProductTypeFailure, addProductColorRequest, addProductColorSuccess, sellerAppendProductColorData, addProductColorFailure, sellerViewCatalogDetailDataRequest, sellerViewCatalogDetailDataSuccess, sellerViewCatalogDetailDataFailure, sellerSelectedMaterialData, sellerSelectedTypeData, sellerSelectedcolorData, deleteImageDataRequest, deleteImageDataSuccess, deleteImageDataFailure, variantDeleteProductRequest, variantDeleteProductSuccess, variantDeleteProductFailure } from '../Slices/catalogSlice'
import requestApi from '../../utils/request'

function* typeDataSeller(params){
    try {
        yield put(sellerTypeRequest())
        const {data} = yield requestApi.post('/type')
        yield put(sellerTypeSuccess(data))
    } catch (e) {
        yield put(sellerTypeFailure(e))
    }
}



// for time duration api is not getting so temporary type api is called ////
function* timeDataSeller(params){
    try{
        yield put(sellerTimeRequest())
        const {data} = yield requestApi.post('/shipping-time')
        yield put(sellerTimeSuccess(data))
    }
    catch(e){
        yield put(sellerTimeFailure(e))
    }
}

function* materialDataSeller (params){
    try {
        yield put (sellerMaterialRequest())
        const {data} = yield requestApi.post('/material')
        yield put (sellerMaterialSuccess(data))
    } catch (e) {
        yield put (sellerMaterialFailure(e))
    }
}

function* addMaterialDataList (params){
    try{
        yield put(addMaterialRequest())
        const {data} = yield requestApi.post(`/add-material`,params?.payload)
        yield put(addMaterialSuccess(data))
        yield put(sellerSelectedMaterialData(data))
        yield put(sellerAppendMaterialData(data))
    }
    catch(e){
        yield put (addMaterialFailure(e)) 
    }
}

// add product type in drop-down list
function* addProductTypeDataList (params){
    try{
        yield put(addProductTypeRequest())
        const {data} = yield requestApi.post(`/add-type`,params?.payload)
        yield put(addProductTypeSuccess(data))
        yield put (sellerAppendProductTypeData(data))
        yield put(sellerSelectedTypeData(data))
    }
    catch(e){
        yield put (addProductTypeFailure(e)) 
    }
}
//

// ad product color data list 
function* addProductColorDataList(params){
    try{
        yield put(addProductColorRequest())
        const {data} = yield requestApi.post(`/add-color`,params?.payload)
        yield put(addProductColorSuccess(data))
        yield put (sellerAppendProductColorData(data))
        yield put(sellerSelectedcolorData(data))
    }
    catch(e){
        yield put (addProductColorFailure(e)) 
    }
}
//

function* colorDataSeller (params){
    try {
        yield put (sellerColorRequest())
        const {data} = yield requestApi.post('/color')
        yield put (sellerColorSuccess(data))
    } catch (e) {
        yield put (sellerColorFailure(e))
    }
}

function* sizeDataSeller (params){
    try {
        yield put (sellerSizeRequest())
        const {data} = yield requestApi.post('/size')
        yield put (sellerSizeSuccess(data))
    } catch (e) {
        yield put (sellerSizeFailure(e))
    }
}

function* getMainCategoryDataSeller (params){
    try {
        yield put (sellerGetMainCategoryRequest())
        const {data} = yield requestApi.post('/main-category')
        yield put (sellerGetMainCategorySuccess(data))
    } catch (e) {
        yield put (sellerGetMainCategoryFailure(e))
    }
}

function* getSubCategoryDataSeller (params){
    try {
        yield put (sellerGetSubCategoryRequest())
        const {data} = yield requestApi.post('/category',params.payload)
        yield put (sellerGetSubCategorySuccess(data))
    } catch (e) {
        yield put (sellerGetSubCategoryFailure(e))
    }
}

function* addSubcategoryDataList (params) {
    try{
        yield put(addSubcategoryRequest())
        const {data} = yield requestApi.post(`/add-category`,params?.payload)
        yield put(addSubcategorySuccess(data))
        yield put (sellerAppendSubCategoryData(data))
    }
    catch(e) {
        yield put (addSubcategoryFailure(e))
    }
}



function* getAddProductDataSeller (params){
    try {
        yield put (sellerFinalCatalogSubmitRequest())
        const {data} = yield call(requestApi.post, '/catalog/add-edit',params.payload);  
        yield put (sellerFinalCatalogSubmitSuccess())
        if(typeof params.callback === "function"){
            yield params.callback()
        }

    } catch (e) {
        yield put (sellerFinalCatalogSubmitFailure(e))
    }
}

function* getListProductSeller (params){
    try {
        yield put (sellerListProductDDRequest())
        const data = yield call(requestApi.post, '/catalog/list',params.payload);  
        // const data = yield requestApi.post('/catalog/add-edit',params.payload )
        yield put (sellerListProductDDSuccess(data))
        if(typeof params.callback === "function"){
            
            yield params.callback()
        }
    } catch (e) {
        yield put (sellerListProductDDFailure(e))
    }
}


function* viewCatalogeDataList(params){
    try {
        yield put (sellerViewCatalogDetailDataRequest())
        const data = yield call(requestApi.post, '/catalog/view',params.payload);  
        // const data = yield requestApi.post('/catalog/add-edit',params.payload )
        yield put (sellerViewCatalogDetailDataSuccess(data))
    } catch (e) {
        yield put (sellerViewCatalogDetailDataFailure(e))
    }
}


function* deleteImageFromCatalog(params){
    try{
        yield put (deleteImageDataRequest())
        const data = yield call(requestApi.post, '/catalog/variant-image/delete',params.payload);  
        // const data = yield requestApi.post('/catalog/add-edit',params.payload )
        yield put (deleteImageDataSuccess(data))}
    catch(e){
        yield put (deleteImageDataFailure(e))
    }
}

////// Delete variant and product data when view catalog ///////
function* deleteViewCatalogProduct(params){
    try{
        yield put(variantDeleteProductRequest())
        const data = yield call(requestApi.post,'/catalog/variant/delete',params.payload)
        yield put (variantDeleteProductSuccess(data))
        if(typeof params.callback === "function"){
            yield params.callback()
        }
    }
    catch(e){
        yield put (variantDeleteProductFailure(e))
    }
}

function* catalogSaga() {
  yield takeEvery(SELLER_TYPE, typeDataSeller)
  yield takeEvery(SELLER_MATERIAL,materialDataSeller)
  yield takeEvery(SELLER_COLOR,colorDataSeller)
  yield takeEvery(SELLER_SIZE,sizeDataSeller)
  yield takeEvery(SELLER_GETMAINCATEGORY,getMainCategoryDataSeller)
  yield takeEvery(SELLER_GETSUBCATEGORY,getSubCategoryDataSeller)
  yield takeEvery(SELLER_ADDPRODUCT,getAddProductDataSeller)
  yield takeEvery(SELLER_LISTPRODUCT,getListProductSeller)
  yield takeEvery(SELLER_TIME,timeDataSeller)
  yield takeEvery(ADD_SUBCATEGORYLISTDATA,addSubcategoryDataList)
  yield takeEvery(ADD_MATERIAL_LIST_DATA,addMaterialDataList)
  yield takeEvery (ADD_PRODUCT_TYPE_DATA,addProductTypeDataList)
  yield takeEvery (ADD_PRODUCT_COLOR_DATA,addProductColorDataList)
  yield takeEvery(VIEW_CATALOG_DATA_LIST,viewCatalogeDataList)
  yield takeEvery(DELETE_CATALOG_IMAGE,deleteImageFromCatalog)
  yield takeEvery(DELETE_VIEW_PRODUCT_VARIANT_DATA,deleteViewCatalogProduct)
}

export default catalogSaga




