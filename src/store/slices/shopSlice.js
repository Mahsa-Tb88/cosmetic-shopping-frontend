import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page: 1,
  q: "",
  limit: 6,
  category: "",
  sort: "updated",
  order: "desc",
  delay: 10,
  products: [],
  totalProducts: 0,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.page = action.payload.page;
      state.q = action.payload.q;
      state.limit = action.payload.limit;
      state.category = action.payload.category;
      state.sort = action.payload.sort;
      state.order = action.payload.order;
      state.delay = action.payload.delay;
    },
    setProducts(state, action) {
      state.products = action.payload;
    },
    setTotalProducts(state, action) {
      state.totalProducts = action.payload;
    },
  },
});

export default shopSlice;
const shopActions = shopSlice.actions;
export { shopActions };
