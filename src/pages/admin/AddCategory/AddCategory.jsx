import React, { useEffect, useReducer, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../../../utils/api";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import CategoryForm from "../../../components/admin/CategoryForm/CategoryForm";
import { Helmet } from "react-helmet";

export default function AddCategory() {
  const [failMessage, setFailMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const clearSwitch = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  async function submitHandler(data) {
    const result = await createCategory(data);
    if (result.success) {
      setFailMessage(false);
      setSuccessMessage("New Category Created Successfully");
      clearSwitch.current = setTimeout(() => {
        navigate("/admin/categories");
      }, 2000);
    } else {
      setFailMessage(result.message);
    }
  }
  return (
    <div className="createCategory px-2 px-md-4 py-5">
      <Helmet>
        <title>New Category</title>
      </Helmet>
      {failMessage && (
        <div>
          <h2 className=" bg-white text-danger mb-5 fs-2 py-3 d-flex justify-content-center align-items-center">
            <MdOutlineError className="error me-3" />
            {failMessage}
          </h2>
        </div>
      )}
      {successMessage && (
        <div>
          <h2 className=" bg-white text-success mb-5 fs-3 py-3 px-3  d-flex justify-content-center align-align-items-baseline ">
            <FaCheckCircle className="check me-3" />
            {successMessage}
          </h2>
        </div>
      )}
      <h1>Create Category</h1>
      <CategoryForm type="new" onSubmit={submitHandler} />
    </div>
  );
}
