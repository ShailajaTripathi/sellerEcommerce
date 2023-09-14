import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    SELLER_BANKDETAILS,
    SELLER_GETSTEPS,
    SELLER_GSTDETAILS,
    SELLER_PICKUPADDRESS,
    SELLER_SUPPLIERDETAILS
} from '../Actions/sagaActions'
import Swal from 'sweetalert2'

import {
    sellerGstDetailsFailure,
    sellerGstDetailsRequest,
    sellerGstDetailsSuccess,
    sellerGetStepsFailure,
    sellerGetStepsRequest,
    sellerGetStepsSuccess,
    sellerPickupaddressFailure,
    sellerPickupaddressRequest,
    sellerPickupaddressSuccess,
    sellerBankdetailsFailure,
    sellerBankdetailsRequest,
    sellerBankdetailsSuccess,
    sellerSupplierdetailsFailure,
    sellerSupplierdetailsRequest,
    sellerSupplierdetailsSuccess
} from '../Slices/authSlice'
import requestApi from '../../utils/request'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* gstDetailsSeller(params) {
    try {
        yield put(sellerGstDetailsRequest())
        const data = yield requestApi.post('verify-gst', params.payload)
        yield put(sellerGstDetailsSuccess(data))
    } catch (e) {
        yield put(sellerGstDetailsFailure(e))
    }
}

function* pickupAddressSeller(params) {
    try {
        yield put(sellerPickupaddressRequest())
        const data = yield requestApi.post(
            'update-pickup-address',
            params.payload
        )
        yield put(sellerPickupaddressSuccess(data))
        Swal.fire({
            type: "success",
            position: "center",
            text: data.meta.message,
        })
    } catch (e) {
        yield put(sellerPickupaddressFailure(e))
    }
}


function* gstBankDetailsSeller(params) {
    try {
        yield put(sellerBankdetailsRequest())
        const {data} = yield requestApi.post(
            'update-bank-details',
            params.payload
        )
        yield put(sellerBankdetailsSuccess(data))
        if(typeof params.callback === "function"){
            yield params.callback()
        }
    } catch (e) {
        yield put(sellerBankdetailsFailure(e))
    }
}

function* gstSupplierDetailsSeller(params) {
    try {
        yield put(sellerSupplierdetailsRequest())
        const data = yield requestApi.post(
            'update-supplier-details',
            params.payload
        )
        yield put(sellerSupplierdetailsSuccess(data))
    } catch (e) {
        yield put(sellerSupplierdetailsFailure(e))
    }
}

function* gstGetSellerStep(params) {
    try {
        yield put(sellerGetStepsRequest())
        const data = yield requestApi.post('get-seller-step', params.payload)
        yield put(sellerGetStepsSuccess(data.data.step === 5 ? 0 : data.data.step ))
    } catch (e) {
        yield put(sellerGetStepsFailure(e))
    }
}

function* gstSaga() {
    yield takeLatest(SELLER_GSTDETAILS, gstDetailsSeller)
    yield takeLatest(SELLER_PICKUPADDRESS, pickupAddressSeller)
    yield takeLatest(SELLER_BANKDETAILS, gstBankDetailsSeller)
    yield takeLatest(SELLER_SUPPLIERDETAILS, gstSupplierDetailsSeller)
    yield takeLatest(SELLER_GETSTEPS, gstGetSellerStep)
}

export default gstSaga
