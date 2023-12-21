//import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Login({ setToken }) {

  const [err,setError] = useState(null);
  const navigate = useNavigate();
  
  const {login} = useContext(AuthContext);


    const [inputs, setInputs] = useState({
      username: "",
      password: "",
    });
  
    
  
    const submit = async (e) => {
      e.preventDefault();
      try {
       await login(inputs);
        navigate("/");
      } catch (err) {
        setError(err.response.data);
      }
    };
  
    const handleChange = (e) => {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-gray-800">
    <div className="bg-image w-full h-full"></div>
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl flex flex-col items-center">
      <h1
        className="text-3xl font-semibold text-center uppercase text-blue-950"
      >
        Sign in
      </h1>
      <form className="mt-6 w-2/3" onSubmit={submit}>
        <div className="mb-2 w-full">
          <label
            for="username"
            className="block text-sm font-semibold text-center text-gray-800"
          >
            Username
          </label>
          <input
            required name="username" type="text"
            className="w-full px-4 py-2 mt-2 text-blue-950 bg-white border rounded-md focus:border-blue-950 focus:ring-blue-950 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>
        <div className="mb-2 w-full">
          <label
            for="password"
            className="block text-sm font-semibold text-center text-gray-800"
          >
            Password
          </label>
          <input
            required name="password" type="password"
            className="w-full px-4 py-2 mt-2 text-blue-950 bg-white border rounded-md focus:border-blue-950 focus:ring-blue-950 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>
        {err && <p className="text-red-600">{err}</p>}
        <div className="mt-6">
          <button className="w-full px-4 py-2 tracking-wide bg-blue-950 text-white transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-300 submit-btn">
            Login
          </button>
        </div>
      </form>
  
      <p className="mt-8 text-xs font-light text-center text-gray-700">
        {" "}
        Don't have an account?{" "}
        <Link to={"/register"} className="font-medium hover:underline">
          <span className="text-blue-950"> Register</span>
        </Link>
      </p>
    </div>
  </div>
  
  );
}

export default Login;
