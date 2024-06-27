import React, { useState } from "react";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineWbSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { IoIosMenu } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import { userActions } from "../../../store/slices/userSlice";
import { cartActions } from "../../../store/slices/cartSlice";

export default function Header() {
  const isLoggedIn = useSelector((state) => state.user.user.isLoggedIn);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);
  const theme = useSelector((state) => state.user.theme);
  const shops = useSelector((state) => state.cart.shops);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuClass = [
    "d-flex flex-column justify-content-between align-items-baseline navbar-mobile",
    `${isOpenMenu ? "showMenu" : ""}`,
  ].join(" ");

  function shoppingCartHandler() {
    navigate("/panel/cart");
  }
  function signOutHandler() {
    dispatch(userActions.setLogout(false));
    delete localStorage.shopping;
    dispatch(cartActions.setShops([]));
    navigate("/");
  }
  function themeHandler() {
    if (theme == "light") {
      dispatch(userActions.setTheme("dark"));
    } else {
      dispatch(userActions.setTheme("light"));
    }
  }
  return (
    <div className=" d-flex justify-content-between align-items-center header">
      <div className="d-none d-lg-block">
        <Link to="/">
          <img
            href="logo"
            className="logo"
            src={SERVER_URL + "/uploads/others/logo1716163349660.png"}
          />
        </Link>
      </div>
      <nav className="d-none d-lg-block">
        <NavLink className="navlink rounded-1" end to="/">
          Home
        </NavLink>
        <NavLink className="navlink rounded-1" to="products">
          Products
        </NavLink>
        <NavLink className="navlink rounded-1" to="blogs">
          Blogs
        </NavLink>
        <NavLink className="navlink rounded-1" to="about">
          About us
        </NavLink>
        <NavLink className="navlink rounded-1" to="contact">
          Contact us
        </NavLink>
      </nav>
      <div className="d-lg-none d-flex justify-content-between align-items-center ">
        {!isOpenMenu ? (
          <IoIosMenu
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="fs-1 icon-nav"
          />
        ) : (
          <RxCrossCircled
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="fs-1 icon-nav"
          />
        )}
        <div className="d-flex justify-content-between align-items-center ms-1">
          <button
            className="btn-mood d-lg-none d-flex ms-2 justify-content-center align-items-center"
            onClick={themeHandler}
          >
            {theme == "dark" ? <MdOutlineWbSunny /> : <IoMdMoon />}
          </button>
          <div
            className=" position-relative cart   d-lg-none d-flex justify-content-center align-items-center"
            onClick={() => shoppingCartHandler()}
          >
            {!shops.length ? (
              <AiOutlineShoppingCart className="shaoppingcart" />
            ) : (
              <div>
                <FaShoppingCart className="shaoppingcart" />
                <span className="  numItem rounded-circle">
                  {shops.length > 10 ? "10+" : shops.length}
                </span>
              </div>
            )}
          </div>
        </div>
        <nav className={menuClass}>
          <NavLink className="navlink rounded-1 py-4 ps-3 w-100" end to="/">
            Home
          </NavLink>
          <NavLink className="navlink rounded-1 py-4 ps-3 w-100" to="products">
            Products
          </NavLink>
          <NavLink className="navlink rounded-1 py-4 ps-3 w-100" to="blogs">
            Blog
          </NavLink>
          <NavLink className="navlink rounded-1 py-4 ps-3 w-100" to="about">
            About us
          </NavLink>
          <NavLink className="navlink rounded-1 py-4 ps-3 w-100" to="contact">
            Contact us
          </NavLink>
        </nav>
      </div>
      <div className="d-lg-none ">
        <Link to="/">
          <img
            href="logo"
            className="logo-mobile"
            src={SERVER_URL + "/uploads/others/logo1716163349660.png"}
          />
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button
          className="btn-mood d-none d-lg-flex me-1 justify-content-center align-items-center"
          onClick={themeHandler}
        >
          {theme == "dark" ? <MdOutlineWbSunny /> : <IoMdMoon />}
        </button>
        <div
          className=" position-relative cart me-3 d-none d-lg-flex justify-content-center align-items-center"
          onClick={() => shoppingCartHandler()}
        >
          {!shops.length ? (
            <AiOutlineShoppingCart className="shaoppingcart" />
          ) : (
            <div>
              <FaShoppingCart className="shaoppingcart" />
              <span className="  numItem rounded-circle">
                {shops.length > 10 ? "10+" : shops.length}
              </span>
            </div>
          )}
        </div>
        {!isLoggedIn ? (
          <div className=" d-flex justify-content-between align-items-center">
            <Link
              className="btns btn-signIn rounded-1 d-flex justify-content-center align-items-center link"
              to="/login"
            >
              Sign in
            </Link>
            <Link
              className="btns btn-signUp rounded-1 d-flex justify-content-center align-items-center ms-2 ms-md-3 link"
              to="/register"
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Link
              className="userpanel-btn  rounded-1 text-center btns py-1 px-1 px-md-3 me-2 me-md-3 link"
              to="/panel/profile"
            >
              Profile
            </Link>
            {isAdmin && (
              <Link
                className="adminpanel-btn  rounded-1 text-center btns py-1 px-1 px-md-3 me-2 me-md-3 link"
                to="/admin"
              >
                Managing
              </Link>
            )}
            <button
              className="signout-btn  rounded-1  py-1 px-1 px-md-3 "
              onClick={signOutHandler}
            >
              Sing Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
