import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//import _axios from '../../api/_axios';

const TestPage = () => {


    const [err, setError] = useState(null);
    //const navigate = useNavigate();
  
    const [nationalities, setNationalities] = useState([]);
  
    const params = new URLSearchParams(window.location.search);
 
    const submit = async (e) => {
        e.preventDefault();
        /*_axios.post("employee/signup", inputs).then((response) =>{
          console.log(response);
          
          navigate("/employee/profile");
        }).catch (error =>{
          setError(error.response.data);
        });
           */
      };


    useEffect(() => {
        fetch("https://restcountries.com/v2/all")
          .then((response) => response.json())
          .then((data) => {
            setNationalities(data.map((country) => country.name));
          });
      }, []);
    

    const [inputs, setInputs] = useState({
        phone_number: "",
        password: "",
        birthdate: "",
        gender: "",
        nationality: "",
        address: "",
        preferencelanguage: "",
        jobtitle: "",
        profile_photo: null,
      });
    const handleChange = (e) => {
        if (e.target.name === "profile_photo") { // Handle profile photo input separately
          setInputs((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
        } else {
          setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        }
      };


  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden signinbg ">
      
    <div className="w-5/12 p-6 mx-auto mt-5 mb-5 tabbg rounded-md shadow-xl lg:max-w-xl">
      <h1
        className="text-3xl font-semibold text-center uppercase"
        style={{ color: "#222c40" }}
      >
        Job Poster Signup
      </h1>
      <form className="mt-6" onSubmit={submit}>
        <div className="mb-2">
          <label
            htmlFor="phone_number"
            className="block text-sm font-semibold text-gray-800"
          >
            Phone Number
          </label>
          <input
            required
            name="phone_number"
            type="tel" // change the type to "tel" for phone number
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Password
          </label>
          <input
            required
            name="password"
            type="password"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="birthdate"
            className="block text-sm font-semibold text-gray-800"
          >
            Birthdate
          </label>
          <input
            required
            name="birthdate"
            type="date" // change the type to "date" for birthdate
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="gender"
            className="block text-sm font-semibold text-gray-800"
          >
            Gender
          </label>
          <select
            required // use a <select> element instead of <input> for gender
            name="gender"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          >
            <option value="">-- Select gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

 
        <div className="mb-2">
          <label
            htmlFor="nationality"
            className="block text-sm font-semibold text-gray-800"
          >
            Nationality
          </label>
          <select
            required // use a <select> element instead of <input> for gender
            name="nationality"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          >
            <option value="">-- Select Country --</option>
            {nationalities.map((nationality) => (
              <option key={nationality} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-2">
          <label
            htmlFor="address"
            className="block text-sm font-semibold text-gray-800"
          >
            Address
          </label>
          <input
            required
            name="address"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>



        <div className="mb-2">
          <label
            htmlFor="languagepreference"
            className="block text-sm font-semibold text-gray-800"
          >
            Language Preference
          </label>
          <input
            required
            name="languagepreference"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="jobtitle"
            className="block text-sm font-semibold text-gray-800"
          >
            Job Title
          </label>
          <input
            required
            name="jobtitle"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="profile_photo"
            className="block text-sm font-semibold text-gray-800"
          >
            Profile Photo
          </label>
          <input
            
            name="profile_photo"
            type="file" // set the type to "file" for file uploads
            accept="image/*" // specify the accepted file types
            className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
            onChange={handleChange}
          />
        </div>

        {/* <a href="#" className="text-xs text-purple-600 hover:underline">
          Forget Password?
        </a> */}
        {err && <p className="text-red-600">{err}</p>}
        <div className="mt-6">
          <button className="w-full px-4 py-2 tracking-wide bg-slate-700 text-white transition-colors duration-200 transform rounded-md hover:bg-orange-100 focus:outline-none focus:bg-orange-100 submit-btn">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>

  );
};

export default TestPage;
