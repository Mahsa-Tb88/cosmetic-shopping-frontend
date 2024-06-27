import React from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../../../firebase.js";
import "./authGoogle.css";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { authWithGoogle } from "../../../utils/api.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../../store/slices/userSlice.js";
export default function AuthGoogle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function GoogleHandler() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const result2 = await authWithGoogle({
      username: result.user.email,
      fullName: result.user.displayName,
    });
    if (result2.success) {
      const { user, token } = result2.body;
      dispatch(
        userActions.setUser({
          isLoggedIn: true,
          isAdmin: false,
          username: user.username,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        })
      );
      localStorage.token = token;
      navigate("/panel");
    }
  }
  return (
    <div>
      <button
        className=" bg-white btn btn-lg w-100 py-3 fs-4 btnGoogle border-1"
        onClick={() => GoogleHandler()}
        type="button"
      >
        <FcGoogle className="fs-2 me-2" />
        <span className="">Continue With Google</span>
      </button>
    </div>
  );
}
