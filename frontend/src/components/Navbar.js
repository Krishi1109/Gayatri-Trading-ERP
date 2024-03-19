import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { isAuth } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-10">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Gayatri Trading
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={handleLogout}
            type="button"
            className="text-white hover:text-cyan-300 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:text-gray-300"
          >
            {isAuth ? "Logout" : "Welcome"}
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`w-5 h-5 transition-transform transform ${
                isMenuOpen ? "rotate-90" : "rotate-0"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${
            isMenuOpen ? "" : "hidden"
          }`}
          id="navbar-cta"
        >
          {!isAuth ? (
            <>Effortless account management at your fingertips.</>
          ) : (
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-900 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/dashboard"
                  className="block py-2 px-3 md:p-0 text-cyan-300 rounded md:bg-transparent md:text-cyan-300 md:dark:text-blue-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/purchase"
                  className="block py-2 px-3 md:p-0 text-cyan-300 rounded md:bg-transparent md:text-cyan-300 md:dark:text-blue-500"
                >
                  Purchase
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
