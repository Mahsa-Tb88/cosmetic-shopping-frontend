import React from "react";
import { useEffect } from "react";
import { Outlet, json } from "react-router-dom";
import { initialize } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./store/slices/userSlice.js";
import Initializer from "./pages/share/Initializer/Initializer.jsx";
import { cartActions } from "./store/slices/cartSlice.js";

export default function App() {
  const dispatch = useDispatch();
  const initializedError = useSelector((state) => state.user.initializedError);
  const initialized = useSelector((state) => state.user.initialized);
  const theme = useSelector((state) => state.user.theme);

  useEffect(() => {
    const timeOut = setTimeout(initializeApp, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function initializeApp() {
    dispatch(userActions.setInitializedError(false));
    const savedTheme = localStorage.theme === "dark" ? "dark" : "light";
    dispatch(userActions.setTheme(savedTheme));
    const result = await initialize();
    if (result.success) {
      const { body } = result;

      if (body.cart) {
        const user = body.cart.userId;
        user.isAdmin = user.role === "admin" || user.role == "Main Admin";
        user.isLoggedIn = true;
        dispatch(userActions.setUser(user));
        dispatch(cartActions.setCartId(body.cart._id));
        localStorage.shopping = JSON.stringify(body.cart.items);
        dispatch(cartActions.setShops(body.cart.items));
      }

      dispatch(userActions.setCategories(body.categories));
      dispatch(userActions.setInitialized(true));
    } else {
      dispatch(userActions.setInitializedError(result.message));
    }
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  function loadedShoppingFromLocalStorage() {
    localStorage.shopping
      ? dispatch(cartActions.setShops(JSON.parse(localStorage.shopping)))
      : "";
  }
  function loadedThemeFromLocalStorage() {
    localStorage.theme
      ? dispatch(userActions.setTheme(localStorage.theme))
      : "";
  }
  window.addEventListener("storage", loadedShoppingFromLocalStorage);
  window.addEventListener("storage", loadedThemeFromLocalStorage);

  if (initializedError || !initialized) {
    return <Initializer initializeApp={initializeApp} />;
  } else {
    return (
      <div>
        <Outlet />
      </div>
    );
  }
}
