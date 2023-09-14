import {all} from "redux-saga/effects"
import authSaga from "./authSaga"
import gstSaga from "./gstSaga"
import cityStateSaga from "./cityStateSaga"
import settingsSaga from "./settingsSaga"
import catalogSaga from "./catalogSaga"
import inventorySaga from "./inventorySaga"


export default function* rootSaga() {
    yield all([
        authSaga(),
        gstSaga(),
        cityStateSaga(),
        settingsSaga(),
        catalogSaga(),
        inventorySaga(),
    ])
    // code after all-effect
  }