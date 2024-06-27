import React, { useEffect, useRef, useState } from "react";
import { getUserById, updateUser } from "../../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../../../components/admin/UserForm/UserForm";
import "./userEdit.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/slices/userSlice";
import { Helmet } from "react-helmet";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineError } from "react-icons/md";

export default function UserEdit() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null);
  const [failMessage, setFailMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const idUser = useSelector((state) => state.user.user.id);
  const username = useSelector((state) => state.user.user.username);
  const clearSwitch = useRef(null);
  const dispatch = useDispatch();
  const id = params.id;

  useEffect(() => {
    const timeOut = setTimeout(fetchUser, 20);
    return () => clearTimeout(timeOut);
  }, []);

  useEffect(() => {
    return () => clearTimeout(clearSwitch.current);
  }, []);

  async function fetchUser() {
    setIsLoading(true);
    const result = await getUserById(params.id);
    if (result.success) {
      setError(false);
      setUser(result.body);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  }

  async function submitHandler(data) {
    const { firstname, lastname, password, role } = data;
    setFailMessage("");
    setSuccessMessage("");

    const result = await updateUser(id, firstname, lastname, password, role);
    if (result.success) {
      setFailMessage(false);
      setSuccessMessage("The user updated successfully");
      if (+params.id === idUser) {
        const newUser = {
          isLoggedIn: true,
          isAdmin: data.role == "admin",
          Username: username,
          firstname: data.firstname,
          lastname: data.lastname,
          role: data.role,
        };
        dispatch(userActions.setUser(newUser));
      }
      clearSwitch.current = setTimeout(() => {
        navigate("/admin/users");
      }, 4000);
    } else {
      setFailMessage(result.message);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className="px-2 px-md-4 py-5 userEdit">
      {isLoading ? (
        <div className="fs-2 w-75 text-center loadingUsers">
          <p>Loading ...</p>
          <p className=" spinner spinner-grow"></p>
        </div>
      ) : error ? (
        <div className="text-center loadingUsers w-75 ">
          <p className="fs-1">{error}</p>
          <button className="btn-tryAgain fs-3" onClick={() => fetchUser()}>
            Try Again
          </button>
        </div>
      ) : (
        <div>
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
          <Helmet>
            <title>Edit User</title>
          </Helmet>
          <h1>Edit User</h1>
          <UserForm type="edit" onSubmit={submitHandler} user={user} />
        </div>
      )}
    </div>
  );
}
