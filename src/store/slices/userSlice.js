import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    isLoggedIn: false,
    isAdmin: false,
    Username: "",
    firstname: "",
    lastname: "",
    role: "",
  },
  theme: "light",
  categories: [],
  initialized: false,
  initializedError: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setInitializedError(state, action) {
      state.initializedError = action.payload;
    },
    setTheme(state, action) {
      localStorage.theme = action.payload;
      state.theme = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setInitialized(state, action) {
      state.initialized = action.payload;
    },
    setLogout(state, action) {
      delete localStorage.token;
      delete sessionStorage.token;
      state.user.isLoggedIn = action.payload;
    },
  },
});

export default userSlice;
const userActions = userSlice.actions;
export { userActions };
