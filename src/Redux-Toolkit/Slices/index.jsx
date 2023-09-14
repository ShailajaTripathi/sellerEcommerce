import authSlice from "./authSlice"
import catalogSlice from "./catalogSlice"
import cityStateSlice from "./cityStateSlice"
import inventorySlice from "./inventorySlice"
import settingsSlice  from "./settingsSlice"


export const rootReducer = {
    authSlice : authSlice,
    cityStateSlice : cityStateSlice,
    settingsSlice : settingsSlice,
    catalogSlice : catalogSlice,
    invetorySlice : inventorySlice
}