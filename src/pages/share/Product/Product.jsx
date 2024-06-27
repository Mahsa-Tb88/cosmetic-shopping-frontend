import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { createCart, getProductById, updateCart } from "../../../utils/api";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  cartActions,
  setDecHandler,
  setDeleteHandler,
  setIncHandler,
} from "../../../store/slices/cartSlice";
import { Helmet } from "react-helmet";

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingError, setIsLoadinError] = useState(false);
  const params = useParams();
  const productId = params.id;
  const navigate = useNavigate();
  const shops = useSelector((state) => state.cart.shops);
  const cartId = useSelector((state) => state.cart.cartId);
  const userId = useSelector((state) => state.user.user._id);
  const dispatch = useDispatch();

  const cartProduct = shops.find((i) => i.title == selectedProduct.title);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const timeOut = setTimeout(fetchProdut, 20);
    return () => clearTimeout(timeOut);
  }, [params.id]);

  async function fetchProdut() {
    setIsLoading(true);
    const result = await getProductById(productId);
    if (result.success) {
      setIsLoading(true);
      setSelectedProduct(result.body);
    } else {
      setIsLoadinError({ message: result.message, code: result.code });
    }
    setIsLoading(false);
  }

  function findQuntityOfProduct(product) {
    return shops.find((i) => i.title == product.title);
  }

  async function removeItem(product) {
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
    }
  }

  async function decNumOfItem(product) {
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
    }
  }

  async function incNumOfItem(product) {
    if (!userId) {
      navigate("/login");
      return;
    }
    const itemInShop = findQuntityOfProduct(product);

    let quantity;
    if (itemInShop) {
      quantity = itemInShop.quantity + 1;
    } else {
      quantity = 1;
    }
    const productId = product._id;

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
      }
    } else {
      const result = await updateCart(cartId, productId, quantity);

      if (result.success) {
        dispatch(
          setIncHandler({
            title: product.title,
            price: product.price,
            quantity,
            totalPriceItem: product.price * quantity,
            _id: result.body._id,
          })
        );
      } else {
      }
    }
  }
  return (
    <div className="productPage  mx-auto d-flex justify-content-center align-items-center">
      <Helmet>
        <title>Product</title>
      </Helmet>
      {isLoading ? (
        <div className="text-center vh-100 d-flex justify-content-center align-items-center">
          <p className="loading fs-1">Loading ... </p>
          <p className="spinner spinner-grow fs-3"></p>
        </div>
      ) : loadingError ? (
        <div className=" text-center">
          <h2>{loadingError.message}</h2>
          {loadingError.code == "500" ? (
            <button className="btn my-5 px-3 y-2 btn-danger fs-4 ">
              Try again
            </button>
          ) : (
            <button
              className="btn my-5 btn-back px-3 py-2 fs-4"
              onClick={() => navigate("/shop")}
            >
              Back
            </button>
          )}
        </div>
      ) : (
        <div className="product-container mx-auto rounded-1">
          <h1 className=" text-white text-center text-lg-start  titleProduct">
            {selectedProduct.title}
          </h1>
          <div className=" row ">
            <div className="col-12 col-lg-6 order-lg-last">
              <div className="text-lg-end text-center">
                <img
                  src={SERVER_URL + selectedProduct.image}
                  className="rounded-1 image-product"
                />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <p className="desc-product text-white fs-3 mt-5 mt-lg-0">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <div className="my-3 ">
                <div className="my-5 price-product px-2 py-2 rounded-1 text-center">
                  <span className="fs-2 me-5 ">Price:</span>
                  <span className="fs-2 ">${selectedProduct.price}</span>
                </div>
                {cartProduct ? (
                  <div className=" operation-product rounded-1 d-flex justify-content-around align-items-center">
                    <div className="d-flex justify-content-around align-items-center">
                      <span
                        className="btn-minusProduct"
                        onClick={() => decNumOfItem(selectedProduct)}
                      >
                        <FaMinus />
                      </span>
                      <span className="text-black mx-3 mx-lg-5 fs-3 ">
                        {cartProduct.quantity}
                      </span>
                      <span
                        className="btn-plusProduct"
                        onClick={() => incNumOfItem(selectedProduct)}
                      >
                        <FaPlus />
                      </span>
                    </div>
                    <div
                      className="btn-trashProduct d-flex justify-content-center align-items-center"
                      onClick={() => removeItem(selectedProduct)}
                    >
                      <FaRegTrashAlt />
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-lg-start">
                    <button
                      className="btnAddToCartProduct   rounded-1"
                      onClick={() => incNumOfItem(selectedProduct)}
                    >
                      Add to Cart
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
