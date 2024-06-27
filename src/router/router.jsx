import { createBrowserRouter } from "react-router-dom";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";

const router = createBrowserRouter([...publicRoutes, ...adminRoutes]);

export default router;
