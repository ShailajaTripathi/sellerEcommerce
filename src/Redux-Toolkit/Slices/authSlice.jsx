import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { SELLER_LOGOUT } from '../Actions/sagaActions'
import ReactDOMServer from 'react-dom/server';
import SuccessfulIcon from '../../assets/images/icons/success-icon.svg'
// "/assets/images/icons/icon-successful.png"
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}
// Get the value of the 'authToken' cookie


const ImageComponent = () => {
    return (
        <img src={SuccessfulIcon} alt="Image" style={{ maxWidth: '100%' , margin:'auto',textAlign:'center'}} />
    );
};
const renderedImageComponent = ReactDOMServer.renderToString(<ImageComponent />);

let authToken = getCookie('authToken');

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isloading: false,
        data: [],
        bankData : [],
        // authToken: JSON.parse(localStorage.getItem('seller_tokenData')) || null,
        authToken: authToken  || null,
        seller: JSON.parse(localStorage.getItem('seller')) || null,
        error: null,
        steps: null,
        step: null
    },
    reducers: {
        sellerSignUpData: (state, action) => {
            return { ...state, error: null, data: action.payload }
        },
        sellerProtectedData: (state, action) => {
            console.log(action.payload, "Protected")
            return { ...state, steps: action.payload }
        },
        sellerVerificationRequest: (state, action) => {
            return { ...state, isloading: true, error: null }
        },
        sellerVerificationSuccess(state, action) {
            Swal.fire({
                // type: 'success',
                position: 'center',
              //title:action.payload.statusCode
                // html: `<img src={${SuccessfulIcon}} alt="Image" style="max-width: 100%;" />`,
                 html: renderedImageComponent,
                 footer: action?.payload?.meta?.message,
                 showConfirmButton: false,
                 timer: 1500
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            // Swal.fire({
            //     position: 'center',
            //     icon: 'success',
            //     title: 'Your work has been saved',
            //     showConfirmButton: false,
            //     // timer: 1500
            //   })
            return { ...state, isloading: false, error: null }
        },
        sellerVerificationFailure(state, action) {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        sellerRegisterRequest: (state, action) => {
            return { ...state, isloading: true, error: null }
        },
        sellerRegisterSuccess(state, action) {
            localStorage.setItem(
                'seller',
                JSON.stringify(action?.payload?.data)
            )
            localStorage.setItem(
                'seller_tokenData',
                JSON.stringify(action?.payload.meta?.tokenData)
            )
            // Set cookie with authToken data
            const authToken = action?.payload.meta?.tokenData;
            document.cookie = `authToken=${authToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            return {
                ...state,
                isloading: false,
                seller: action?.payload?.data,
                authToken: action?.payload.meta?.tokenData,
                steps: action?.payload?.data?.step
            }
        },
        sellerRegisterFailure(state, action) {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        sellerLoginRequest: (state, action) => {
            return { ...state, isloading: true, error: null }
        },
        sellerLoginSuccess(state, action) {
            localStorage.setItem(
                'seller',
                JSON.stringify(action?.payload?.data)
            )
            // localStorage.setItem(
            //     'seller_tokenData',
            //     JSON.stringify(action?.payload.meta?.tokenData)
            // )
            // Set cookie with authToken data
            const authToken = action?.payload.meta?.tokenData;
            document.cookie = `authToken=${authToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            return {
                ...state,
                isloading: false,
                seller: action?.payload?.data,
                authToken: action?.payload.meta?.tokenData,
                steps: action?.payload?.data?.step === 5 ? 0 : action?.payload?.data?.step
            }
        },
        sellerLoginFailure(state, action) {
            Swal.fire({
                position: 'center',
                type: 'error',
                title: '',
                allowOutsideClick: false,
                text: action.payload.message
            })
            return { ...state, isloading: false, error: action.payload }
        },
        sellerForgotPasswordRequest: (state, action) => {
            return { ...state, isloading: true, error: null }
        },
        sellerForgotPasswordSuccess: (state, action) => {
            Swal.fire({
                type: 'success',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.meta.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false, error: null }
        },
        sellerForgotPasswordFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },

        //#region  viewProfile
        sellerViewProfileRequest: (state, action) => {
            return { ...state, isloading: true, error: null }
        },
        sellerViewProfileSuccess: (state, action) => {
            return {
                ...state,
                isloading: false,
                error: null,
                seller: action?.payload?.data
            }
        },
        sellerViewProfileFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        //#endregion

        sellerResetPasswordRequest: (state, action) => {
            return { ...state, isloading: true, error: null }
        },
        sellerResetPasswordSuccess: (state, action) => {
            return { ...state, isloading: false, error: null }
        },
        sellerResetPasswordFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        // GST Details
        sellerGstDetailsRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerGstDetailsSuccess: (state, action) => {
            // localStorage.setItem("steps", JSON.stringify(action?.payload?.data?.step))
            return {
                ...state,
                isloading: false,
                data: action?.payload,
                step: action?.payload?.data?.step
            }
        },
        sellerGstDetailsFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action?.payload?.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        sellerGetStepsRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerGetStepsSuccess: (state, action) => {
            return { ...state, isloading: false, steps: action?.payload }
        },
        sellerGetStepsFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action?.payload?.meta?.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        sellerPickupaddressRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerPickupaddressSuccess: (state, action) => {
            return {
                ...state,
                isloading: false,
                data: action?.payload,
                steps: action?.payload?.data?.step === 5 ? 0 : action?.payload?.data?.step
            }
        },
        sellerPickupaddressFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action?.payload?.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        sellerBankdetailsRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerBankdetailsSuccess: (state, action) => {
            return { ...state, isloading: false, step: action?.payload?.step , bankData: action.payload.bankDetails }
        },
        sellerBankdetailsFailure: (state, action) => {
            console.log(action?.payload?.message,"action?.payload?.message")
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action?.payload?.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false,error : action?.payload?.message }
        },
        sellerSupplierdetailsRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerSupplierdetailsSuccess: (state, action) => {
            return { ...state, isloading: false, steps: action?.payload?.data?.step }
        },
        sellerSupplierdetailsFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action?.payload?.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(SELLER_LOGOUT, (state, action) => {
            localStorage.removeItem('seller')
            localStorage.removeItem('seller_tokenData')
            document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
            return {
                isloading: false,
                data: [],
                authToken: null,
                seller: null,
                error: null,
                steps: null
            }
        })
    }
})

export default authSlice.reducer
export const {
    sellerRegisterFailure,
    sellerRegisterRequest,
    sellerRegisterSuccess,
    sellerLoginFailure,
    sellerLoginRequest,
    sellerLoginSuccess,
    sellerVerificationFailure,
    sellerVerificationRequest,
    sellerVerificationSuccess,
    sellerSignUpData,
    sellerProtectedData,
    sellerForgotPasswordFailure,
    sellerForgotPasswordRequest,
    sellerForgotPasswordSuccess,
    sellerResetPasswordFailure,
    sellerResetPasswordRequest,
    sellerResetPasswordSuccess,
    sellerViewProfileRequest,
    sellerViewProfileSuccess,
    sellerViewProfileFailure,
    sellerGetStepsFailure,
    sellerGetStepsRequest,
    sellerGetStepsSuccess,
    sellerGstDetailsFailure,
    sellerGstDetailsRequest,
    sellerGstDetailsSuccess,
    sellerPickupaddressFailure,
    sellerPickupaddressRequest,
    sellerPickupaddressSuccess,
    sellerBankdetailsFailure,
    sellerBankdetailsRequest,
    sellerBankdetailsSuccess,
    sellerSupplierdetailsFailure,
    sellerSupplierdetailsRequest,
    sellerSupplierdetailsSuccess
} = authSlice.actions
