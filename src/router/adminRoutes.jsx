import App from "../App";
import WelcomeAdmin from "../components/admin/WelcomeAdmin/WelcomeAdmin";
import AdminLayout from "../layout/AdminLayout";
import AddBlog from "../pages/admin/AddBlog/AddBlog";
import AddCategory from "../pages/admin/AddCategory/AddCategory";
import AddProduct from "../pages/admin/AddProduct/AddProduct";
import AddUser from "../pages/admin/AddUser/AddUser";
import BlogEdit from "../pages/admin/BlogEdit/BlogEdit";
import Blogs from "../pages/admin/Blogs/Blogs";
import Categories from "../pages/admin/Categories/Categories";
import CategoryEdit from "../pages/admin/CategoryEdit/CategoryEdit";
import ProductEdit from "../pages/admin/ProductEdit/ProductEdit";
import Products from "../pages/admin/Products/Products";
import UserEdit from "../pages/admin/UserEdit/UserEdit";
import Users from "../pages/admin/Users/Users";

const adminRoutes = [
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <WelcomeAdmin /> },
          { path: "products", element: <Products /> },
          { path: "products/new", element: <AddProduct /> },
          { path: "products/:id", element: <ProductEdit /> },
          { path: "categories/new", element: <AddCategory /> },
          { path: "categories/edit/:id", element: <CategoryEdit /> },
          { path: "categories", element: <Categories /> },
          { path: "blogs", element: <Blogs /> },
          { path: "blogs/new", element: <AddBlog /> },
          { path: "blogs/:id", element: <BlogEdit /> },
          { path: "users", element: <Users /> },
          { path: "users/new", element: <AddUser /> },
          { path: "users/edit/:id", element: <UserEdit /> },
        ],
      },
    ],
  },
];
export default adminRoutes;
