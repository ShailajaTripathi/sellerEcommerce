
import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { SELLER_LOGOUT } from '../Actions/sagaActions'

export const settingsSlice = createSlice({
    name: 'settingsSlice',
    initialState: {
        isloading: false,
        data: [],
        error: null
    },
    reducers: {
        //View Profile Starts
        sellerViewProfileDataRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerViewProfileDataSuccess: (state, action) => {
            return { ...state, data: action?.payload, isloading: false }
        },
        sellerViewProfileDataFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        //View Profile Ends

        //Edit Profile starts
        sellerEditProfileDataRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerEditProfileDataSuccess: (state, action) => {
            Swal.fire({
                type: 'success',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.meta.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false, error: null }
        },
        sellerEditProfileDataFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        // Edit Profile Ends

        // Change Password
        sellerChangePasswordRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerChangePasswordSuccess: (state, action) => {
            Swal.fire({
                icon: "success",
                // type: 'success',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.meta.message,
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false, error: null }
        },
        sellerChangePasswordFailure: (state, action) => {
            Swal.fire({
                icon: "warning",
                // type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message,
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        // Change Password ends
    },
    extraReducers: (builder) => {
        builder.addCase(SELLER_LOGOUT, (state, action) => {
            return {
                isloading: false,
                data: [],
                error: null
            }
        })
    }
})

// Action creators are generated for each case reducer function
export const { sellerViewProfileDataFailure, sellerViewProfileDataRequest, sellerViewProfileDataSuccess, sellerEditProfileDataFailure, sellerEditProfileDataRequest, sellerEditProfileDataSuccess,sellerChangePasswordFailure,sellerChangePasswordRequest,sellerChangePasswordSuccess } = settingsSlice.actions

export default settingsSlice.reducer