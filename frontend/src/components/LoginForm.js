import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {loginApistatus} = useSelector((state) => state.auth)

  console.log("loginApistatus => ", loginApistatus)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(userLogin({ username, password }));
    navigate('/dashboard')
  };

  return (
    <>
      <p className="py-5 text-xl font-semibold">Login to access your account</p>
      <div className="flex justify-center items-center">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 dark:bg-gray-800 dark:text-white">
          <div className="mb-4">
            <label
              className="block text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
          <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
              disabled={loginApistatus === 'pending'} // Disable the button when the API call is pending
            >
              {loginApistatus === 'pending' ? "Signing in..." : "Sign In"} 
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
