/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Cobe from "../components/AutoGlobe";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
import { FaPlaneDeparture } from "react-icons/fa";
import Autosuggest from "react-autosuggest";
import { getRequestJson } from "../api/api";
import { useNavigate } from "react-router-dom";

function Search() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const [childCount, setChildCount] = useState(0);
  const [token, setToken] = useState("");
  const [flightsData, setFlightsData] = useState("");

  useEffect(() => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
          return cookie.substring(name.length + 1);
        }
      }
      return null;
    };
    const jwtToken = getCookie("jwt_auth_token");
    if (jwtToken) {
      setToken(jwtToken);
    } else {
      console.log("JWT Token not found in cookies");
    }
  }, []);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrementChild = () => {
    setChildCount(childCount + 1);
  };

  const handleDecrementChild = () => {
    if (childCount > 0) {
      setChildCount(childCount - 1);
    }
  };

  const [searchData, setSearchData] = useState({
    origin: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    passengers: count + childCount,
    directFlights: false,
    flightClass: "Economy",
    tripType: "oneWay",
    childAge: 0,
  });

  const [activeModal, setActiveModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDate = searchData.departureDate;
    const formData = {
      departure_city: searchData.origin,
      destination_city: searchData.destination,
      departure_time: `${newDate}T00:00:00.000Z`,
    };
    console.log("Search submitted:", formData);

    getRequestJson(`/api/flights`, formData)
      .then((data) => {
        console.log("API response:", data);
        setFlightsData(data.data);
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

  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Dummy array of city suggestions
    const dummyCities = [
      { name: "New York", country: "USA" },
      { name: "London", country: "UK" },
      { name: "Paris", country: "France" },
      // Add more dummy cities as needed
    ];

    setSuggestions(dummyCities);
  }, [searchData.origin]);

  const fetchCities = async (inputValue) => {
    // Simulating an API call delay
    setTimeout(() => {
      setSuggestions([
        { name: "New York", country: "USA" },
        { name: "London", country: "UK" },
        { name: "Paris", country: "France" },
        // Add more dummy cities as needed
      ]);
    }, 300);
  };

  const handleChangee = (e, { newValue, method }) => {
    setSearchData({
      ...searchData,
      origin: newValue,
    });
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    // Fetch suggestions when the input value changes
    fetchCities(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div className="py-2 px-2  border-b-[0.8px]  border-gray-400 cursor-pointer hover:bg-gray-300 rounded-sm flex flex-row items-center gap-2">
      <FaPlaneDeparture />
      {suggestion.name}, {suggestion.country}
    </div>
  );

  const renderSuggestionsContainer = ({ containerProps, children }) => (
    <div
      {...containerProps}
      className="absolute bg-gray-200 text-black rounded-sm  z-10  w-[14.5rem] mt-1 "
    >
      {children}
    </div>
  );

  const calculateTimeDifference = (departureTime, arrivalTime) => {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);

    // Calculate the time difference in milliseconds
    const timeDifference = arrivalDate - departureDate;

    // Convert milliseconds to minutes
    const totalMinutesDifference = Math.floor(timeDifference / (1000 * 60));

    // Calculate hours and remaining minutes
    const hours = Math.floor(totalMinutesDifference / 60);
    const minutes = totalMinutesDifference % 60;

    return { hours, minutes };
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
            <h1 className="font-Mona select-none font-bold text-white text-5xl leading-20 pb-2 fade-in1">
              Flight Search
            </h1>
            <div className="flex select-none">
              <p className="font-Hublot select-none text-gray-300 mr-4 max-w-[28rem] leading-[1.7rem] fade-in2">
                Start by entering the location you want to rank developers from.
                Keep in mind, the results reflect the location users have
                entered themselves and are not entirely definitve.
              </p>
            </div>
          </div>

          <div className="">
            <form
              className="bg-gray-900 bg-opacity-30 text-white p-8 rounded-lg w-full flex flex-col form-shadow"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-row items-center gap-4">
                <div className="mb-4 flex items-center">
                  <input
                    type="radio"
                    id="oneWay"
                    name="tripType"
                    value="oneWay"
                    checked={searchData.tripType === "oneWay"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="oneWay" className="text-white">
                    One way
                  </label>
                </div>

                <div className="mb-4 flex items-center">
                  <input
                    type="radio"
                    id="return"
                    name="tripType"
                    value="return"
                    checked={searchData.tripType === "return"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="return" className="text-white">
                    Return
                  </label>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <div className="mb-4">
                  <label htmlFor="origin" className="text-white block mb-1">
                    From
                  </label>
                  <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    renderSuggestionsContainer={renderSuggestionsContainer}
                    inputProps={{
                      id: "origin",
                      name: "origin",
                      value: searchData.origin,
                      onChange: handleChangee,
                      className:
                        "w-full px-3 py-2 rounded bg-gray-200 text-black",
                      required: true,
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="destination" className=" block mb-1">
                    To
                  </label>
                  <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={searchData.destination}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-gray-200 text-black"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="departureDate" className=" block mb-1">
                    Departure Date
                  </label>
                  <input
                    type="date"
                    id="departureDate"
                    name="departureDate"
                    value={searchData.departureDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded bg-gray-200 text-black "
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="returnDate" className=" block mb-1">
                    {searchData.tripType === "oneWay"
                      ? "One way"
                      : "Return Date"}
                  </label>
                  <input
                    disabled={searchData.tripType === "oneWay" ? true : false}
                    type="date"
                    id="returnDate"
                    name="returnDate"
                    value={searchData.returnDate}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 rounded bg-gray-200 text-black ${
                      searchData.tripType === "oneWay" ? "bg-gray-500" : ""
                    }`}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="passengers" className=" block mb-1">
                    Travellers and cabin class
                  </label>
                  <div
                    onClick={() => {
                      if (activeModal === false) {
                        setActiveModal(true);
                      } else {
                        setActiveModal(false);
                      }
                    }}
                    className="bg-gray-200 cursor-pointer relative text-black px-3 py-2 rounded flex flex-row items-center justify-between gap-4"
                  >
                    <span>
                      {count + childCount} travellers, {searchData.flightClass}{" "}
                    </span>
                    {activeModal ? (
                      <TiArrowSortedUp size={25} />
                    ) : (
                      <TiArrowSortedDown size={25} />
                    )}
                  </div>
                  {activeModal ? (
                    <>
                      <div className="bg-gray-200 text-black mt-1 absolute w-[25rem] left-[68%] rounded-sm p-4">
                        <p>Cabin class</p>
                        <select
                          id="flightClass"
                          name="flightClass"
                          value={searchData.flightClass}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded border-[0.8px] border-gray-500 bg-gray-200 text-black my-2"
                          required
                        >
                          <option value="Economy">Economy</option>
                          <option value="Premium Economy">
                            Premium Economy
                          </option>
                          <option value="Business">Business Class</option>
                          <option value="FirstClass">First Class</option>
                        </select>

                        <p>Adults</p>

                        <div className="flex items-center ">
                          <div
                            className="bg-gray-400 cursor-pointer text-black px-4 py-2 rounded-md"
                            onClick={handleDecrement}
                          >
                            -
                          </div>
                          <span className="bg-gray-200 text-black px-4 py-2">
                            {count}
                          </span>
                          <div
                            className="bg-gray-400 cursor-pointer text-black px-4 py-2 rounded-md"
                            onClick={handleIncrement}
                          >
                            +
                          </div>

                          <p className="ml-4">16+ years</p>
                        </div>

                        <p className="mt-2">Children</p>

                        <div className="flex items-center ">
                          <button
                            className="bg-gray-400 text-black px-4 py-2 rounded-md"
                            onClick={handleDecrementChild}
                          >
                            -
                          </button>
                          <span className="bg-gray-200 text-black px-4 py-2">
                            {childCount}
                          </span>
                          <button
                            className="bg-gray-400 text-black px-4 py-2 rounded-md"
                            onClick={handleIncrementChild}
                          >
                            +
                          </button>

                          <p className="ml-4">0-15 years</p>
                        </div>

                        <p className="mt-2">Age of child 1</p>

                        <select
                          id="childAge"
                          name="ChildAge"
                          value={searchData.childAge}
                          onChange={handleChange}
                          className="w-full px-3 py-2 rounded border-[0.8px] border-gray-500 bg-gray-200 text-black my-2"
                          required
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                        </select>

                        <p className="text-[12px] italic">
                          Your age at time of travel must be valid for the age
                          category booked. Airlines have restrictions on under
                          18s travelling alone.
                        </p>

                        <p className="text-[12px] italic mt-2">
                          Age limits and policies for travelling with children
                          may vary so please check with the airline before
                          booking.
                        </p>

                        <button
                          onClick={() => {
                            setActiveModal(false);
                          }}
                          className="border-2 border-gray-400 px-6 rounded-md shadow-lg mt-4 opacity-70 hover:opacity-100  py-1 "
                        >
                          Done
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="agreeTerms"
                    checked={searchData.agreeTerms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="agreeTerms" className="text-white">
                    Direct flights only
                  </label>
                </div>

                <button
                  type="submit"
                  className=" bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 focus:outline-none"
                >
                  Search Flights
                </button>
              </div>
            </form>
          </div>

          <div className="mt-10">
            <h1 className="text-2xl font-black text-white mb-5 ">
              Your Search Results:
            </h1>

            {flightsData ? (
              <>
                {flightsData.map((flight, index) => (
                  <div
                    key={index}
                    onClick={()=>{navigate(`/flight/${flight.id}`);}}
                    className="bg-gray-900 bg-opacity-30 text-white p-8 rounded-lg w-full flex flex-col flight-shadow my-10"
                  >
                    <div className="flex flex-col  gap-4">
                      <div className=" flex flex-row items-center justify-between">
                        <div>
                          <input
                            type="radio"
                            id={`flight-${index}`}
                            name="selectedFlight"
                            value={index}
                            checked={searchData.selectedFlight === index}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`flight-${index}`}
                            className="text-white"
                          >
                            {flight.airline}
                          </label>
                        </div>

                        <div className=" flex items-center">
                          <label
                            htmlFor={`flight-${index}`}
                            className="text-white"
                          >
                            100% on time
                          </label>
                        </div>
                      </div>

                      <div className="flex flex-row items-center justify-between gap-28">
                        <div className="mb-4">
                          <div className="text-white block mb-1">
                            <p className="font-bold text-2xl">
                              {new Date(
                                flight.departure_time
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>

                            <p className="text-sm">{flight.departure_city}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="mb-1 flex flex-col items-center justify-center">
                            <p className="font-bold">
                              {
                                calculateTimeDifference(
                                  flight.departure_time,
                                  flight.arrival_time
                                ).hours
                              }{" "}
                              h{" "}
                              {
                                calculateTimeDifference(
                                  flight.departure_time,
                                  flight.arrival_time
                                ).minutes
                              }{" "}
                              m
                            </p>

                            <p>Non stop</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className=" block mb-1">
                            <p className="font-bold text-2xl">
                              {new Date(flight.arrival_time).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </p>

                            <p className="text-sm">{flight.destination_city}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor={`passengers-${index}`}
                            className=" block mb-1"
                          >
                            <p className="font-bold text-2xl">
                              {flight.base_price}
                            </p>
                            <p className="text-sm">per adult</p>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="text-white">No search results yet</p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Search;
