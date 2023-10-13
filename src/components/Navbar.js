import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div>
    <div className="h-14 sticky top-0 z-50 w-full nav flex text-white bg-blue-700 items-center justify-between navbar">
      <div className="w-full flex gap-8 items-center overflow-hidden">
        <Link to={"/"} className="p-4 cursor-pointer navelement">
          Logo
        </Link>
        <div className="w-full flex gap-8 items-center overflow-hidden justify-center">
          <Link to={"/"} className="p-2 cursor-pointer navelement">
            Home
          </Link>
          <Link to={"/profile"} className="p-2 cursor-pointer navelement">
            Profile
          </Link>
          <Link to={"/feed"} className="p-2 cursor-pointer navelement">
            Feed
          </Link>
      
        </div>
      </div>

    </div> 
   
    </div>
  );
};

export default Navbar;
