//import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";

import "react-datetime/css/react-datetime.css";
import { format } from 'date-fns';

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { FormControlLabel, Checkbox } from "@material-ui/core";
//import _axios from "../../api/_axios";


const TestPage2 = () => {
    const [trigger, setTrigger] = useState(false);
    const levelOfStudyOptions = ["Bachelor", "Master", "PhD"];
    const fieldOfStudyOptions = [
      "Computer Science",
      "Engineering",
      "Medicine",
      "Business Administration",
    ];
    const universityOptions = [
      "Example University",
      "Another University",
      "One More University",
    ];
  
    ///////////////////// PERSONAL INFO //////////////////////////
  
    const handleChange = (e) => {
      if (e.target.name === "photo") {
        setPersonal((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
      } else {
        setPersonal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    };
    const handleDateChange = (date) => {
      setPersonal((prev) => ({ ...prev, birthdate: date }));
    };
    const [personal, setPersonal] = useState({
      first_name: "",
      last_name: "",
      birthdate: "",
      mobile: "",
      address: "",
      nationality: "",
      country: "",
      city: "",
      preferable_language: "",
      bio: "",
      license: "",
      photo: null,
    });
    console.log(personal);
  
    const submitProviderProfile = (event) => {
      event.preventDefault();
  
     /* _axios
        .put("provider/profile", personal)
        .then((response) => {
          console.log("Updated Profile");
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    ///////////////////// PERSONAL INFO END //////////////////////////
  
    /////////////////////////  EDUCATION    ///////////////////////////////////
    const [education, setEducation] = useState({
      level_of_study: "",
      field_of_study: "",
      university: "",
      university_location: "",
      certificate: null,
    });
    const handleEduChange = (e) => {
      if (e.target.name === "certificate") {
        setEducation((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
      } else {
        setEducation((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    };
   // const [educationInfo, setEducationInfo] = useState({});

    const [educationInfo, setEducationInfo] = useState([
        {
          id: 1,
          level_of_study: "Bachelor's Degree",
          field_of_study: "Computer Science",
          university: "Example University",
          university_location: "United States",
        },
        {
          id: 2,
          level_of_study: "Master's Degree",
          field_of_study: "Data Science",
          university: "Another University",
          university_location: "Canada",
        },
      ]);



    const submitProviderEdu = (event) => {
      event.preventDefault();
  /*
      _axios
        .post("provider/educations", education)
        .then((response) => {
          console.log("Submitted Education");
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
  
    const getProviderEducation = () => {
      /*
        _axios
        .get("provider/educations")
        .then((response) => {
          console.log(response);
          setEducationInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    const deleteEducation = (id) => {
    /*
        _axios
        .delete(`provider/educations/${id}`)
        .then((response) => {
          console.log("deleted");
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
  
    /////////////////////////  EDUCATION END   ///////////////////////////////////
    /////////////////////////  WORK EXP   ///////////////////////////////////
  
    const [workExp, setWorkExp] = useState({
      job_title: "",
      company: "",
      work_country: "",
      currently_working: false,
      description: "",
      years_of_experience: 0,
    });
    const handleWorkChange = (e) => {
      if (e.target.name === "cv") {
        setWorkExp((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
      } else {
        setWorkExp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      }
    };
    const [workInfo, setWorkInfo] = useState({});
  
    const submitProviderWork = (event) => {
      event.preventDefault();
  /*
      _axios
        .post("provider/work_experiences", workExp)
        .then((response) => {
          console.log("Submitted Education");
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    const getProviderWork = () => {
      /*
        _axios
        .get("provider/work_experiences")
        .then((response) => {
          console.log(response);
          setWorkInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    const deleteWork = (id) => {
      /*
        _axios
        .delete(`provider/work_experiences/${id}`)
        .then((response) => {
          console.log("deleted");
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    /////////////////////////  WORK EXP  END ///////////////////////////////////
    ///////////////////////// AVAILABILITY  ///////////////////////////////////
  
    const [availability, setAvailability] = useState({
      start_time: "",
      end_time: "",
      is_available: false,
    });
    const [availabilityInfo, setAvailabilityInfo] = useState({});
  console.log(availability);
    const handleAvailabilityChange = (e) => {
      setAvailability((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
  
    const submitProviderAvailability = (event) => {
      event.preventDefault();
  /*
      _axios
        .post("provider/availabilities", availability)
        .then((response) => {
          console.log("Submitted Education");
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    const getProviderAvailability = () => {
      /*
        _axios
        .get("provider/availabilities")
        .then((response) => {
          console.log(response);
          setAvailabilityInfo(response.data);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    const deleteAvailability = (id) => {
     /*
        _axios
        .delete(`provider/availabilities/${id}`)
        .then((response) => {
          console.log("deleted");
          setTrigger(!trigger);
        })
        .catch((error) => {
          console.log(error);
        });*/
    };
    ///////////////////////// AVAILABILITY END ///////////////////////////////////
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
    };
  
    const steps = [
      "Personal",
      "Education",
      "Work Experience",
      "Availability",
      "Complete",
    ];
  
    const [err, setError] = useState(null);
  
    const [nationalities, setNationalities] = useState([]);
  
    const params = new URLSearchParams(window.location.search);
  
    useEffect(() => {
      fetch("https://restcountries.com/v2/all")
        .then((response) => response.json())
        .then((data) => {
          setNationalities(data.map((country) => country.name));
        });
  
      getProviderEducation();
      getProviderWork();
      getProviderAvailability();
    }, [trigger]);
  
    //////////////////////////////////
    const [completed, setCompleted] = React.useState({});
  
    const totalSteps = () => {
      return steps.length;
    };
  
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
  
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
  
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
  
    const handleStep = (step) => () => {
      setActiveStep(step);
    };
  
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
  
    //////////////////////////////////
    return (
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden bg-blue-950 ">
        <Box className="mt-5" sx={{ width: "100%" }}>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step
                className="text-white"
                key={label}
                completed={completed[index]}
              >
                <StepButton
                  className="text-white bg-white"
                  sx={{ color: "#FF5500" }}
                  onClick={handleStep(index)}
                >
                  <p className="text-white">{label}</p>
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Box>
  {/*          STEP 1             */}
        <Box sx={{ display: activeStep === 0 ? "block" : "none" }}>
          <div className="w-5/12 p-6 mx-auto mt-5 mb-5 tabbg pb-12 rounded-md shadow-xl lg:max-w-xl bg-white">
            <div className="grid grid-cols-2 gap-4">
              <TextField
                required
                fullWidth
                label="First Name"
                name="first_name"
                value={personal.first_name}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                fullWidth
                label="Last Name"
                name="last_name"
                value={personal.last_name}
                onChange={handleChange}
                margin="normal"
              />
  
              <input
                type="date"
                name="birthdate"
                value={personal.birthdate}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]} // to set maximum selectable date to today
                required
              />
              <TextField
                required
                fullWidth
                label="Mobile"
                name="mobile"
                value={personal.mobile}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                value={personal.address}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Nationality</InputLabel>
                <Select
                  name="nationality"
                  value={personal.nationality}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select nationality</MenuItem>
                  {nationalities.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={personal.country}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select country</MenuItem>
                  {nationalities.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={personal.city}
                onChange={handleChange}
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Preferable Language</InputLabel>
                <Select
                  name="preferable_language"
                  value={personal.preferable_language}
                  onChange={handleChange}
                >
                  <MenuItem value="English">English</MenuItem>
                  <MenuItem value="Spanish">Spanish</MenuItem>
                  <MenuItem value="French">French</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                fullWidth
                label="Bio"
                name="bio"
                value={personal.bio}
                onChange={handleChange}
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                required
                fullWidth
                label="License"
                name="license"
                value={personal.license}
                onChange={handleChange}
                margin="normal"
              />
  
              <Box display="flex" alignItems="center" margin="normal">
                <Box marginRight={1}>
                  <Typography>Photo:</Typography>
                </Box>
                <input
                  accept="image/*"
                  type="file"
                  id="photo-id-input"
                  name="photo"
                  style={{ display: "none" }}
                  onChange={handleChange}
                />
                <label htmlFor="photo-id-input">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload
                  </Button>
                </label>
              </Box>
            </div>
            <Button
              className="float-right"
              variant="contained"
              onClick={submitProviderProfile}
            >
              Update
            </Button>
            <br />
            <br />
            <Button
              className="float-right"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              className="float-left"
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </Box>
  
               {/*          STEP 2             */}

        <Box sx={{ display: activeStep === 1 ? "block" : "none" }}>
          <div className="w-5/12 p-6 mx-auto mt-5 mb-5 tabbg pb-12 rounded-md shadow-xl lg:max-w-xl bg-white">
            {Array.isArray(educationInfo) &&
              educationInfo.map((edu) => (
                <>
                  <div className="border rounded-lg p-3 bg-slate-100 mb-1">
                    <div className="flex justify-end">
                      <DeleteIcon onClick={() => deleteEducation(edu.id)} />
                    </div>
                    <div className="grid grid-cols-2 mb-1 gap-1">
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Level:</h3>
                        <p>{edu.level_of_study}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Field:</h3>
                        <p>{edu.field_of_study}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">University:</h3>
                        <p>{edu.university}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Country:</h3>
                        <p>{edu.university_location}</p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            <div className="grid grid-cols-2 mb-3 gap-4">
              <div className="relative">
                <FormControl fullWidth margin="normal">
                  <InputLabel>Level of Education</InputLabel>
                  <Select
                    name="level_of_study"
                    value={personal.level_of_study}
                    onChange={handleEduChange}
                  >
                    {levelOfStudyOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="relative">
                <FormControl fullWidth margin="normal">
                  <InputLabel>Field of Study</InputLabel>
                  <Select
                    name="field_of_study"
                    value={personal.field_of_study}
                    onChange={handleEduChange}
                  >
                    {fieldOfStudyOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="relative">
                <FormControl fullWidth margin="normal">
                  <InputLabel>University</InputLabel>
                  <Select
                    name="university"
                    value={personal.university}
                    onChange={handleEduChange}
                  >
                    {universityOptions.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="relative">
                <FormControl fullWidth margin="normal">
                  <InputLabel>University Location</InputLabel>
                  <Select
                    name="university_location"
                    value={personal.university_location}
                    onChange={handleEduChange}
                  >
                    {nationalities.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>{" "}
            <AddCircleSharpIcon
              className="float-right cursor-pointer"
              variant="contained"
              onClick={submitProviderEdu}
            />
            <br />
            <br />
            <Button
              className="float-right"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              className="float-left"
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </Box>
  

           {/*          STEP 3             */}

        <Box sx={{ display: activeStep === 2 ? "block" : "none" }}>
          <div className="w-5/12 p-6 mx-auto mt-5 mb-5 tabbg pb-12 rounded-md shadow-xl lg:max-w-xl bg-white">
            {Array.isArray(workInfo) &&
              workInfo.map((work) => (
                <>
                  <div className="border rounded-lg p-3 bg-slate-100 mb-1">
                    <div className="flex justify-end">
                      <DeleteIcon onClick={() => deleteWork(work.id)} />
                    </div>
                    <div className="grid grid-cols-2 mb-1 gap-1">
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Job Title:</h3>
                        <p>{work.job_title}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Company:</h3>
                        <p>{work.company}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Currently Working:</h3>
                        <p>{work.currently_working}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Description:</h3>
                        <p>{work.description}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">
                          Years of Experience:
                        </h3>
                        <p>{work.years_of_experience}</p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            <div className="grid grid-cols-2 mb-3 gap-4">
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  label="Job Title"
                  name="job_title"
                  value={workExp.job_title}
                  onChange={handleWorkChange}
                  margin="normal"
                />
              </div>
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  label="Company"
                  name="company"
                  value={workExp.company}
                  onChange={handleWorkChange}
                  margin="normal"
                />
              </div>
  
              <div className="relative">
                <FormControl fullWidth margin="normal">
                  <InputLabel>Country</InputLabel>
                  <Select
                    name="work_country"
                    value={workExp.work_country}
                    onChange={handleWorkChange}
                  >
                    {nationalities.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
  
              <div className="relative">
                <FormControl fullWidth margin="normal">
                  <InputLabel>Currently Working</InputLabel>
                  <Select
                    name="currently_working"
                    value={workExp.currently_working}
                    onChange={handleWorkChange}
                  >
                    <MenuItem value="false">No</MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  label="Description"
                  name="description"
                  value={workExp.description}
                  onChange={handleWorkChange}
                  margin="normal"
                />
              </div>
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  label="Years Of Experience"
                  name="years_of_experience"
                  value={workExp.years_of_experience}
                  onChange={handleWorkChange}
                  margin="normal"
                />
              </div>
            </div>{" "}
            <AddCircleSharpIcon
              className="float-right cursor-pointer"
              variant="contained"
              onClick={submitProviderWork}
            />
            <br />
            <br />
            <Button
              className="float-right"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              className="float-left"
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </Box>
  
                {/*          STEP 4             */}

        <Box sx={{ display: activeStep === 3 ? "block" : "none" }}>
          <div className="w-5/12 p-6 mx-auto mt-5 mb-5 tabbg pb-12 rounded-md shadow-xl lg:max-w-xl bg-white">
  
          {Array.isArray(availabilityInfo) &&
              availabilityInfo.map((av) => (
                <>
                  <div className="border rounded-lg p-3 bg-slate-100 mb-1">
                    <div className="flex justify-end">
                      <DeleteIcon onClick={() => deleteAvailability(av.id)} />
                    </div>
                    <div className="grid grid-cols-2 mb-1 gap-1">
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Start Time:</h3>
                        <p>{format(new Date(av.start_time), 'MMM dd, yyyy h:mm a')}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">End Time:</h3>
                        <p>{format(new Date(av.end_time), 'MMM dd, yyyy h:mm a')}</p>
                      </div>
                      <div className="mb-1">
                        <h3 className="font-bold text-lg">Available:</h3>
                        <p>{av.is_available ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                </>
              ))}
  
            <div className="grid grid-cols-2 mb-3 gap-4">
              <div className="relative">
                <TextField
                  required
                  fullWidth
                  label="Start Time"
                  name="start_time"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={availability.start_time}
                  onChange={handleAvailabilityChange}
                  margin="normal"
                />
  
                <TextField
                  required
                  fullWidth
                  label="End Time"
                  name="end_time"
                  type="datetime-local"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={availability.end_time}
                  onChange={handleAvailabilityChange}
                  margin="normal"
                />
  
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={availability.is_available}
                      onChange={(e) =>
                        setAvailability((prev) => ({
                          ...prev,
                          is_available: e.target.checked,
                        }))
                      }
                      name="is_available"
                      color="primary"
                    />
                  }
                  label="Yes No Availability"
                />
              </div>
            </div>{" "}
            <AddCircleSharpIcon
              className="float-right cursor-pointer"
              variant="contained"
              onClick={submitProviderAvailability}
            />
            <br />
            <br />
            <Button
              className="float-right"
              variant="contained"
              onClick={handleNext}
            >
              Next
            </Button>
            <Button
              className="float-left"
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </Box>
  
  
                  {/*          STEP 5            */}

        <Box sx={{ display: activeStep === 4 ? "block" : "none" }}>
          <div className="w-5/12 p-6 mx-auto mt-5 mb-5 tabbg pb-12 rounded-md shadow-xl lg:max-w-xl bg-white">
  
      
          
            <Button
              className="float-right"
              variant="contained"
              onClick={() => navigate('/provider/profile')}
            >
              Go to Profile
            </Button>
            <Button
              className="float-left"
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
          </div>
        </Box>
  
      </div>
    );
};

export default TestPage2;
