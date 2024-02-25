import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <header className="bg-transparent py-1">
        <div className="container mx-auto pt-4 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center z-50">
          <Link
            to="/"
            className="flex items-center space-x-3 mb-4 sm:mb-0 select-none"
          >
            <span className="hidden sm:inline text-white font-bold text-2xl select-none">
              BookMyFlight
            </span>
          </Link>
          <nav className="flex items-center font-Hublot">
            <ul className="flex space-x-2 sm:space-x-4 text-gray-300 font-bold select-none">
              <li>
                <Link
                  to="/"
                  className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Search"
                  className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300"
                >
                  Search
                </Link>
              </li>
              <li>
                <Link
                  to="/About"
                  className="px-2 sm:px-4 py-2 block font-bold text-white transition duration-150 ease-in-out hover:text-gray-300"
                >
                  About
                </Link>
              </li>

              <Link
                to="/signup"
                className="px-2 sm:px-4 py-2 block font-bold text-white login-button"
              >
                Sign Up
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
