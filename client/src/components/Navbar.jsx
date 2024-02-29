/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
function Navbar() {
      const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userData');
    if (storedUserDetails) {
      const parsedUserDetails = JSON.parse(storedUserDetails);
      setUserDetails(parsedUserDetails);
    }

    // Add event listener for storage change
    const handleStorageChange = (event) => {
      if (event.key === 'userData') {
        const updatedUserDetails = JSON.parse(event.newValue);
        setUserDetails(updatedUserDetails);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate("/signin");
  };

  return (
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


              {
                userDetails ?
                <>
                <button
                onClick={handleLogout}
                to="/signup"
                className="px-2 sm:px-4 py-2 block font-bold text-white login-button"
              >
                Log out
              </button>
                </>
                :
                <Link
                to="/signup"
                className="px-2 sm:px-4 py-2 block font-bold text-white login-button"
              >
                Sign Up
              </Link>
              }

              
            </ul>
          </nav>
        </div>
      </header>
  )
}

export default Navbar