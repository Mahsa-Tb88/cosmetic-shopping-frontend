import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./productForm.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { createProduct, updateProduct, uploadFile } from "../../../utils/api";

export default function ProductForm({ product, type }) {
  const noImage = SERVER_URL + "/uploads/others/no-image1716163385221.jpg";
  const [selectedImage, setSelectedImage] = useState(noImage);
  const [imageChanged, setImageChanged] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const clearSwitch = useRef(null);

  useEffect(() => {
    if (type === "edit") {
      if (product.image) {
        setSelectedImage(SERVER_URL + `${product.image}`);
      } else {
        setSelectedImage(noImage);
      }
    }
    if (globalThis.newProduct) {
      setSuccessMessage("New product created successfully");
      globalThis.newProduct = false;
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, []);

  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      title: product ? product.title : "",
      description: product ? product.description : "",
      price: product ? product.price : "",
      category: product ? product.category : 1,
      image: product?.image ? product.image : "",
    },
  });
  const categories = useSelector((state) => state.user.categories);

  const imageField = { ...register("image") };

  async function handleImageSelect(e) {
    imageField.onChange(e);
    const file = e.target.files[0];
    if (file) {
      setImageChanged(true);
      const result = await uploadFile(file);
      if (result.success) {
        setSelectedImage(SERVER_URL + result.body.url);
      } else {
        setFailMessage(result.message);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
    }
  }
  async function onSubmit(data) {
    setFailMessage("");
    setSuccessMessage("");

    if (data.image?.length && imageChanged) {
      data.image = selectedImage.substring(21);
    }

    if (type == "new") {
      const result = await createProduct(data);
      if (result.success) {
        globalThis.newProduct = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
        clearSwitch.current = setTimeout(() => {
          navigate("/admin/products/" + result.body._id, { replace: true });
        }, 2000);
      } else {
        setFailMessage(result.message);
      }
    } else {
      const result = await updateProduct(params.id, data);
      if (result.success) {
        setSuccessMessage("Your Product Updated Successfully");
        setImageChanged(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setFailMessage(result.message);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleRemoveImage() {
    setSelectedImage(noImage);
    setValue("image", "");
  }
  return (
    <form className="ms-3  mt-5 productform" onSubmit={handleSubmit(onSubmit)}>
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
      <div>
        <div className="d-flex flex-column justify-content-center align-items-start mb-4">
          <label className="mb-1 label fs-3">Title of Product</label>
          <input
            type="text"
            className={`inputProduct px-2 py-2 rounded-1 form-control ${
              errors.title ? "is-invalid" : ""
            }`}
            {...register("title", {
              required: "You must enter a title of product",
              minLength: {
                value: 3,
                message: "title must be 3 Characters at least",
              },
              maxLength: {
                value: 30,
                message: "title must be 10 Characters at most",
              },
            })}
          />
          {errors.title && (
            <p className="errors mt-3 rounded-1">{errors.title.message}</p>
          )}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start mb-4">
          <label className="mb-1 label fs-3">Description of Product</label>
          <textarea
            type="text"
            className={`inputProduct px-2 py-2 rounded-1 ${
              errors.description ? "is-invalid" : ""
            } `}
            rows={10}
            {...register("description", {
              required: "You must enter the description of product",
              minLength: {
                value: 10,
                message: "description of product must be 3 Characters at least",
              },
              maxLength: {
                value: 2000,
                message:
                  "description of product must be 2000 Characters at most",
              },
            })}
          ></textarea>
          {errors.description && (
            <p className="errors mt-3 rounded-1 ">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className=" d-flex  flex-column justify-content-center align-items-start mb-4">
          <label className="mb-1 label fs-3">Price of Product</label>
          <div className="input-group ">
            <span className="input-group-text px-3 py-md-2 ">$</span>

            <input
              type="text"
              className="px-2 py-2   form-control inputProduct"
              {...register("price", {
                validate(value) {
                  if (isNaN(Number(value))) {
                    return "Please Enter Number";
                  } else if (value < 10 || value > 10000) {
                    return "The Price Should Be Between $10 to $10000";
                  }
                },
              })}
            />
          </div>

          {errors.price && (
            <p className="errors mt-3 rounded-1">{errors.price.message}</p>
          )}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start mb-4">
          <label className="mb-1 label fs-3">Category of Product</label>
          <select
            className="inputProducts form-select inputProduct px-2 py-2 rounded-1 input"
            {...register("category", {
              required: "Select the category",
            })}
          >
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="errors mt-3 rounded-1">{errors.category.message}</p>
          )}
        </div>
        <div className="d-flex  flex-column justify-content-center align-items-start mt-5 mb-4">
          <h3 className="mb-1 label fs-3">Image of Product</h3>
          <div className=" d-flex flex-column flex-md-row  justify-content-between align-items-center">
            <div className="me-4 d-flex justify-content-center align-items-center flex-column">
              <div>
                <input
                  {...imageField}
                  id="selectImage"
                  className="d-none inputProduct rounded-1"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <label
                  className="btn-select mt-5 mb-4 text-center text-white px-4 py-2 border-0 fs-3 rounded-2"
                  htmlFor="selectImage"
                >
                  Select Image
                </label>
              </div>
              <button
                type="button"
                className="btn-remove text-white px-4 py-2 border-0 fs-3 rounded-1"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
            <img
              src={selectedImage}
              width={200}
              height={200}
              className="mt-5 mt-md-0"
            />
          </div>
          {errors.image && (
            <p className="errors mt-3 rounded-1">{errors.image.message}</p>
          )}
        </div>

        <div>
          {isSubmitting ? (
            <button
              type="submit"
              className="btn-submit border-0 py-2 fs-3  mt-5 disabled rounded-1"
            >
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <button
              type="submit"
              className="btn-submit border-0 py-3 fs-3 my-5 rounded-1"
            >
              {type == "new" ? "Create Product" : "Save Product"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
