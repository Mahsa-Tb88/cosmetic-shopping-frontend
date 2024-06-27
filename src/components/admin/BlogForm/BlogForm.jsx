import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import "./blogForm.css";

import { createBlog, updateBlog, uploadFile } from "../../../utils/api";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";

export default function BlogForm({ type, blog }) {
  const noImage = SERVER_URL + "/uploads/others/no-image1716163385221.jpg";
  const [selectedImage, setSelectedImage] = useState(noImage);
  const [imageChanged, setImageChanged] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState();
  const navigate = useNavigate();
  const params = useParams();
  console.log(blog);
  let itemsArray = [];

  if (blog) {
    blog.items.forEach((element) => {
      itemsArray.push(element);
    });
  }

  const { register, handleSubmit, formState, setValue, control } = useForm({
    defaultValues: {
      title: blog ? blog.title : "",
      description: blog ? blog.description : "",
      slug: blog ? blog.slug : "",
      image: blog?.image ? blog.image : "",
      items: blog ? itemsArray : [{ titleItem: "", descItem: "" }],
      details: blog ? [blog.details[0], blog.details[1]] : ["", ""],
    },
  });

  const { fields, remove, append, prepend } = useFieldArray({
    name: "items",
    control,
  });

  useEffect(() => {
    if (type === "edit") {
      if (blog.image) {
        setSelectedImage(SERVER_URL + `${blog.image}`);
      } else {
        setSelectedImage(noImage);
      }
    }
    if (globalThis.newProduct) {
      setSuccessMessage("New blog created successfully");
      globalThis.newProduct = false;
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  }, []);
  const { errors, isSubmitting } = formState;

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

  function handleRemoveImage() {
    setSelectedImage(noImage);
    setValue("image", "");
  }

  async function onSubmit(data) {
    console.log(data);
    setFailMessage("");
    setSuccessMessage("");
    if (data.image?.length && imageChanged) {
      data.image = selectedImage.substring(31);
    }

    if (type === "new") {
      const result = await createBlog(data);
      if (result.success) {
        globalThis.newProduct = true;
        navigate("/admin/blogs/" + result.body._id, { replace: true });
      } else {
        setFailMessage(result.message);
      }
    } else if (type === "edit") {
      const result = await updateBlog(params.id, data);
      if (result.success) {
        setSuccessMessage("The blog updated successfully");
        setImageChanged(false);
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        setFailMessage(result.message);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  return (
    <form className="ms-3  mt-5 blogform" onSubmit={handleSubmit(onSubmit)}>
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
      <div className="formblog">
        <div className="d-flex flex-column justify-content-center align-items-start mb-5">
          <label className="mb-1 label">Title of Product</label>
          <input
            type="text"
            className={`inputBlog  px-2 py-2 rounded-1 form-control ${
              errors.title ? "is-invalid" : ""
            }`}
            {...register("title", {
              required: "You must enter a title of product",
              minLength: {
                value: 3,
                message: "title must be 3 Characters at least",
              },
              maxLength: {
                value: 70,
                message: "title must be 70 Characters at most",
              },
            })}
          />
          {errors.title && (
            <p className="errors mt-3 rounded-1">{errors.title.message}</p>
          )}
        </div>
        <div className=" d-flex flex-column justify-content-center align-items-start mb-5">
          <label className="mb-1 label">Slug</label>
          <input
            type="text"
            className={`inputBlog  px-2 py-2 rounded-1 form-control ${
              errors.title ? "is-invalid" : ""
            }`}
            {...register("slug", {
              required: "You must enter a slug of blog",
              minLength: {
                value: 3,
                message: "slug must be 3 Characters at least",
              },
              maxLength: {
                value: 30,
                message: "slug must be 10 Characters at most",
              },
            })}
          />
          {errors.slug && (
            <p className="errors mt-3 rounded-1">{errors.slug.message}</p>
          )}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start mb-5">
          <label className="mb-1 label">Description of Blog</label>
          <textarea
            type="text"
            className={`inputBlog  px-2 py-2 rounded-1 ${
              errors.description ? "is-invalid" : ""
            } `}
            rows={10}
            {...register("description", {
              required: "You must enter the description of blog",
              minLength: {
                value: 10,
                message: "description of blog must be 10 Characters at least",
              },
              maxLength: {
                value: 2000,
                message: "description of blog must be 2000 Characters at most",
              },
            })}
          ></textarea>
          {errors.description && (
            <p className="errors mt-3 rounded-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="w-100 d-flex flex-column justify-content-center align-items-start mb-5">
          {fields.map((field, index) => {
            return (
              <section
                key={field.id}
                className="sectionInput d-flex align-items-center justify-content-between"
              >
                <span className=" d-flex flex-column justify-content-center align-items-start mb-5 w-100 me-3">
                  <label className="mb-1 label">Title Item</label>
                  <input
                    className="inputBlog w-100  px-2 py-2 rounded-1 form-control"
                    {...register(`items.${index}.titleItem`)}
                  />
                </span>
                <span className=" d-flex flex-column justify-content-center align-items-start mb-5 w-100">
                  <label className="mb-1 label">Desc Item</label>
                  <input
                    className="inputBlog w-100  px-2 py-2 rounded-1 form-control"
                    {...register(`items.${index}.descItem`)}
                  />
                </span>
                <button
                  className="rounded-1 btnRemove border-0 px-5 py-2 ms-5 fs-5"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </section>
            );
          })}
          <button
            className="rounded-1 btnAppend px-5 py-2 border-0 fs-5"
            type="button"
            onClick={() => append({ titleItem: "", descItem: "" })}
          >
            Append
          </button>
        </div>
        <div className=" my-5 py-5">
          <div className=" d-flex flex-column justify-content-center align-items-start mb-5">
            <label className="mb-1 label">Field</label>
            <input
              type="text"
              className="inputBlog  px-2 py-2 rounded-1 form-control"
              {...register("details.0", {
                required: "You must enter a Field for blog",
                minLength: {
                  value: 3,
                  message: "field must be 3 Characters at least",
                },
                maxLength: {
                  value: 20,
                  message: "field must be 20 Characters at most",
                },
              })}
            />
            {errors.details && (
              <p className="errors mt-3 rounded-1">Enter a value for field</p>
            )}
          </div>
          <div className=" d-flex flex-column justify-content-center align-items-start mb-5">
            <label className="mb-1 label">Author</label>
            <input
              type="text"
              className="inputBlog  px-2 py-2 rounded-1 form-control"
              {...register("details.1", {
                required: "You must enter a Author for blog",
                minLength: {
                  value: 3,
                  message: "Author must be 3 Characters at least",
                },
                maxLength: {
                  value: 20,
                  message: "Author must be 20 Characters at most",
                },
              })}
            />
            {errors.details && (
              <p className="errors mt-3 rounded-1">Enter a value for author</p>
            )}
          </div>
        </div>
        <div className="d-flex  flex-column justify-content-center align-items-start mt-5 mb-5">
          <h3 className="mb-1 label">Image of Blog</h3>

          <div className=" d-flex flex-column flex-md-row justify-content-between align-items-center">
            <div className="me-4 d-flex  justify-content-center  align-items-center flex-column">
              <div>
                <input
                  {...imageField}
                  id="selectImage"
                  className="inputBlog d-none"
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                />
                <label
                  className="rounded-1 btn-select-img mt-5 mb-4 text-center text-white px-4 py-2 border-0 fs-3"
                  htmlFor="selectImage"
                >
                  Select Image
                </label>
              </div>
              <button
                type="button"
                className="rounded-1 btn-remove-img text-white px-4 py-2 border-0 fs-3"
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
            <img
              src={selectedImage}
              width={200}
              height={200}
              className="mt-5 mt-md-0 rounded-1"
            />
          </div>
          {errors.image && (
            <p className="errors mt-3">{errors.image.message}</p>
          )}
        </div>
        <div>
          {isSubmitting ? (
            <button
              type="submit"
              className="rounded-1 btn-submit border-0 py-2 fs-3 mt-5 disabled"
            >
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <button
              type="submit"
              className="rounded-1 btn-submit border-0 py-3 fs-3 my-5"
            >
              {type == "new" ? "Create Blog" : "Save Blog"}
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
