import React, { useContext, useEffect, useState } from "react";
import _axios from "../api/_axios";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import Input from '@mui/joy/Input';
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@material-ui/core";

const PostJob = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
  const [err,setError] = useState(null);


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
    title: '',
    description: '',
    location: selectedCountry,
    position: '',
    tags: '', // Assuming tags are comma-separated
  });

  const jobData = {
    ...formData,
    postdate: new Date().toISOString(),
    likes: 0,
    uid: currentUser._id,
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
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };


    const submit = async (e) => {
        e.preventDefault();
        try {
          await _axios.post("/jobs/", jobData);
          navigate("/profile");
        } catch (err) {
          setError(err.response.data);
        }
      };

      return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-2/3 justify-center items-center">
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
      
              <div className="mb-4">
                <label htmlFor="description" className="block font-semibold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter Job Description"
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
      
              <div className="mb-4">
                <label htmlFor="location" className="block font-semibold mb-2">
                  Location
                </label>
                <Autocomplete
                disablePortal
                id="location"
                name="location"
                options={countries}
                sx={{ width: 250 }}
                className="bg-white"
                value={selectedCountry}
                onChange={handleCountryChange}
                renderInput={(params) => (
                  <TextField {...params} label="Countries" />
                )}
              />
              </div>
      
              <div className="mb-4">
                <label htmlFor="jobPosition" className="block font-semibold mb-2">
                  Job Position
                </label>
                <Input
                  type="text"
                  id="position"
                  name="position"
                  placeholder="Enter Job Position"
                  className="w-full p-2 border border-gray-300 rounded-md"
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
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                  value={formData.tags}
                  onChange={handleInputChange}
                />
              </div>
      
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Submit Job
              </button>
            </form>
          </div>
        </div>
      );
      
};

export default PostJob;
