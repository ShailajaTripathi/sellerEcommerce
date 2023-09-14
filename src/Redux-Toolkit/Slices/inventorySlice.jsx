import { createSlice, current } from "@reduxjs/toolkit";
import Swal from "sweetalert2";


const inventorySlice = createSlice({
    name:"inventory",
    initialState:{
        isloading: false,
        error : null,
        statusdata:[]
    },
    reducers :{
        pauseInventoryActiveRequest(state,action){
            return {...state,isloading:true}
        },
        pauseInventoryActiveSuccess(state,action){
            return{...state,statusdata : action?.payload , isloading:false}
        },
        pauseInventoryActiveFailure(state,action){
            Swal.fire({
                type: "error",
                position: "center",
                text: action.payload.message,
              });
            return{...state,isloading:false}
        }
    }
})



export const {
    pauseInventoryActiveRequest,
    pauseInventoryActiveSuccess,
    pauseInventoryActiveFailure
  } =inventorySlice.actions;
  export default inventorySlice.reducer;