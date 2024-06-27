import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "./register.css";
import { register as registerUser } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import AuthGoogle from "../../../components/share/AuthGoogle/AuthGoogle";

export default function Register() {
  const clearSwitch = useRef(null);

  const { register, formState, handleSubmit, watch } = useForm({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      confirmPassword: "",
      policy: true,
    },
  });
  const userIsLoggedIn = useSelector((state) => state.user.user.isLoggedIn);
  const { errors, isSubmitting } = formState;
  const [failMessage, setFailMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (userIsLoggedIn) {
      navigate("/panel");
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  async function onSubmit(data) {
    setSuccessMessage(false);
    setFailMessage(false);
    const user = {
      username: data.username,
      password: data.password,
      firstname: data.firstname,
      lastname: data.lastname,
      role: "user",
    };

    const result = await registerUser(user);
    if (result.success && result.body) {
      setSuccessMessage(
        "Congratulations, your account has been successfully created."
      );
      setFailMessage("");
      clearSwitch.current = setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      setFailMessage(result.message);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <div className="register d-flex justify-content-center align-items-center flex-column ">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="mt-5">Online Registration Form</h1>
      <form
        className="form-register rounded-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        {failMessage && (
          <div>
            <h2 className="bg-white text-danger rounded-1 mb-5 fs-2 py-3 d-flex justify-content-center align-items-center">
              <MdOutlineError className="error" />
              {failMessage}
            </h2>
          </div>
        )}
        {successMessage && (
          <div>
            <h2 className="bg-white text-success rounded-1 mb-5 fs-3 py-3 px-3  d-flex justify-content-center align-align-items-baseline ">
              <FaCheckCircle className="check" />
              {successMessage}
            </h2>
          </div>
        )}
        <div className=" mb-5 d-flex flex-column justify-content-center align-items-baseline">
          <label className="text-white fs-3 mb-2 ">Firstname</label>
          <input
            className="input rounded-1 w-100"
            type="text"
            {...register("firstname", {
              required: "You must enter your Firstname",
              minLength: {
                value: 3,
                message: "Firstname must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "Firstname must be 10 Characters at most",
              },
            })}
          />
        </div>
        <div className=" mb-5 d-flex flex-column justify-content-center align-items-baseline">
          <label className="text-white fs-3 mb-2 ">Lastname</label>
          <input
            className="input rounded-1 w-100"
            type="text"
            {...register("lastname", {
              required: "You must enter your Lastname",
              minLength: {
                value: 3,
                message: "Lastname must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "Lastname must be 10 Characters at most",
              },
            })}
          />
        </div>
        <div className=" mb-5 d-flex flex-column justify-content-center align-items-baseline">
          <label className="text-white fs-3 mb-2 ">Username</label>
          <input
            className="input rounded-1 w-100"
            type="text"
            {...register("username", {
              required: "You must enter your Username",
              minLength: {
                value: 3,
                message: "Username must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "Username must be 10 Characters at most",
              },
            })}
          />
        </div>
        <div className=" mb-5 d-flex flex-column justify-content-center align-items-baseline">
          <label className="text-white fs-3 mb-2 ">Password</label>
          <input
            className="input rounded-1 w-100"
            type="password"
            {...register("password", {
              required: "You must enter your Password",
              minLength: {
                value: 6,
                message: "Password must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "Password must be 10 Characters at most",
              },
            })}
          />
          {errors.password && (
            <p className="errors mt-3 text-white fs-5">
              {errors.password.message}
            </p>
          )}
        </div>
        <div className=" mb-5 d-flex flex-column justify-content-center align-items-baseline">
          <label className="text-white fs-3 mb-2 ">Confirm Password</label>
          <input
            className="input rounded-1 w-100"
            type="password"
            {...register("confirmPassword", {
              required: "You Must Enter Confirm Password",
              validate(value) {
                if (watch("password") !== value) {
                  return "Confirm Password Is Not Equel To Password";
                }
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="errors mt-3 text-white fs-5">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div>
          <div className="form-check d-flex justify-content-center align-items-baseline">
            <input
              className="me-2 fs-3 input-check"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              {...register("policy")}
            />
            <label
              className="check-label text-white fs-4"
              htmlFor="flexCheckDefault"
            >
              I accept the Terms of Use & Privacy Policy
            </label>
          </div>
        </div>
        <div className="mt-5 text-center">
          {isSubmitting ? (
            <button type="submit" className="btn-submit disabled">
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <div>
              <button type="submit" className="btn-submit rounded-1 w-100 fs-3">
                Sing Up
              </button>
              <hr className="text-white my-5 d-flex justify-content-center align-items-start" />
              <AuthGoogle />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
