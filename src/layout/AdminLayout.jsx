import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarAdmin from "../components/admin/SidebarAdmin/SidebarAdmin";
import HeaderAdmin from "../components/admin/HeaderAdmin/HeaderAdmin";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import Initializer from "../pages/share/Initializer/Initializer";
import "./adminLayout.css";
export default function AdminLayout() {
  const initialized = useSelector((state) => state.user.initialized);
  const initializedError = useSelector((state) => state.user.initializedError);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!initialized || !isAdmin) {
      navigate("/");
    }
  }, []);

  if (!initialized || initializedError) {
    return <Initializer />;
  } else {
    return (
      <div className="adminlayout d-flex justify-content-center ">
        <Helmet>
          <title>Admin Panel</title>
        </Helmet>
        <SidebarAdmin />

        <div className="mainAdmin d-flex flex-column">
          <HeaderAdmin />
          <Outlet />
        </div>
      </div>
    );
  }
}
