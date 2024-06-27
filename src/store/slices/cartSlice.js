import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shops: localStorage.shopping ? JSON.parse(localStorage.shopping) : [],
  numOfShopping: 0,
  cartId: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartId(state, action) {
      state.cartId = action.payload;
    },
    setShops(state, action) {
      state.shops = action.payload;
    },
    setIncProduct(state, action) {
      localStorage.shopping = JSON.stringify(action.payload);
      state.shops = action.payload;
    },
    setDecProduct(state, action) {
      localStorage.shopping = JSON.stringify(action.payload);
      state.shops = action.payload;
    },
    setDeleteProduct(state, action) {
      localStorage.shopping = JSON.stringify(action.payload);
      state.shops = action.payload;
    },
  },
});

export default cartSlice;
const cartActions = cartSlice.actions;
export { cartActions };

export function setIncHandler(shopItem) {
  return function (dispatch, getState) {
    const shops = getState().cart.shops;
    const findProduct = shops.find((p) => p.title == shopItem.title);
    let newShops;
    if (findProduct) {
      newShops = shops.map((p) => {
        if (p.title == shopItem.title) {
          return {
            ...p,
            quantity: shopItem.quantity,
            totalPriceItem: shopItem.totalPriceItem,
          };
        } else {
          return p;
        }
      });
    } else {
      newShops = [...shops, shopItem];
    }
    dispatch(cartActions.setIncProduct(newShops));
  };
}

export function setDecHandler(shopItem) {
  return function (dispatch, getState) {
    const shops = getState().cart.shops;
    const findProduct = shops.find((p) => p._id == shopItem._id);
    let newShops;
    if (shopItem.quantity > 0) {
      newShops = shops.map((p) => {
        if (p._id == findProduct._id) {
          return { ...p, quantity: shopItem.quantity, totalPriceItem:shopItem.totalPriceItem };
        } else {
          return p;
        }
      });
    } else {
      newShops = shops.filter((p) => p.title != shopItem.title);
    }
    dispatch(cartActions.setDecProduct(newShops));
  };
}

export function setDeleteHandler(shopItem) {
  return function (dispatch, getState) {
    const shops = getState().cart.shops;
    const newShops = shops.filter((p) => p.title !== shopItem.title);
    dispatch(cartActions.setDeleteProduct(newShops));
  };
}
