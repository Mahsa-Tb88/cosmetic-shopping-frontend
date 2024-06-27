import App from "../App";
import Dashboard from "../components/share/Dashboard/Dashboard";
import Profile from "../components/share/Profile/Profile";
import Purchases from "../components/share/Purchases/Purchases";
import PublicLayout from "../layout/PublicLayout";
import AboutUs from "../pages/share/AboutUs/AboutUs";
import Blog from "../pages/share/Blog/Blog";
import Blogs from "../pages/share/Blogs/Blogs";
import Cart from "../pages/share/Cart/Cart";
import ConfirmOrder from "../pages/share/ConfirmOrder/ConfirmOrder";
import ContactUs from "../pages/share/ContactUs/ContactUs";
import Home from "../pages/share/Home/Home";
import Login from "../pages/share/Login/Login";
import Panel from "../pages/share/Panel/Panel";
import Product from "../pages/share/Product/Product";
import ProductsShop from "../pages/share/ProductsShop/ProductsShop";
import Register from "../pages/share/Register/Register";

const publicRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <PublicLayout />,
        children: [
          { index: true, element: <Home /> },
          { path: "products", element: <ProductsShop /> },
          { path: "product/:id", element: <Product /> },
          { path: "about", element: <AboutUs /> },
          { path: "contact", element: <ContactUs /> },
          { path: "blogs", element: <Blogs /> },
          { path: "blogs/:id", element: <Blog /> },
          { path: "login", element: <Login /> },
          {
            path: "panel",
            element: <Panel />,
            children: [
              { index: true, element: <Dashboard /> },
              { path: "profile", element: <Profile /> },
              { path: "cart", element: <Cart /> },
              { path: "purchases", element: <Purchases /> },
              { path: "confirmOrder/:id", element: <ConfirmOrder /> },
            ],
          },
          { path: "register", element: <Register /> },
        ],
      },
    ],
  },
];

export default publicRoutes;
