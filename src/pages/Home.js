import React, { useContext } from "react";
import heroBg from "../assets/HeroVectorF.png";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.jpg"

const Home = () => {
  const { currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const redirect = (path) => {
    navigate(path);
  };

  return (
    <section className="w-full lg:h-screen md:h-[550px] h-[830px] relative overflow-x-hidden flex justify-end">
      <img
        className="h-[100%] w-[100%] lg:h-[100%] md:h-[100%] lg:w-full md:w-[100%]"
        src={heroBg}
        alt="Hero Background Vector"
      />
      <main className="w-full lg:h-full h-auto grid md:grid-cols-2 absolute top-0 left-0 lg:px-24 md:px-8 px-5 pt-24 md:pt-32 lg:pt-0">
        {currentUser ? (
          <>
            {currentUser.type === "Employer" ? (
              <>
                {" "}
                <div className="flex flex-col justify-center md:gap-6 gap-3 md:order-1 order-2">
                  <p
                    as="p"
                    className="text-color1 uppercase tracking-widest lg:text-base  text-sm font-normal"
                  >
                    Welcome to SmartJobs,
                  </p>
                  <p
                    as="h1"
                    className=" text-color3 lg:text-7xl md:text-5xl text-3xl flex font-medium"
                  >
                    {currentUser.username}{" "}
                    <img
                      className="h-24 w-24 ml-2 rounded-full"
                      src={
                        currentUser.profileImage ||
                        defaultAvatar
                      }
                      alt=""
                    />
                  </p>
                  <p
                    as="p"
                    className="text-color3 md:text-base text-sm text-justify font-light"
                  >
                    Post a Job or Browse Jobs
                  </p>
                  <div className="w-full flex md:justify-start justify-between items-center lg:gap-12 md:gap-6 gap-0">
                    <button
                      onClick={() => redirect("/postjob")}
                      class="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 text-white font-bold py-4 px-8 rounded-md shadow-md transition-transform"
                    >
                      <span>Post Jobs</span>
                    </button>
                    <div className="flex items-center lg:gap-6 gap-3 cursor-pointer">
                      <p as="span" className="relative flex h-14 w-14">
                        <button
                          onClick={() => redirect("/feed")}
                          class="flex items-center bg-gradient-to-r from-blue-950 to-blue-500 hover:scale-105 text-white font-bold py-4 px-8 rounded-md shadow-md transition-transform"
                        >
                          <span>Browse Jobs</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="flex flex-col justify-center md:gap-6 gap-3 md:order-1 order-2">
                  <p
                    as="p"
                    className="text-color1 uppercase tracking-widest lg:text-base  text-sm font-normal"
                  >
                    Welcome to SmartJobs,
                  </p>
                  <p
                    as="h1"
                    className=" text-color3 lg:text-7xl md:text-5xl flex text-3xl font-medium"
                  >
                    {currentUser.username}
                    <img
                      className="h-24 w-24 ml-2 rounded-full"
                      src={
                        currentUser.profileImage ||
                        defaultAvatar
                      }
                      alt=""
                    />
                  </p>
                  <p
                    as="p"
                    className="text-color3 md:text-base text-sm text-justify font-light"
                  >
                    Start Browsing for Jobs
                  </p>
                  <div className="w-full flex md:justify-start justify-between items-center lg:gap-12 md:gap-6 gap-0">
                    <button
                      onClick={() => redirect("/feed")}
                      class="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 text-white font-bold py-4 px-8 rounded-md shadow-md transition-transform"
                    >
                      <span>Browse Jobs</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="flex flex-col justify-center md:gap-6 gap-3 md:order-1 order-2">
              <p
                as="p"
                className="text-color1 uppercase tracking-widest lg:text-base  text-sm font-normal"
              >
                Welcome to
              </p>
              <p
                as="h1"
                className=" text-color3 lg:text-7xl md:text-5xl text-3xl font-medium"
              >
                SmartJobs
              </p>
              <p
                as="p"
                className="text-color3 md:text-base text-sm text-justify font-light"
              >
                Join Us Today or Browse Jobs
              </p>
              <div className="w-full flex md:justify-start justify-between items-center lg:gap-12 md:gap-6 gap-0">
                <button
                  onClick={() => redirect("/register")}
                  class="flex items-center bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-105 text-white font-bold py-4 px-8 rounded-md shadow-md transition-transform"
                >
                  <span>Join Now</span>
                </button>
                <div className="flex items-center lg:gap-6 gap-3 cursor-pointer">
                  <p as="span" className="relative flex h-14 w-14">
                    <button
                      onClick={() => redirect("/feed")}
                      class="flex items-center bg-gradient-to-r from-blue-950 to-blue-500 hover:scale-105 text-white font-bold py-4 px-8 rounded-md shadow-md transition-transform"
                    >
                      <span>Browse Jobs</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </section>
  );
};
export default Home;
