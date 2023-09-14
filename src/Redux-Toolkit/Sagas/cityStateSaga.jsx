import { put, takeEvery } from "redux-saga/effects"
import { SELLER_CITY, SELLER_COUNTRY, SELLER_STATE } from "../Actions/sagaActions"
import requestApi from "../../utils/request"
import { sellerCityDataFailure, sellerCityDataRequest, sellerCityDataSuccess, sellerCountryDataFailure, sellerCountryDataRequest, sellerCountryDataSuccess, sellerStateDataFailure, sellerStateDataRequest, sellerStateDataSuccess } from "../Slices/cityStateSlice"

function* cityDataSeller(params) {
    try {
        yield put(sellerCityDataRequest())
        const {data} = yield requestApi.post('/city', params.payload)
        yield put(sellerCityDataSuccess(data))
    } catch (e) {
        yield put(sellerCityDataFailure(e))
    }
}

function* stateDataSeller(params) {
    try {
        yield put(sellerStateDataRequest())
        const {data} = yield requestApi.post('/state',params.payload)
        yield put(sellerStateDataSuccess(data))
    } catch (e) {
        yield put(sellerStateDataFailure(e))
    }
}

function* countryDataSeller(params) {
    try {
        yield put(sellerCountryDataRequest())
        const {data} = yield requestApi.post('/country',params.payload)
        yield put(sellerCountryDataSuccess(data))
    } catch (e) {
        yield put(sellerCountryDataFailure(e))
    }
}

function* cityStateSaga() {
    yield takeEvery(SELLER_CITY, cityDataSeller)
    yield takeEvery(SELLER_STATE, stateDataSeller)
    yield takeEvery(SELLER_COUNTRY,countryDataSeller)
}

export default cityStateSaga
