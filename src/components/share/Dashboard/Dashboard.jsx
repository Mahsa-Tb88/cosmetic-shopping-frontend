import React, { useEffect } from "react";
import "./dashboard.css";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);
  return (
    <div className="text-center dashboard">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1 className="mb-5  title">Welcome to Dashboard</h1>
      <p className="desc w-75 mx-auto">
        You can use right menu for editing your profile
      </p>
    </div>
  );
}
