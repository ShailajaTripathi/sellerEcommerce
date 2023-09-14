
import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2'
import { SELLER_LOGOUT } from '../Actions/sagaActions'



export const cityStateSlice = createSlice({
    name: 'cityStateSlice',
    initialState: {
        isloading: true,
        data: [],
        cityData : [],
        error: null
    },
    reducers: {
        sellerCityDataRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerCityDataSuccess: (state, action) => {
            return { ...state, cityData: action.payload, isloading: false }
        },
        sellerCityDataFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        sellerStateDataRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerStateDataSuccess: (state, action) => {
            return { ...state, data: action.payload, isloading: false }
        },
        sellerStateDataFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
        sellerCountryDataRequest: (state, action) => {
            return { ...state, isloading: true }
        },
        sellerCountryDataSuccess: (state, action) => {
            return { ...state, data: action.payload, isloading: false }
        },
        sellerCountryDataFailure: (state, action) => {
            Swal.fire({
                type: 'error',
                position: 'center',
                // title:action.payload.statusCode,
                text: action.payload.message
                // footer: '<a href="">Why do I have this issue?</a>'
            })
            return { ...state, isloading: false }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(SELLER_LOGOUT, (state, action) => {
            localStorage.removeItem('seller')
            localStorage.removeItem('seller_tokenData')
            return {
                isloading: false,
                data: [],
                cityData : [],
                error: null
            }
        })
    }
})

// Action creators are generated for each case reducer function
export const { sellerCityDataRequest, sellerCityDataSuccess, sellerCityDataFailure, sellerStateDataFailure, sellerStateDataRequest, sellerStateDataSuccess,sellerCountryDataFailure,sellerCountryDataRequest,sellerCountryDataSuccess } = cityStateSlice.actions

export default cityStateSlice.reducer