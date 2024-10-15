import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../Components/OAuth";

export default function Signup() {
  // creating a function to track changes in form
  const [formData, setformData] = useState({}); // initially an empty object
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  // creating function to submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // with fetch there is error handling in trycatch but in axios it works well
    try {
      setloading(true);
      seterror(false);
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setloading(false);
      if (data.success === false) {
        seterror(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setloading(false);
      seterror(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Signup</div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-red-700">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700">{error && "Something went wrong!..."}</p>
    </div>
  );
}
