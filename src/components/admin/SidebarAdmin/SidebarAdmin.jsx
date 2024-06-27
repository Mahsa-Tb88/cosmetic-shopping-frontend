import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

export default function SidebarAdmin() {
  const userRole = useSelector((state) => state.user.user.role);
  return (
    <div className="sidebarAdmin">
      <h3 className=" titleAdmin d-flex justify-content-center align-items-center">
        <Link to="/">
          <img
            src={SERVER_URL + "/uploads/others/logo1716163349660.png"}
            className="logo-admin"
          />
        </Link>
      </h3>
      <div className=" d-flex flex-column  px-md-3 vh-100">
        <NavLink
          className="link rounded-1 my-3 py-4 linkAdmin w-100 ps-md-4 px-3 text-center text-md-start "
          to="products"
        >
          Products
        </NavLink>
        <NavLink
          className="link rounded-1 my-3 py-4 linkAdmin w-100 ps-md-4 px-3 text-center text-md-start "
          to="categories"
        >
          Categories
        </NavLink>
        {userRole == "Main Admin" ? (
          <NavLink
            className="link rounded-1 my-3 py-4 linkAdmin w-100 ps-md-4 px-3 text-center text-md-start "
            to="users"
          >
            Users
          </NavLink>
        ) : (
          ""
        )}
        <NavLink
          className="link rounded-1 my-3 py-4 linkAdmin w-100 ps-md-4 px-3 text-center text-md-start "
          to="blogs"
        >
          Blogs
        </NavLink>
      </div>
    </div>
  );
}
