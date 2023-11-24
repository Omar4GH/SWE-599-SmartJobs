import React, { useContext, useEffect, useState } from "react";
import _axios from "../api/_axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@material-ui/core";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
    salary: "",
    active: true,
  });

  const jobData = {
    ...formData,
    postdate: new Date().toISOString(),
    likes: [],
    ...(currentUser ? { uid: currentUser._id } : {}),
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For the "tags" field, split the comma-separated values into an array
    if (name === "tags") {
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setFormData({
        ...formData,
        [name]: tagsArray,
      });
    } else if (name === "active") {
      setFormData({
        ...formData,
        [name]: value === "true", // Convert the selected value to a boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    console.log(formData);
  };
  const handleQuillChange = (value) => {
    setFormData({
      ...formData,
      description: value,
    });
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

  const colors = ["red", "green", "blue", "orange", "violet", "white", "black"];

  const toolbarOptions = [
    [{ font: ["serif", "monospace"] }, { size: ["small", "large", "huge"] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: colors }, { background: colors }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, false] }, "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }, { align: [] }],
    ["link", "video", "formula"],
  ];

  return (
    <div className="flex justify-center bg-gray-100 items-center h-full">
      {currentUser ? (
        <>
          <div className="w-4/5 justify-center my-11 bg-white p-8 items-center rounded-3xl shadow-lg">
            <h1 className="text-2xl font-bold mb-4 ">Post a Job</h1>

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
                <div className=" text-slate-900 h-full ">
                  <ReactQuill
                    className="editor"
                    theme="snow"
                    value={formData.description}
                    onChange={handleQuillChange}
                    modules={{
                      toolbar: toolbarOptions,
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="deadline" className="block font-semibold mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  id="deadline"
                  name="deadline"
                  className="w-1/6 p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.deadline}
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
                <label htmlFor="salary" className="block font-semibold mb-2">
                  Salary
                </label>
                <select
                  name="salary"
                  className="w-1/5 p-2 border border-gray-300 rounded-md"
                  value={formData.salary}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Select Salary
                  </option>
                  <option value="Competitive Salary">Competitive Salary</option>
                  <option value="Minimum Wage">Minimum Wage</option>
                  <option value="Based on Experience">
                    Based on Experience
                  </option>
                  <option value="other">Other</option>
                  {/* Add other salary options as needed */}
                </select>

                {/* Conditionally render an input for specific salary if "Other" is selected */}
                {formData.salary === "other" && (
                  <Input
                    type="number"
                    id="specificSalary"
                    name="specificSalary"
                    placeholder="Enter Specific Salary, $ per Year"
                    className="w-1/5 p-2 border border-gray-300 rounded-md mt-2"
                    value={formData.specificsalary}
                    onChange={handleInputChange}
                  />
                )}
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
