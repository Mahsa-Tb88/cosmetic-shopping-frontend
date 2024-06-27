import React, { useEffect, useState } from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/slices/userSlice";
import { Helmet } from "react-helmet";
import AuthGoogle from "../../../components/share/AuthGoogle/AuthGoogle";
export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
      password: "",
      rememberme: false,
    },
  });
  const { errors, isSubmitting } = formState;
  const [failMessage, setFailMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    if (user.isLoggedIn) {
      navigate("/panel");
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  async function onSubmit(data) {
    const result = await login({
      username: data.username,
      password: data.password,
    });

    if (result.success) {
      const { user, token } = result.body;
      dispatch(
        userActions.setUser({
          isLoggedIn: true,
          isAdmin: user.role == "admin" || user.role == "Main Admin",
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        })
      );
      if (data.rememberme) {
        localStorage.token = token;
      } else {
        delete localStorage.token;
        sessionStorage.token = token;
      }
      navigate("/panel");
    } else {
      setFailMessage(result.message);
    }
  }

  return (
    <div className=" login d-flex flex-column justify-content-center align-items-center ">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="mt-5 display-5">Sign In</h1>
      <form className="form_login rounded-1" onSubmit={handleSubmit(onSubmit)}>
        {failMessage.length > 0 && (
          <div className="mb-4">
            <h5 className="fs-3 text-danger text-center bg-white py-2">
              {failMessage}
            </h5>
          </div>
        )}
        <div className="d-flex  flex-column justify-align-content-center align-items-baseline mb-5">
          <label className="text-white fs-3 mb-2 ">Username</label>
          <input
            className="input w-100 rounded-1"
            type="text"
            {...register("username", {
              required: "You must enter your username",
              minLength: {
                value: 3,
                message: "Username must be 3 Characters at least",
              },
              maxLength: {
                value: 30,
                message: "Username must be 30 Characters at most",
              },
            })}
          />
          {errors.username && (
            <p className="text-danger mt-2  bg-white rounded-1 px-2 fs-4 py-2">{errors.username.message}</p>
          )}
        </div>
        <div className="d-flex  flex-column justify-align-content-center align-items-baseline mb-5">
          <label className="text-white fs-3 mb-2">Password</label>
          <input
            className="input w-100 rounded-1"
            type="password"
            {...register("password", {
              required: "You must enter your password",
              minLength: {
                value: 6,
                message: "password must be 3 Characters at least",
              },
              maxLength: {
                value: 10,
                message: "password must be 10 Characters at most",
              },
            })}
          />
          {errors.password && (
            <p className="text-danger mt-2  bg-white rounded-1 px-2 fs-4 py-2">{errors.password.message}</p>
          )}
        </div>
        <div>
          <div className="form-check">
            <input
              className="form-check-input fs-5"
              type="checkbox"
              value=""
              id="flexCheckDefault"
              {...register("rememberme")}
            />
            <label
              className="check-label text-white fs-4"
              htmlFor="flexCheckDefault"
            >
              Remmeber me
            </label>
          </div>
        </div>
        <div className="mt-3">
          <span className="text-white fs-5">Don't have an account? </span>
          <Link to="/register" className="text-white fs-5 signLink">
            Sign Up
          </Link>
        </div>
        <div className="mt-5 text-center">
          {isSubmitting ? (
            <button type="submit" className="btn-submit disabled rounded-1">
              <span className="spinner-grow spinner-spinner-grow-sm"></span>
            </button>
          ) : (
            <div>
              <button
                type="submit"
                className="btn-submit rounded-1 px-5 w-100 fs-3"
              >
                Sing In
              </button>
              <div className="justify-content-center align-items-center d-flex my-5">
                <span className="text-white w-100 hLine bg-secondary opacity-50"></span>

                <span className="px-3 text-secondary fs-4 opacity-75">or</span>
                <span className="text-white w-100 hLine bg-secondary opacity-50"></span>
              </div>
              <AuthGoogle />
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
