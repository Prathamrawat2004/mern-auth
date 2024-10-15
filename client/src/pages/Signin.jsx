import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Signin() {
  // creating a function to track changes in form
  const [formData, setformData] = useState({}); // initially an empty object
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  // creating function to submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // with fetch there is error handling in trycatch but in axios it works well
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
          onChange={handleChange}
        />
        <input
          type="password"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
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
