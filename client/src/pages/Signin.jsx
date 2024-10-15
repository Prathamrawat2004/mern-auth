import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../Components/OAuth";

export default function Signin() {
  // Initialize formData with empty email and password fields
  const [formData, setformData] = useState({
    email: "",
    password: ""
  });
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure());
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Signin</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          id="email"
          value={formData.email} // Use value prop
          onChange={handleChange}
          autoComplete="off" // Disable browser autocomplete
        />
        <input
          type="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          id="password"
          value={formData.password} // Use value prop
          onChange={handleChange}
          autoComplete="off" // Disable browser autocomplete
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-red-700">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700">
        {error ? error.message || "Something went wrong!..." : ""}
      </p>
    </div>
  );
}
