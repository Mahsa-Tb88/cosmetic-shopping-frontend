import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./userForm.css";

export default function FormUser({ onSubmit, type, user }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstname: user ? user.firstname : "",
      lastname: user ? user.lastname : "",
      username: user ? user.username : "",
      password: "",
      role: user ? user.role : "",
    },
  });

  return (
    <form
      className="mx-3 ms-md-3 userForm mt-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="table">
        <div className="d-flex flex-column justify-content-center align-items-start mb-5">
          <label className="mb-1 label fs-3">Firstname</label>
          <input
            type="text"
            className="inputUser  px-2 py-2 py-md-3 rounded-1"
            {...register("firstname", {
              required: "You must enter a firstname for user",
              minLength: {
                value: 3,
                message: "firstname must be 3 Characters at least",
              },
              maxLength: {
                value: 20,
                message: "firstname must be 20 Characters at most",
              },
            })}
          />
          {errors.firstname && (
            <p className="errors rounded-1 mt-3 fs-5">
              {errors.firstname.message}
            </p>
          )}
        </div>

        <div className="d-flex flex-column justify-content-center align-items-start mb-5">
          <label className="mb-1 label fs-3">Lastname</label>
          <input
            type="text"
            className="inputUser  px-2 py-2 py-md-3 rounded-1"
            {...register("lastname", {
              required: "You must enter a lastname",
              minLength: {
                value: 3,
                message: "lastname must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "lastname must be 10 lastname at most",
              },
            })}
          />
          {errors.lastname && (
            <p className="errors rounded-1 rounded-1 mt-3 fs-5">
              {errors.lastname.message}
            </p>
          )}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-start mb-5">
          <label className="mb-1 label fs-3">Username</label>
          <input
            type="text"
            className="inputUser  px-2 py-2 py-md-3 rounded-1"
            {...register("username", {
              required: "You must enter a username",
              minLength: {
                value: 3,
                message: "username must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "username must be 10 characters at most",
              },
              disabled: user ? true : false,
            })}
          />
          {errors.username && (
            <p className="errors rounded-1 mt-3 fs-5">
              {errors.username.message}
            </p>
          )}
        </div>
        {user ? (
          ""
        ) : (
          <div className="d-flex flex-column justify-content-center align-items-start mb-5">
            <label className="mb-1 label fs-3">Password</label>
            <input
              type="password"
              className="inputUser  px-2 py-2 py-md-3 rounded-1"
              {...register("password", {
                required: "You must enter a password",
                minLength: {
                  value: 6,
                  message: "password must be 6 characters at least",
                },
                maxLength: {
                  value: 10,
                  message: "password must be 10 characters at most",
                },
              })}
            />
            {errors.password && (
              <p className="errors rounded-1 mt-3 fs-5">
                {errors.password.message}
              </p>
            )}
          </div>
        )}

        <div className="d-flex flex-column justify-content-center align-items-start mb-5">
          <label className="mb-1 label fs-3">Role</label>
          <select
            className="inputUser form-select fs-3  px-2 py-2 py-md-3 rounded-1"
            {...register("role", {
              required: "Select the role",
            })}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          {errors.role && (
            <p className="errors rounded-1 mt-3 fs-5">{errors.role.message}</p>
          )}
        </div>
        {isSubmitting ? (
          <button
            type="submit"
            className="btn-submit border-0 py-2 fs-3 mt-5 disabled"
          >
            <span className="spinner-grow spinner-spinner-grow-sm"></span>
          </button>
        ) : (
          <div>
            <button
              type="submit"
              className="btn-submit border-0 py-3 px-3 fs-3 my-5"
            >
              {type == "new" ? "Create User" : "Save User"}
            </button>
            <Link
              to="/admin/users"
              className="btn-Cansel text-center border-0 py-3 px-3 fs-3 my-5 link ms-5"
            >
              Cansel
            </Link>
          </div>
        )}
      </div>
    </form>
  );
}
