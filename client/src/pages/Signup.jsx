import React from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="text-3xl text-center font-semibold my-7">Signup</div>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Username"
          id="username"
        />
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Email"
          id="email"
        />
        <input
          type="text"
          className="bg-slate-100 p-3 rounded-lg"
          placeholder="Password"
          id="password"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Sign up
        </button>
      </form>
      <div className="flex gap-2 mt-3">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-red-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
