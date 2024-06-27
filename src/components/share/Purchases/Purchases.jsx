import React, { useEffect, useState } from "react";
import "./purchases.css";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { getPurchases } from "../../../utils/api";

export default function Purchases() {
  const userId = useSelector((state) => state.user.user._id);
  const [purchases, setParchases] = useState([]);

  useEffect(() => {
    const timeOut = setTimeout(fetchPurchases, 10);
    return () => clearTimeout(timeOut);
  }, []);

  async function fetchPurchases() {
    const result = await getPurchases(userId);
    if (result.success) {
      setParchases(result.body);
    } else {
    }
  }
  if (!purchases.length) {
    return (
      <div className="vh-100">
        <p className="text-center purchasesEmpty fs-2 rounded-1">
          Your Purchases is empty
        </p>
      </div>
    );
  }
  return (
    <div className="purchases">
      <Helmet>
        <title>Purchases</title>
      </Helmet>
      {purchases.map((item) => {
        return (
          <table
            className="table table-bordered table-striped text-center"
            key={item._id}
          >
            <thead className="table-dark">
              <tr className="table-row fs-5">
                <th scope="col">Row</th>
                <th scope="col">Title</th>
                <th scope="col"> Number</th>
                <th scope="col">Price</th>
                <th scope="col">Total Price Item</th>
              </tr>
            </thead>
            <tbody>
              {item.shops.map((p, i) => {
                return (
                  <tr key={p._id} className="table-row">
                    <th scope="row">{i + 1}</th>

                    <td>
                      <span className="fs-4">{p.title}</span>
                    </td>
                    <td>
                      <div className="d-flex justify-content-around align-items-center">
                        <span className="fs-4 ">{p.quantity}</span>
                      </div>
                    </td>
                    <td className="fs-4">${p.price}</td>
                    <td className="fs-4">${p.totalPriceItem}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="footer py-5 px-5">
                  <div className="totalPrice fw-bold fs-4 d-flex justify-content-between align-items-center">
                    <span>Transaction Number :</span>
                    <span>{item.transactionNumber}</span>
                  </div>
                  <div className="totalPrice py-2 fw-bold fs-4 d-flex justify-content-between align-items-center">
                    <span>Date :</span>
                    <span>{item.createdAt.split("T")[0]}</span>
                  </div>
                  <div className="totalPrice fw-bold fs-4 d-flex justify-content-between align-items-center">
                    <span>Total Price Cart : </span>
                    <span className="fs-3">${item.totalPriceOrder}</span>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        );
      })}
    </div>
  );
}
