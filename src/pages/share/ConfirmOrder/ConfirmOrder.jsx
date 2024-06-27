import React, { useEffect, useState } from "react";
import "./confirmOrder.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { removeCart } from "../../../utils/api";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/slices/cartSlice";

export default function ConfirmOrder() {
  const params = useParams();
  const idCart = params.id;
  const dispatch = useDispatch();
  const [transactionNumber, setTransactionNumber] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(deleteCart, 10);
    return () => clearTimeout(timeOut);
  }, []);

  async function deleteCart() {
    const result = await removeCart(idCart);
    if (result.success) {
      setTransactionNumber(result.body);
      dispatch(cartActions.setShops([]));
      dispatch(cartActions.setCartId(0));
      localStorage.shopping = JSON.stringify([]);
    } else {
    }
  }
  return (
    <div>
      <Helmet>
        <title>Confirmation Order</title>
      </Helmet>
      <div className="confirm ">
        <div className="confirm-container px-4 py-5">
          <p className=" msg fs-1">Thank you, your order has been placed.</p>
          <div className="mt-5 transaction">
            <span className="fs-4">Transaction Number:</span>
            <span className="ms-3 fs-4">{transactionNumber}</span>
          </div>
        </div>
       
      </div>
    </div>
  );
}
