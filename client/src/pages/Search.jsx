import React, { useState, useEffect } from "react";
import Cobe from "../components/AutoGlobe";
import { TiArrowSortedDown } from "react-icons/ti";
import { TiArrowSortedUp } from "react-icons/ti";
function Search({ isAuthenticated }) {
  const [searchData, setSearchData] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    agreeTerms: false,
    flightClass: 'Economy',
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
    // Add your flight search logic here
    console.log('Search submitted:', searchData);
  };
  return (
    <>
      <main className="bg-thegray relative">
        <div className="fixed w-full max-w-lg right-64">
          <div className="absolute top-16 -right-12 w-[40rem] h-[40rem] bg-blue-300 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>{" "}
          <div className="absolute top-64 right-20 w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-20 animate-blob animation-delay-1"></div>{" "}
        </div>

        <div className="hidden lg:block">
          <Cobe/>
        </div>
        <div className="flex flex-col items-start justify-center relative pb-0 px-4 md:px-8 lg:px-32">
          <div className="pt-6 pb-6">
            <h1 className="font-Mona select-none font-bold text-white text-5xl leading-20 pb-2 fade-in1">Flight Search</h1>
            <div className="flex select-none">
              <p className="font-Hublot select-none text-gray-300 mr-4 max-w-[28rem] leading-[1.7rem] fade-in2">
                Start by entering the location you want to rank developers from. Keep in mind, the results reflect the location users have entered themselves and are not entirely
                definitve.
              </p>
            </div>
          </div>



          <div className="">
      <form
        className="bg-gray-900 bg-opacity-30 text-white p-8 rounded-lg w-full flex flex-col form-shadow"
        onSubmit={handleSubmit}
      >

       <div className="flex flex-row items-center gap-2">
       <div className="mb-4">
          <label htmlFor="origin" className=" block mb-1">
            From
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={searchData.origin}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-200 text-black"
            required
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
            Return Date
          </label>
          <input
            type="date"
            id="returnDate"
            name="returnDate"
            value={searchData.returnDate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-200 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="passengers" className=" block mb-1">
          Travellers and cabin class
          </label>
          <button
          onClick={()=>{
            if(activeModal === false){
              setActiveModal(true);
            }else{
              setActiveModal(false);
            }
          }}
           className="bg-gray-200 relative text-black px-3 py-2 rounded flex flex-row items-center justify-between gap-4"><span>2 travellers, {searchData.flightClass} </span>
           {activeModal ? <TiArrowSortedUp size={25}/> : <TiArrowSortedDown size={25}/>}
           </button>
           {
            activeModal ?
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
  <option value="Premium Economy">Premium Economy</option>
  <option value="Business">Business Class</option>
  <option value="FirstClass">First Class</option>
</select>

<p>Adults</p>

</div>
            </>
            :
            null
           }
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
    


        </div>

      </main>
    </>
  );
}

export default Search;
