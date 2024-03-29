import "../App.css";
import GlobeComponent from "../components/GlobeComponent";
import { Link } from "react-router-dom";
import { IoSparklesSharp } from "react-icons/io5";
import TypingAnimation from "../components/TypingAnimation";

function Home() {
  return (
    <>
      <main className="bg-thegray home-no-scroll ">
        <div className="min-h-screen flex items-center justify-center relative ">
          {/*Background behind other elemetns */}
          <div className="absolute top-[24rem]  w-[45rem] h-[45rem] bg-blue-300 rounded-full filter blur-5xl opacity-50 animate-blob animation-delay-1"></div>
          <div className="absolute top-[24rem]  w-[30rem] h-[30rem] bg-blue-400 rounded-full filter blur-5xl opacity-30 animate-blob animation-delay-1"></div>

          <div className="relative">
            {/* Globe behind other elements*/}
            <div className="absolute flex justify-center globe-position pt-10 fade-in3">
              <GlobeComponent />
            </div>
            <div className="relative z-10 pt-0 pb-20">
              {/* Other elements */}

              {/*Main content / Hero section */}
              <div className="HomeContainer ">
                <h1 className="hidden md:block text-center pb-1 lg:pl-6 pointer-events-none select-none customFont text-7xl text-gray-100 leading-[1.1] max-w-[55rem] fade-in1">
                Book your flight tickets today <span className="pl-0">and embark on a journey</span> to <TypingAnimation />
                </h1>

                <h1 className="md:hidden text-center pb-4 lg:pl-6 pointer-events-none select-none px-4 customFont text-5xl text-gray-100 leading-[1.1] max-w-[53rem ]">
                Book your flight tickets today 
                </h1>

                {/* Display on larger screens */}
                <div className=" pb-4 select-none text-center font-Hublot text-gray-300 text-xl max-w-[33rem] leading-20 pt-4 fade-in2">
                Unlock the door to boundless possibilities – Secure your ticket, and let the journey unfold with anticipation and excitement!
                 
                </div>

                <Link to="/signup" className="get-started-button font-mono select-none fade-in3">
                  <IoSparklesSharp className="inline align-text-top" /> Get Started
                </Link>
              </div>
            </div>
          </div>


        </div>
      </main>
    </>
  );
}
export default Home;
