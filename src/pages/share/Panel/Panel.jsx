import React, { useEffect } from "react";
import "./panel.css";
import { NavLink, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { initialize } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/slices/cartSlice";
import { userActions } from "../../../store/slices/userSlice";

export default function Panel() {
  const dispatch = useDispatch();

  useEffect(() => {
    const timeOut = setTimeout(cartInitialization, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function cartInitialization() {
    const result = await initialize();
    if (result.success) {
      const { body } = result;
      if (body.cart) {
        dispatch(cartActions.setCartId(body.cart._id));
        const user = body.cart.userId;
        user.isAdmin = user.role === "admin" || user.role == "Main Admin";
        user.isLoggedIn = true;
        dispatch(userActions.setUser(body.cart.userId));
        localStorage.shopping = JSON.stringify(body.cart.items);
        dispatch(cartActions.setShops(body.cart.items));
      }
    } else {
    }
  }

  return (
    <div className="panel d-flex">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div className="w-25 sideBar ">
        <div className="d-flex flex-column  justify-align-content-center align-items-center px-3">
          <NavLink
            className="link rounded-1 my-3  py-4 w-100 ps-md-4  w-50 text-center text-md-start"
            to="/panel"
            end
          >
            Dashboard
          </NavLink>
          <NavLink
            className="link rounded-1 my-3  py-4 w-100 ps-md-4  w-50 text-center text-md-start"
            to="profile"
          >
            Profile
          </NavLink>
          <NavLink
            className="link rounded-1 my-3  py-4 w-100 ps-md-4  w-50 text-center text-md-start"
            to="purchases"
          >
            Purchased
          </NavLink>
        </div>
      </div>
      <div className=" w-75 ">
        <Outlet />
      </div>
    </div>
  );
}
