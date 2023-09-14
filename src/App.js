import Routing from "./config/routing";
import { useEffect } from "react";
import i18n from "./components/LanguageTranslator/i18n";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bankdetails, gstdetails, home, pickupaddress, successful, supplierdetails } from "./config/routingConsts";
import { useState } from "react";
import { SELLER_GETSTEPS, SELLER_LOGOUT } from "./Redux-Toolkit/Actions/sagaActions";
import store from "./Redux-Toolkit/store";

// function storageChanged(a) {
//     if (Object.keys(a.storageArea).includes("seller_tokenData") && a.oldValue != a.newValue===null){
//         store.dispatch({ type: SELLER_LOGOUT })
//     }
//     console.log("hello00000", a.storageArea.seller_tokenData)
//         // if (key === "seller_tokenData") {

//     // console.log(Object.keys(a.storageArea).includes("hello"))
//     // store.dispatch({ type: SELLER_LOGOUT })
//     // if (key === "Data") {
//     //     const isNew = oldValue === null && newValue !== null;
//     //     console.log(`Data event, new value = "${newValue}". First time? ${isNew ? "Yes" : "No"}`);
//     // }
// }

function App() {
    const dispatch = useDispatch()
    const { state } = useLocation()
    useEffect(() => {
        const ln = localStorage.getItem("language");
        if (ln) {
            i18n.changeLanguage(ln);
        } else {
            i18n.changeLanguage("en");
        }
    }, []);

    const { error, steps, authToken } = useSelector((e) => e.authSlice);
    const navigate = useNavigate();
    useEffect(() => {
            if (authToken) {
                dispatch({ type: SELLER_GETSTEPS })
            }
        }, [])
        // useEffect(() => {
        //     window.addEventListener('storage', storageChanged);
        //     return () => {
        //         window.removeEventListener("storage", storageChanged)
        //     }
        // }, [])

    useEffect(() => {
        if (steps) {
            switch (steps) {
                // case 0:
                //     navigate(home, { state: "dashboard", replace: true });
                //     break;
                case 1:
                    navigate(gstdetails, { state: "gstdetails", replace: true });
                    break;
                case 2:
                    navigate(pickupaddress, { state: "pickupaddress", replace: true });
                    break;
                case 3:
                    navigate(bankdetails, { state: "bankdetails", replace: true });
                    break;
                case 4:
                    navigate(supplierdetails, { state: "supplierdetails", replace: true });
                    break;
                case 5:
                    navigate(successful, { state: "successful", replace: true });
                    break;
                default:
                    break;
            }
        }
    }, [steps]);

    return <Routing / > ;
}

export default App;