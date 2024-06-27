import React, { useEffect, useRef, useState } from "react";
import { register } from "../../../utils/api";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import UserForm from "../../../components/admin/UserForm/UserForm";

export default function AddUser() {
  const [failMessage, setFailMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const navigate = useNavigate();
  const clearSwitch = useRef();
  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  async function submitHandler(data) {
    const result = await register(data);
    if (result.success) {
      setFailMessage(false);
      setSuccessMessage("New User Created successfully");
      clearSwitch.current = setTimeout(() => {
        navigate("/admin/users");
      }, 4000);
    } else {
      console.log(result);
      if (result.code == 403) {
        setFailMessage("You do not have authorization!");
      } else if (result.code == 409) {
        setFailMessage("This Username has already exists!");
      } else {
        setFailMessage("Error Connection!");
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="addUser px-2 px-md-4 py-5">
      <Helmet>
        <title>New User</title>
      </Helmet>
      {failMessage && (
        <div>
          <h2 className="w-75 bg-white text-danger mb-5 fs-2 py-3 d-flex justify-content-center align-items-center">
            <MdOutlineError className="error me-3" />
            {failMessage}
          </h2>
        </div>
      )}
      {successMessage && (
        <div>
          <h2 className="w-75 bg-white text-success mb-5 fs-3 py-3 px-3  d-flex justify-content-center align-align-items-baseline ">
            <FaCheckCircle className="check me-3" />
            {successMessage}
          </h2>
        </div>
      )}
      <h1>Add User</h1>
      <UserForm type="new" onSubmit={submitHandler} />
    </div>
  );
}
