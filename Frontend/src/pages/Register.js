import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import _axios from "../api/_axios";

function Register() {
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    type: "Job Seeker",
    username: "",
    email: "",
    password: "",
    firstname:"",
    lastname:"",
    bio:"",
    country: "",
    birthdate: "",
    company: "",
    title: "",
    profileImage:"",
    mailing:false,
    subscribed: [],
    experience: [],
    education: [],
  });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await _axios.post("auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden bg-gray-800">
      <div className="bg-image w-full h-full"></div>
      {/* <div className="justify-center text-center flex"><img className="w-72 h-72" src={logo}/></div> */}
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl flex flex-col items-center">
        <h1 className="text-3xl font-semibold text-center uppercase text-blue-950">
          Register
        </h1>
        <form className="mt-6 w-2/3" onSubmit={submit}>
          <div className="mb-2 w-full">
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-800"
            >
              Type
            </label>
            <select
              required // use a <select> element instead of <input> for gender
              name="type"
              className="w-full px-4 py-2 mt-2 text-blue-950 bg-white border rounded-md focus:border-blue-950 focus:ring-blue-950 focus:outline-none focus:ring focus:ring-opacity-40"
              onChange={handleChange}
            >
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          <div className="mb-2 w-full">
            <label
              for="username"
              className="block text-sm font-semibold text-blue-950"
            >
              Username
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 mt-2 text-blue-950 bg-white border rounded-md focus:border-blue-950 focus:ring-blue-950 focus:outline-none focus:ring focus:ring-opacity-40"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 w-full">
            <label
              for="email"
              className="block text-sm font-semibold text-blue-950"
            >
              Email
            </label>
            <input
              required
              type="text"
              className="w-full px-4 py-2 mt-2 text-blue-950 bg-white border rounded-md focus:border-blue-950 focus:ring-blue-950 focus:outline-none focus:ring focus:ring-opacity-40"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-2 w-full">
            <label
              for="password"
              className="block text-sm font-semibold text-blue-950"
            >
              Password
            </label>
            <input
              required
              type="password"
              className="w-full px-4 py-2 mt-2 text-blue-950 bg-white border rounded-md focus:border-blue-950 focus:ring-blue-950 focus:outline-none focus:ring focus:ring-opacity-40"
              name="password"
              onChange={handleChange}
            />
          </div>
          {err && <p>{err}</p>}
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide bg-blue-950 text-white transition-colors duration-200 transform submit-btn rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-300">
              Register
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-medium hover:underline text-blue-950"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
