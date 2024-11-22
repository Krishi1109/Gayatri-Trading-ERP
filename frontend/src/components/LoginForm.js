import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../apis/users";
import { useFormik} from "formik";
import * as Yup from "yup";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {loginApiStatus} = useSelector((state) => state.auth)

  const { values, handleSubmit, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required("username is required."),
      password: Yup.string().required("password is required."),
    }),
    onSubmit: (values) => {
      dispatch(userLogin(values));
      navigate('/dashboard')
    }
  })

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
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username ? <span style={{ color: "red" }}>{errors.username}</span> : <></>}
          </div>
          <div className="mb-6">
            <label
              className="block text-left text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? <span style={{ color: "red" }}>{errors.password}</span> : <></>}
          </div>
          <div className="flex items-center justify-between">
          <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleSubmit()}
              disabled={loginApiStatus === 'pending'} // Disable the button when the API call is pending
            >
              {loginApiStatus === 'pending' ? "Signing in..." : "Sign In"} 
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
