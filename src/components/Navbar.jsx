import React, { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "@/constants";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsopen] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      setIsAuthorized(true);
    }
  }, []);

  const toggleMenu = () => {
    setIsopen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50 w-full">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center px-6">
        <Link to={'/'}>
          <img src="/images/travel.svg" alt="Logo" className="w-16 h-16" />
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* desktop view */}
        <ul className={` gap-8 md:flex hidden `}>
          {isAuthorized ? (
            <>
              <Link
                to={"/dashboard"}
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/write"
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Write Post
              </Link>
              <Link
                to={"/logout"}
                className="text-sm font-semibold text-red-500 cursor-pointer transition duration-300"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/register"}
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Login
              </Link>
            </>
          )}
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 mt-8">
          <ul className="flex flex-col gap-4 text-center">
          {isAuthorized ? (
            <>
              <Link
                to={"/dashboard"}
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/write"
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Write Post
              </Link>
              <Link
                to={"/logout"}
                className="text-sm font-semibold text-red-500 cursor-pointer transition duration-300"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to={"/register"}
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Sign Up
              </Link>
              <Link
                to={"/login"}
                className="text-sm font-semibold hover:text-blue-500 cursor-pointer transition duration-300"
              >
                Login
              </Link>
            </>
          )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
