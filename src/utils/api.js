import axios from "axios";

axios.defaults.baseURL = SERVER_URL;
const authAxios = axios.create({
  baseURL: SERVER_URL,
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.token ?? sessionStorage.token;
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  },
  (error) => console.log(error)
);

export async function initialize() {
  try {
    const { data } = await authAxios.get("/misc/initialize");
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}

export async function sendMsg(message) {
  try {
    const { data } = await authAxios.post("/message", message);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}

export async function register(user) {
  try {
    const { data } = await authAxios.post("/auth/register", user);

    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function login(user) {
  try {
    const { data } = await axios.post("/auth/login", user);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function authWithGoogle({ username, fullName }) {
  try {
    const { data } = await axios.post("/auth/google", { username, fullName });
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.response?.data.message || "Server Error",
    };
  }
}
export async function orderUser(product, username) {
  const {} = product;
  const order = {};
  try {
    const { data } = await authAxios.post("/order", order);
    return data;
  } catch (e) {
    return { success: "false", message: e.message };
  }
}
export async function createCart(userId, productId) {
  try {
    const { data } = await authAxios.post("/cart", { userId, productId });
    return data;
  } catch (e) {
    return { success: "false", message: e.message };
  }
}
export async function updateCart(cartId, productId, quantity) {
  try {
    const { data } = await authAxios.put("/cart/" + cartId, {
      id: productId,
      quantity,
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
export async function getCartById(cartId) {
  try {
    const { data } = await authAxios.get("/cart/" + cartId);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
export async function getAllCategories() {
  try {
    const { data } = await axios.get("/api/categories");
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function getProducts(
  page = 1,
  limit = 6,
  category = "",
  q = "",
  sort = "updatedAt",
  order = "desc"
) {
  try {
    const { data } = await axios.get("/api/products", {
      params: { page, limit, category, q, sort, order },
    });
    return data;
  } catch (e) {
    return e.message;
  }
}
export async function getCategories(page, limit = 5) {
  try {
    const { data } = await axios.get("/api/categories", {
      params: { page, limit },
    });
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function getUsers(page, limit) {
  try {
    const { data } = await authAxios.get("/api/users", { params: { page, limit } });
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function getBlogs(page, limit = 4) {
  try {
    const { data } = await axios.get("/api/blogs", {
      params: { page, limit },
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
export async function getBlogById(id) {
  try {
    const { data } = await axios.get(`/api/blogs/${id}`);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function getProductById(id) {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function getCategoryById(id) {
  try {
    const { data } = await axios.get(`/api/categories/${id}`);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function getUserById(id) {
  try {
    const { data } = await authAxios.get(`/api/users/${id}`);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function updateCategory(info, id) {
  try {
    const { data } = await authAxios.put("/api/categories/" + id, info);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function updateUser(
  id,
  firstname,
  lastname,
  password = "",
  role = ""
) {
  try {
    const { data } = await authAxios.put(`/api/users/${id}`, {
      firstname,
      lastname,
      password,
      role,
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
export async function updateProduct(id, productData) {
  try {
    const { data } = await authAxios.put("/api/products/" + id, productData);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function updateBlog(id, blogData) {
  try {
    const { data } = await authAxios.put("/api/blogs/" + id, blogData);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function createProduct(product) {
  try {
    const { data } = await authAxios.post("/api/products", product);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function createBlog(blog) {
  try {
    const { data } = await authAxios.post("/api/blogs", blog);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function createCategory(info) {
  try {
    const { data } = await authAxios.post("/api/categories", info);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function orderPurchases(cartId, userId, transactionNumber) {
  try {
    const { data } = await authAxios.post("/order", {
      cartId,
      userId,
      transactionNumber,
    });
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
export async function removeCart(id) {
  try {
    const { data } = await authAxios.delete("/cart/" + id);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}
export async function deleteCategory(id) {
  const config = getToken();
  try {
    const { data } = await axios.delete(`/api/categories/${id}`, config);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function removeUserById(id) {
  try {
    const { data } = await authAxios.delete(`/api/users/${id}`);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function removeProductById(id) {
  const config = getToken();
  try {
    const { data } = await axios.delete(`/api/products/${id}`, config);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function removeBlogById(id) {
  try {
    const { data } = await authAxios.delete(`/api/blogs/${id}`);
    return data;
  } catch (e) {
    return { success: false, message: e.response.data.message };
  }
}
export async function uploadFile(file) {
  try {
    const form = new FormData();
    form.append("file", file);
    const { data } = await authAxios.post("/uploads", form);
    return data;
  } catch (e) {
    return {
      success: false,
      message: e.message,
    };
  }
}
export async function getPurchases(userId) {
  try {
    const { data } = await authAxios.get("/order/" + userId);
    return data;
  } catch (e) {
    return { success: false, message: e.message };
  }
}

function getToken() {
  const config = {};
  if (localStorage.token || sessionStorage.token) {
    const token = localStorage.token || sessionStorage.token;
    config.headers = { Authorization: "Bearer " + token };
    return config;
  }
}
