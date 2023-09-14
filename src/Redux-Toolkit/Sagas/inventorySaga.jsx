import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects'
import requestApi from '../../utils/request'
import {PAUSE_INVENTORY_LIST_DATA} from '../Actions/sagaActions'
import {  pauseInventoryActiveFailure, pauseInventoryActiveRequest, pauseInventoryActiveSuccess } from '../Slices/inventorySlice'
import Swal from "sweetalert2";


// for pause functionality on active or inactive //////
function* pauseInventoryVariant(params){
    try{
        yield put(pauseInventoryActiveRequest())
        const {data,meta} = yield requestApi.post(`/catalog/variant/active-inactive`,params?.payload)
        yield put(pauseInventoryActiveSuccess(data))
        // if(data && meta?.message){
         Swal.fire({
                type: "success",
                position: "center",
                text: meta.message,
              })
            // }
       if(typeof params.callback === 'function'){
           yield params.callback()
       }
    }
    catch(e){
        yield put(pauseInventoryActiveFailure(e)) 
    }
}
// end pause fnctionality ////



function* inventorySaga(){
    yield takeLatest(PAUSE_INVENTORY_LIST_DATA,pauseInventoryVariant)
}
export default inventorySaga