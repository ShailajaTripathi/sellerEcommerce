import { call, put, takeEvery } from 'redux-saga/effects'
import {
    sellerVerificationRequest,
    sellerVerificationSuccess,
    sellerVerificationFailure,
    sellerRegisterRequest,
    sellerRegisterSuccess,
    sellerRegisterFailure,
    sellerLoginRequest,
    sellerLoginSuccess,
    sellerLoginFailure,
    sellerForgotPasswordRequest,
    sellerForgotPasswordSuccess,
    sellerForgotPasswordFailure,
    sellerResetPasswordRequest,
    sellerResetPasswordSuccess,
    sellerResetPasswordFailure,
    sellerViewProfileRequest,
    sellerViewProfileSuccess,
    sellerViewProfileFailure
} from '../Slices/authSlice'
import {
    SELLER_FORGOTPASSWORD,
    SELLER_LOGIN,
    SELLER_REGISTER,
    SELLER_RESETPASSWORD,
    SELLER_VERIFICATION,
    SELLER_VIEWPROFILE
} from '../Actions/sagaActions'
import requestApi from '../../utils/request'
import Swal from "sweetalert2";



// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* VerificationSeller(params) {
    try {
        yield put(sellerVerificationRequest())
        const data = yield requestApi.post('resend-phone-otp', params.payload)
        yield put(sellerVerificationSuccess(data))
    } catch (e) {
        yield put(sellerVerificationFailure(e))
    }
}

function* SignupSeller(params) {
    try {
        yield put(sellerRegisterRequest())
        const data = yield requestApi.post('signup', params.payload)
        yield put(sellerRegisterSuccess(data))
    } catch (e) {
        yield put(sellerRegisterFailure(e))
    }
}
function* LoginSeller(params) {
    try {
        yield put(sellerLoginRequest())
        const data = yield requestApi.post('login', params.payload)
        yield put(sellerLoginSuccess(data))
    } catch (e) {
        yield put(sellerLoginFailure(e))
    }
}

function* ForgotPasswordSeller(params) {
    try {
        yield put(sellerForgotPasswordRequest())
        const data = yield requestApi.post('forgot-password', params.payload)
        yield put(sellerForgotPasswordSuccess(data))
    } catch (e) {
        yield put(sellerForgotPasswordFailure(e))
    }
}




function* ResetPasswordSeller(params) {
    try {
        yield put(sellerResetPasswordRequest())
        const data = yield requestApi.post(`resetpassword/${params?.payload?.token}`, params?.payload?.data)
        yield put(sellerResetPasswordSuccess(data))
        if(typeof params.callback === "function"){
            yield params.callback() 
            Swal.fire({
                type: "success",
                position: "center",
                text: data?.meta?.message,
              })
        }
    } catch (e) {
        yield put(sellerResetPasswordFailure(e))
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* authSaga() {
    yield takeEvery(SELLER_REGISTER, SignupSeller)
    yield takeEvery(SELLER_LOGIN, LoginSeller)
    yield takeEvery(SELLER_VERIFICATION, VerificationSeller)
    yield takeEvery(SELLER_FORGOTPASSWORD, ForgotPasswordSeller)
    yield takeEvery(SELLER_RESETPASSWORD, ResetPasswordSeller)
}

export default authSaga
