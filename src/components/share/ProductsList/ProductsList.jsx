import React, { useEffect, useState } from "react";
import "./productsList.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setIncHandler,
  setDecHandler,
  setDeleteHandler,
  cartActions,
} from "../../../store/slices/cartSlice";
import { createCart, updateCart } from "../../../utils/api";
import { toast } from "react-toastify";

export default function ProductsList() {
  const shops = useSelector((state) => state.cart.shops);
  const cartId = useSelector((state) => state.cart.cartId);
  const userId = useSelector((state) => state.user.user._id);
  const products = useSelector((state) => state.shop.products);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function incHandler(product) {
    if (!userId) {
      navigate("/login");
      return;
    }
    const productId = product._id;
    const quantity = 1;
    if (!cartId) {
      const result = await createCart(userId, productId);
      if (result.success) {
        dispatch(cartActions.setCartId(result.body._id));
        dispatch(
          setIncHandler({
            title: product.title,
            price: product.price,
            quantity: 1,
            totalPriceItem: product.price,
            _id: result.body.items[0]._id,
          })
        );
      } else {
        toast.error(result.message);
      }
    } else {
      const result = await updateCart(cartId, productId, quantity);
      if (result.success) {
        dispatch(
          setIncHandler({
            title: product.title,
            price: product.price,
            quantity: 1,
            totalPriceItem: product.price,
            _id: result.body._id,
          })
        );
      } else {
        toast.error(result.message);
      }
    }
  }
  return (
    <div className="row  productList ms-3">
      {products.map((p) => {
        const selectedItem = shops.find((item) => item.title == p.title);

        return (
          <div className=" col-12 col-md-6 col-lg-4 px-2 mb-5 " key={p._id}>
            <div className="px-3 h-100">
              <div className="product d-flex flex-column justify-content-center align-items-baseline border border-1 h-100">
                <Link className="link  w-100" to={"/product/" + `${p._id}`}>
                  <div className="img-product ">
                    <img className="" src={SERVER_URL + p.image} />
                  </div>
                  <h3 className="pt-5 px-2 pb-3 mb-4 text-center title">
                    {p.title}
                  </h3>
                </Link>
                <div className="d-flex mt-auto justify-content-between align-items-center w-100   py-3 px-2">
                  <span className="fs-3">Price</span>
                  <span className="fs-3">${p.price}</span>
                </div>
                <div className="w-100">
                  {!selectedItem ? (
                    <button
                      className="btn-addToCart text-white py-4 fs-4"
                      onClick={() => incHandler(p)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <AddtoCart product={p} />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AddtoCart({ product }) {
  const dispatch = useDispatch();
  const shops = useSelector((state) => state.cart.shops);
  const findProduct = shops.find((p) => p.title == product.title);
  const cartId = useSelector((state) => state.cart.cartId);

  function findQuntityOfProduct(product) {
    return shops.find((i) => i.title == product.title);
  }

  async function incHandler(product) {
    const itemInShop = findQuntityOfProduct(product);
    const quantity = itemInShop.quantity + 1;
    const productId = product._id;
    const result = await updateCart(cartId, productId, quantity);

    if (result.success) {
      dispatch(
        setIncHandler({
          title: product.title,
          price: product.price,
          quantity,
          totalPriceItem: product.price * quantity,
          _id: itemInShop._id,
        })
      );
    } else {
      toast.error(result.message);
    }
  }

  async function decHandler(product) {
    const itemInShop = findQuntityOfProduct(product);
    let quantity;
    if (itemInShop.quantity == 1) {
      quantity = 0;
    } else {
      quantity = itemInShop.quantity - 1;
    }
    const productId = product._id;
    const result = await updateCart(cartId, productId, quantity);
    if (result.success) {
      dispatch(
        setDecHandler({
          title: product.title,
          price: product.price,
          quantity,
          totalPriceItem: product.price * quantity,
          _id: itemInShop._id,
        })
      );
    } else {
      toast.error(result.message);
    }
  }
  async function deleteHandler(product) {
    const itemInShop = findQuntityOfProduct(product);

    const productId = product._id;
    const quantity = 0;
    const result = await updateCart(cartId, productId, quantity);
    if (result.success) {
      dispatch(
        setDeleteHandler({
          title: product.title,
          price: product.price,
          quantity: product.quantity,
          totalPriceItem: product.price * product.quantity,
          _id: itemInShop._id,
        })
      );
    } else {
      toast.error(result.message);
    }
  }
  return (
    <div className="px-2 py-3 d-flex justify-content-between align-items-center mt-auto btn-add">
      <div
        className="btn-trash d-flex justify-content-center align-items-center"
        onClick={() => deleteHandler(product)}
      >
        <FaRegTrashAlt size={17} />
      </div>
      <div className="d-flex justify-content-around align-items-center">
        <span className="btn-minus" onClick={() => decHandler(product)}>
          <FaMinus size={15} />
        </span>
        <span className="text-black mx-3 fs-4">{findProduct.quantity}</span>
        <span className="btn-plus" onClick={() => incHandler(product)}>
          <FaPlus size={15} />
        </span>
      </div>
    </div>
  );
}
