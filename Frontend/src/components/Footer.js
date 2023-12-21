import React from "react";
const Footer = () => {
  return (
    <footer>
      <div className="flex p-5 flex-col items-center font-medium justify-center  bg-gray-800">
        <div>
          <span className="text-white text-sm">
            {"  "}
           SmartJobs, Built by{" "}
            <a
              className="font-bold text-orange-300"
              href="https://omarghamrawi.net/"
              target="_blank"
            >
              Omar Ghamrawi
            </a>{" "}
            , a project for SWE-599 , MSc.Software Engineering Boğaziçi
            University 2023 <br />
            Using ReactJs and NodeJs
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
