/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cobe from "../components/AutoGlobe";
import { postRequestJson } from "../api/api";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { toast } from "react-toastify";

function SignIn() {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your sign-up logic here
    // console.log("Form submitted:", formData);
    postRequestJson(`/api/signin`, formData)
      .then((data) => {
        console.log("API response:", data);
        const decoded = jwt(data.token);
        cookie.set("jwt_auth_token", data.token, {
          expires: new Date(decoded.exp * 1000),
          path: "/",
        });

        localStorage.setItem("userData", JSON.stringify(data.data));
        toast.success("Operation was successful!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate("/search");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error(
            "API error: User with this email or phone already exists"
          );
        } else {
          console.error("API error:", error);
        }
      });
  };

  return (
    <>
      <main className="bg-thegray relative">
        <div className="fixed w-full max-w-lg right-64">
          <div className="absolute top-16 -right-12 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>{" "}
          <div className="absolute top-64 right-20 w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>{" "}
        </div>

        <div className="hidden lg:block">
          <Cobe />
        </div>
        <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
          <div className="pt-6 pb-6">
            <div className="mt-10">
              <form
                className="bg-gray-500 bg-opacity-20 p-8 rounded-lg shadow-md w-96"
                onSubmit={handleSubmit}
              >
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Sign in
                </h2>
                <div className="mb-4">
                  <label htmlFor="email" className="text-white block mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="text-white block mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-gray-700 text-white"
                    required
                  />
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="agreeTerms" className="text-white">
                    I agree to the terms and conditions
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Sign in
                </button>

                <button className="group h-12 w-full mt-4 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-500 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      className="absolute left-0 w-5"
                      alt="google logo"
                    />
                    <span className="block w-max font-semibold tracking-wide text-white text-sm transition duration-300 group-hover:text-blue-500 sm:text-base">
                      Continue with Google
                    </span>
                  </div>
                </button>

                <div className="flex flex-row items-center justify-center gap-2 mt-4">
                  <span className="text-white">Don't have an account?</span>
                  <Link className="text-white hover:text-blue-500" to="/signup">
                    Sign up{" "}
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default SignIn;
