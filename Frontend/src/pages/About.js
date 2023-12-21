import React, { useContext, useState } from "react";
import bigLogo from "../assets/SmartJobsLogo.png";
function About() {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden bg-gray-800">
      <img src={bigLogo} className="h-80 w-auto" />

      <div className="relative inline-block group mb-5">
        <img
          className="h-40 w-40 rounded-full transform transition-transform duration-300 group-hover:scale-110"
          src="https://drscdn.500px.org/photo/312536271/m%3D900/v2?sig=ea80d4bec2d080930da0f5c605568b4eebbd8da0ed8acb1215590c2c5960c302"
          alt=""
        />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Visit my website
        </div>
      </div>


      <div className="w-full p-3 mb-5 m-auto bg-white rounded-md shadow-xl lg:max-w-xl flex flex-col items-center"> This Web App was Built using ReactJS, NodeJS and MongoDB. A project for SWE 599
      <br/> <a className="font-semibold border hover:shadow-xl solid p-2 rounded-xl" href="https://github.com/Omar4GH/SWE-599-SmartJobs">Repo for this Project here</a>
      <br/> 03-January-2024
        <a
          
          className="font-semibold border p-2 cursor-not-allowed rounded-xl hover:shadow-xl disabled:opacity-50 disabled:pointer-events-none"
          disabled
        >
          Download Report
        </a>
      </div>

      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl flex flex-col items-center">
        {" "}
        <span className="text-black text-sm">
          {"  "}
          SmartJobs, Built by{" "}
          <a
            className="font-bold text-orange-300"
            href="https://omarghamrawi.net/"
            target="_blank"
          >
            Omar Ghamrawi
          </a>{" "}
          , a project for SWE-599 , MSc.Software Engineering Boğaziçi University
          2023 <br />
          Using ReactJs and NodeJs
        </span>
      </div>
    </div>
  );
}

export default About;
