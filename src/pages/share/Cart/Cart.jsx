import React, { useEffect, useState } from "react";
import "./cart.css";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import {
  setDecHandler,
  setDeleteHandler,
  setIncHandler,
} from "../../../store/slices/cartSlice";
import { getProducts, orderPurchases, updateCart } from "../../../utils/api";
import { toast } from "react-toastify";

export default function Cart() {
  const shops = useSelector((state) => state.cart.shops);
  const cartId = useSelector((state) => state.cart.cartId);
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.user.isLoggedIn);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
    const timeOut = setTimeout(fetchProducts, 10);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchProducts() {
    const result = await getProducts(1, 1000);
    if (result.success) {
      setProducts(result.body);
    } else {
    }
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (shops.length) {
      localStorage.shopping = JSON.stringify(shops);
    } else {
      delete localStorage.shopping;
    }
  }, [shops]);

  let totalPrice = 0;
  shops.forEach((element) => {
    totalPrice = element.totalPriceItem + totalPrice;
  });

  function goToPageOfProduct(shopping) {
    const product = findProduct(shopping);
    navigate("/product/" + product._id);
  }
  async function addToPurchases() {
    const transactionNumber = Date.now();
    const result = await orderPurchases(cartId, userId, transactionNumber);

    if (result.success) {
      navigate("/panel/confirmOrder/" + cartId);
    } else {
    }
  }
  function findProduct(shopping) {
    const product = products.find((i) => i.title == shopping.title);
    return product;
  }
  async function removeItem(shopping) {
    const product = findProduct(shopping);
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
          _id: shopping._id,
        })
      );
    } else {
    }
  }

  async function decNumOfItem(shopping) {
    const product = findProduct(shopping);
    let quantity;
    if (shopping.quantity == 1) {
      quantity = 0;
    } else {
      quantity = shopping.quantity - 1;
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
          _id: shopping._id,
        })
      );
    } else {
      toast.error(result.message);
    }
  }

  async function incNumOfItem(shopping) {
    const product = findProduct(shopping);
    const quantity = shopping.quantity + 1;
    const productId = product._id;
    const result = await updateCart(cartId, productId, quantity);
    if (result.success) {
      dispatch(
        setIncHandler({
          title: product.title,
          price: product.price,
          quantity,
          totalPriceItem: product.price * quantity,
          _id: shopping._id,
        })
      );
    } else {
    }
  }

  return (
    <div className="cart vh-100 px-2 px-md-0">
      <Helmet>Cart</Helmet>
      <h1 className="my-5 text-center">Shopping Cart</h1>
      {shops.length ? (
        <table className="table table-bordered table-striped text-center ">
          <thead className="table-dark">
            <tr className="table-row">
              <th scope="col">Row</th>
              <th scope="col">Title</th>
              <th scope="col">Number Of Item</th>
              <th scope="col">Price</th>
              <th scope="col">Total Price</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {shops.map((p, i) => {
              return (
                <tr key={p._id} className="table-row">
                  <th scope="row">{i + 1}</th>

                  <td>
                    <Link
                      className="linkcart"
                      onClick={() => goToPageOfProduct(p)}
                    >
                      {p.title}
                    </Link>
                  </td>
                  <td>
                    <div className="d-flex justify-content-around align-items-center">
                      <span
                        className="btn-minuCart"
                        onClick={() => decNumOfItem(p)}
                      >
                        <FaMinus />
                      </span>
                      <span className="linkcart ">{p.quantity}</span>
                      <span
                        className="btn-plusCart"
                        onClick={() => incNumOfItem(p)}
                      >
                        <FaPlus />
                      </span>
                    </div>
                  </td>
                  <td>$ {p.price}</td>
                  <td>${p.totalPriceItem}</td>
                  <td>
                    <div
                      className="btn-trashCart d-flex justify-content-center align-items-center rounded-1"
                      onClick={() => removeItem(p)}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" className="totalPrice fw-bold ">
                Total Price
              </td>
              <td className="totalPrice fw-bold ">$ {totalPrice}</td>

              <td colSpan={3}>
                <button
                  className="btn-purchases rounded-1 "
                  onClick={() => addToPurchases()}
                >
                  buy now
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <div className="vh-100">
          <p className="text-center cardEmpty fs-2 rounded-1">
            Your card is empty
          </p>
        </div>
      )}
    </div>
  );
}
