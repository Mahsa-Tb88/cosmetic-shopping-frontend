import React from "react";
import { useSelector } from "react-redux";
import "./initializer.css";

export default function Initializer({ initializeApp }) {
  const initializedError = useSelector((state) => state.user.initializedError);

  if (initializedError) {
    return (
      <div>
        <h2>{initializedError}</h2>
        <button className="btn" onClick={() => initializeApp()}>
          Try Again
        </button>
      </div>
    );
  } else {
    return (
      <div className="initializer d-flex justify-content-center align-items-center vw-100 vh-100 ">
        <h2 className="mb-4 loading">Loading ...</h2>
        <span className="ms-3 spiner spinner-grow fs-1"></span>
      </div>
    );
  }
}
