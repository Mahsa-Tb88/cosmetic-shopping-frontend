import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, updateCategory } from "../../../utils/api";
import { Helmet } from "react-helmet";
import CategoryForm from "../../../components/admin/CategoryForm/CategoryForm";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

export default function CategoryEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState({});
  const [failMessage, setFailMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const clearSwitch = useRef(null);

  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(fetchCategory, 20);
    return () => clearTimeout(timeOut);
  }, []);
  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  async function fetchCategory() {
    setIsLoading(true);
    const result = await getCategoryById(id);
    if (result.success) {
      setError(false);
      setCategory(result.body);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  }

  async function submitHandler(data) {
    const result = await updateCategory(data, id);
    if (result.success) {
      setFailMessage(false);
      setSuccessMessage("The category updated successfully");
      clearSwitch = setTimeout(() => {
        navigate("/admin/categories");
      }, 2000);
    } else {
      setFailMessage(result.message);
    }
  }
  return (
    <div className="editCategory px-2 px-md-4 py-5">
      {isLoading ? (
        <div className="fs-2 text-center loadingCategoryAdmin">
          <p>Loading ...</p>
          <p className=" spinner spinner-grow"></p>
        </div>
      ) : error ? (
        <div className="text-center loadingCategoryAdmin w-75 mx-auto">
          <p className="fs-1">Error Connection</p>
          <button className="btn-tryAgain fs-3" onClick={() => fetchCategory()}>
            Try Again
          </button>
        </div>
      ) : (
        <div>
          {failMessage && (
            <div>
              <h2 className="bg-white text-danger mb-5 fs-2 py-3 d-flex justify-content-center align-items-center">
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
          <Helmet>
            <title>Edit Category</title>
          </Helmet>
          <h1>Edit Category</h1>
          <CategoryForm
            type="edit"
            onSubmit={submitHandler}
            category={category}
          />
        </div>
      )}
    </div>
  );
}
