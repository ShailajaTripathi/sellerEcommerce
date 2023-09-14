import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
const Layout = () => {
   const {pathname} =  useLocation()
   const ref = useRef()

  return (
    <>
      {/* <Header onClickEvent={(a) => ref.current.children[a].scrollIntoView({ behavior: "smooth" })}/> */}

      <Header onClickEvent= {(a) => {
    const offset = 168; // Set your desired offset value here
    const headerHeight =  document.querySelector(".site-header").offsetHeight
    const element = ref.current.children[a];
    const { top } = element.getBoundingClientRect();
    const offsetTop = top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    document.body.classList.toggle('mobile-open')
  }} />


      <main className="web-site-content" ref = {ref}>
        <Outlet />
      </main>{" "}
     {pathname ==="/" && <Footer  onClickEvent= {(a) => {
    const offset = 168; // Set your desired offset value here
    const headerHeight =  document.querySelector(".site-header").offsetHeight
    const element = ref.current.children[a];
    const { top } = element.getBoundingClientRect();
    const offsetTop = top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })}}/> } 
    </>
  );
};

export default Layout;
