import React from "react";
import Header from "../components/share/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/share/Footer/Footer";
import { useSelector } from "react-redux";
import Initializer from "../pages/share/Initializer/Initializer";

export default function PublicLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
