import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./categoryForm.css";
export default function CategoryForm({ category, onSubmit, type }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: category ? category.title : "",
      slug: category ? category.slug : "",
    },
  });

  return (
    <form
      className=" px-3 ms-md-3  mt-5 categoryForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="table">
        <div className="d-flex flex-column justify-content-center align-items-start mb-4">
          <label className="mb-1 label fs-3">Title of Category</label>
          <input
            type="text"
            className="inputCategory   px-2 py-2 py-md-3 rounded-1"
            {...register("title", {
              required: "You must enter a title for category",
              minLength: {
                value: 3,
                message: "title must be 3 Characters at least",
              },
              maxLength: {
                value: 20,
                message: "title must be 20 Characters at most",
              },
            })}
          />
          {errors.title && (
            <p className="errors mt-3 fs-5">{errors.title.message}</p>
          )}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start mb-4">
          <label className="mb-1 label fs-3">Slug of Category</label>
          <input
            type="text"
            className="inputCategory  px-2 py-2 py-md-3 rounded-1"
            {...register("slug", {
              required: "You must enter a family",
              minLength: {
                value: 3,
                message: "Slug must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "Slug must be 10 Characters at most",
              },
            })}
          />
          {errors.slug && (
            <p className="errors mt-3 fs-5">{errors.slug.message}</p>
          )}
        </div>
        {isSubmitting ? (
          <button
            type="submit"
            className="btn-submit border-0 py-2 px-5 fs-3 mt-5 disabled"
          >
            <span className="spinner-grow spinner-spinner-grow-sm"></span>
          </button>
        ) : (
          <div>
            <button
              type="submit"
              className="btn-submit border-0 py-3 px-3 me-3 me-md-0 fs-3 my-3 my-md-5"
            >
              {type == "new" ? "Create Category" : "Save Category"}
            </button>
            <Link
              to="/admin/categories"
              className="btn-Cansel text-center border-0 py-3 px-3 fs-3 my-md-5 link my-3 ms-md-5"
            >
              Cansel
            </Link>
          </div>
        )}
      </div>
    </form>
  );
}
