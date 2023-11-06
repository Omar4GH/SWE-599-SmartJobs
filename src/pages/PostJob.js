import React, { useContext, useEffect, useState } from "react";
import _axios from "../api/_axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import Input from "@mui/joy/Input";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@material-ui/core";

const PostJob = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [err, setError] = useState(null);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data); // Log the response data
        setCountries(data.data.map((country) => country.country));
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    position: "",
    tags: [], // Assuming tags are comma-separated
    active: true,
  });

  const jobData = {
    ...formData,
    postdate: new Date().toISOString(),
    likes: 0,
    ...(currentUser ? { uid: currentUser._id } : {}),
  };

  const handleCountryChange = (event, value) => {
    setSelectedCountry(value || "");
    setFormData({
      ...formData,
      location: value || "",
    });
    console.log(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // For the "tags" field, split the comma-separated values into an array
    if (name === "tags") {
      const tagsArray = value.split(" ").map((tag) => tag.trim());
      setFormData({
        ...formData,
        [name]: tagsArray,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log(formData);
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await _axios.post("/jobs/", jobData);
      navigate("/feed");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="flex justify-center bg-gray-100 items-center h-screen">
      {currentUser ? (
        <>
          <div className="w-4/5 justify-center bg-white p-8 items-center rounded-3xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Post a Job</h1>

            <form onSubmit={submit}>
              <div className="mb-4">
                <label htmlFor="jobTitle" className="block font-semibold mb-2">
                  Job Title
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter Job Title"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block font-semibold mb-2"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter Job Description"
                  rows="4"
                  className="w-1/2 p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="location" className="block font-semibold mb-2">
                  Location
                </label>
                <select
                  required // use a <select> element instead of <input> for gender
                  name="location"
                  className="block w-1/3 px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={handleInputChange}
                  id="location"
                >
                  <option value="">-- Select Country --</option>
                  {countries.map((countries) => (
                    <option key={countries} value={countries}>
                      {countries}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="jobPosition"
                  className="block font-semibold mb-2"
                >
                  Job Position
                </label>
                <Input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter Job Position"
                  className="w-1/6 p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.position}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="tags" className="block font-semibold mb-2">
                  Tags
                </label>
                <Input
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Enter Tags (comma-separated)"
                  className="w-1/5 p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex">
                <select
                  required
                  name="active" // Assign the name attribute here
                  className="block mx-5 px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-blue-700 focus:ring-blue-700 focus:outline-none focus:ring focus:ring-opacity-40"
                  onChange={handleInputChange}
                  id="active"
                  sx={{ width: 250 }}
                >
                  <option value={true}>Public</option>
                  <option value={false}>Private</option>
                </select>
                <button
                  type="submit"
                  className=" px-4 py-2  bg-blue-950 text-white transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-300"
                >
                  Submit Job
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div>
            {" "}
            <button className="w-full px-4 py-2 tracking-wide bg-blue-950 text-white transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-300 ">
              <a href="/login">Login or Register to Post a Job</a>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostJob;
