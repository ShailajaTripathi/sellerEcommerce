import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import {
  home,
  signup,
  login,
  forgotpassword,
  resetpassword,
  gstdetails,
  bankdetails,
  pickupaddress,
  supplierdetails,
  successful,
  ordermanagement,
  returnorder,
  inventory,
  catalogsupload,
  newsboard,
  payment,
  settings,
  support,
  addcatalog,
  viewcatalog,
  viewmaincatalog
} from "./routingConsts";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SignUpLayout from "../components/Layout/SignUpLayout";
import GstDetails from "../pages/SignUp/Components/GstDetails";
import PickupAddress from "../pages/SignUp/Components/PickupAddress";
import BankDetails from "../pages/SignUp/Components/BankDetails";
import SupplierDetails from "../pages/SignUp/Components/SupplierDetails";
import Successful from "../pages/SignUp/Components/Successful";
import Sidebar from "../components/Layout/Sidebar";
import AuthRoutes from "../components/ProtectRoutes/AuthRoutes";
import PrivateRoute from "../components/ProtectRoutes/PrivateRoute";
import Dashboard from "../pages/Dashboard/Dashboard";
import DashboardLayout from "../components/Layout/Dashboard/DashboardLayout";
import OrderManagement from "../pages/Dashboard/OrderManagement";
import ReturnOrder from "../pages/Dashboard/ReturnOrder/ReturnOrder";
import Inventory from "../pages/Dashboard/Inventory/Inventory";
import CatalogsUpload from "../pages/Dashboard/CatalogsUpload/CatalogsFinalData/Catalogsupload";
import NewsBoard from "../pages/Dashboard/NewsBoard/NewsBoard";
import Payment from "../pages/Dashboard/Payments/Payments";
import Settings from "../pages/Dashboard/Settings/Settings";
import Support from "../pages/Dashboard/Support/Support";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import { useSelector } from "react-redux";
import AddCatalog from "../pages/Dashboard/CatalogsUpload/AddCatalog/AddCatalog";
import ViewCatalog from "../pages/Dashboard/CatalogsUpload/ViewCatalog";
import ViewMainList from "../pages/Dashboard/CatalogsUpload/ViewCatalog/ViewMainList";
const Routing = () => {
  const { authToken } = useSelector((action) => action.authSlice);
  
  return (
    <>
      <Routes>
        {/* <Route path={home} element={ <AuthRoutes/>}> */}
        <Route element={<AuthRoutes />}>
          <Route path="/" element={<SignUpLayout />}>
            <Route path={signup} element={<SignUp />} />
            <Route path={login} element={<Login />} />
            <Route path={forgotpassword} element={<ForgotPassword />} />
            <Route path={`${resetpassword}/:token`} element={<ResetPassword />} />
            {/* <Route path={successful} element={<Successful />} />
            <Route path="" element={<Sidebar />}>
              <Route path={gstdetails} element={<GstDetails />} />
              <Route path={bankdetails} element={<BankDetails />} />
              <Route path={pickupaddress} element={<PickupAddress />} />
              <Route path={supplierdetails} element={<SupplierDetails />} />
            </Route> */}
          </Route>
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<SignUpLayout />}>
            <Route path={successful} element={<Successful />} />
            <Route path="" element={<Sidebar />}>
              <Route path={gstdetails} element={<GstDetails />} />
              <Route path={bankdetails} element={<BankDetails isDispatch/>} />
              <Route path={pickupaddress} element={<PickupAddress />} />
              <Route path={supplierdetails} element={<SupplierDetails />} />
            </Route>
          </Route>
        </Route>

        <Route
          path={home}
          element={authToken ? <DashboardLayout /> : <Layout />}
        >
          <Route index element={authToken ? <Dashboard /> : <Home />} />
          <Route element={<PrivateRoute />}>
        {/* <Route element={<DashboardLayout h/>}> */}
          <Route path={ordermanagement} element={<OrderManagement/>} />
          <Route path={returnorder} element={<ReturnOrder/>} />
          <Route path={inventory} element={<Inventory/>} />
          <Route path={catalogsupload} element={<CatalogsUpload/>} />
          <Route path={newsboard} element={<NewsBoard/>} />
          <Route path={payment} element={<Payment/>} />
          <Route path={settings} element={<Settings/>} />
          <Route path={support} element={<Support/>} />
          <Route path={addcatalog} element={<AddCatalog/>} />
          <Route path={`${viewmaincatalog}/:id`} element={<ViewMainList />} />
          <Route path={`${viewcatalog}/:id`} element={<ViewCatalog/>} />
            {/* </Route> */}
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Routing;
