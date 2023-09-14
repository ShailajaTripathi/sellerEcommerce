import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    SELLER_CHANGEPASSWORD,
    SELLER_EDITPROFILE,
    SELLER_VIEWPROFILE
} from '../Actions/sagaActions'
import requestApi from '../../utils/request'
import Swal from "sweetalert2";
import { sellerChangePasswordFailure, sellerChangePasswordRequest, sellerChangePasswordSuccess, sellerViewProfileDataFailure, sellerViewProfileDataRequest, sellerViewProfileDataSuccess } from '../Slices/settingsSlice'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* settingsViewProfile(params) {
    try {
        yield put(sellerViewProfileDataRequest())
        const {data} = yield requestApi.post('/view-profile', params.payload)
        yield put(sellerViewProfileDataSuccess(data))
    } catch (e) {
        yield put(sellerViewProfileDataFailure(e))
    }
}
function* settingsEditProfile(params) {
    try {
        yield put(sellerViewProfileDataRequest())
        const data = yield requestApi.post('/edit-profile', params.payload)
        yield put(sellerViewProfileDataSuccess(data))
        yield put({type : SELLER_VIEWPROFILE})
        Swal.fire({
            type: "success",
            position: "center",
            text: data.meta.message,
          })
    } catch (e) {
        yield put(sellerViewProfileDataFailure(e))
    }
}
function* settingsChangePassword(params) {
    try {
        yield put(sellerChangePasswordRequest())
        const data = yield requestApi.post('/change-password', params.payload)
        yield put(sellerChangePasswordSuccess(data))
    } catch (e) {
        yield put(sellerChangePasswordFailure(e))
    }
}



function* settingsSaga() {
    yield takeLatest(SELLER_VIEWPROFILE, settingsViewProfile)
    yield takeLatest(SELLER_EDITPROFILE, settingsEditProfile)
    yield takeLatest(SELLER_CHANGEPASSWORD, settingsChangePassword)
}

export default settingsSaga
