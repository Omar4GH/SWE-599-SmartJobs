import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../context/authContext";
import _axios from "../api/_axios";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Edit from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import {
  Avatar,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { Link } from "react-router-dom";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import Switch from "@mui/material/Switch";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [nationalities, setNationalities] = useState([]);
  const [savedJobs, setSavedJobs] = useState(null);
  const [savedPostsIds, setSavedPostsIds] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const switchEditMode = () => {
    setEditMode(!editMode);
  };
  useEffect(() => {
    getUser();
    getAllUsers();
  }, [trigger]);

  useEffect(() => {
    if (currentUser && savedPostsIds && currentUser.type === "Job Seeker") {
      getSavedJobs();
    }
  }, [savedPostsIds, trigger]);

  useEffect(() => {
    if (currentUser && savedPostsIds && currentUser.type === "Employer") {
      getUserJobs();
    }
  }, [trigger]);
  ///////////////////////////////////////////////////////
  const getAllUsers = async () => {
    try {
      const res = await _axios.get(`users/`);
      setAllUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  ///////////////////////////////////////////////////////
  const getUser = async () => {
    try {
      const res = await _axios.get(`users/${currentUser._id}`);
      setUserInfo(res.data);
      setSavedPostsIds(res.data.saved_posts);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getSavedJobs = async () => {
    console.log("IDS: " + savedPostsIds);
    _axios
      .get(`/jobs/saved?ids=${savedPostsIds.join(",")}`)
      .then((response) => {
        setSavedJobs(response.data);
        console.log("saved jobs: " + response.data);
        console.log(response.data);
        // Do something with the saved job post documents
      })
      .catch((error) => {
        console.error("Error fetching saved job posts:", error);
      });
  };

  const removeSavedJob = async (jobId) => {
    try {
      const response = await _axios.post(
        `/users/${currentUser._id}/saved-jobs/remove`,
        { jobId }
      );
      if (response.status === 200) {
        setTrigger(!trigger);
        console.log("Job unSaved successfully");
      } else {
        console.log("User not found or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserJobs = async () => {
    try {
      const res = await _axios.get(`jobs/user/${currentUser._id}`);
      setPostedJobs(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetch("https://restcountries.com/v2/all")
      .then((response) => response.json())
      .then((data) => {
        setNationalities(data.map((country) => country.name));
      });
  }, []);

  const deleteJob = (id) => {
    _axios.delete(`jobs/${id}`).then((response) => {
      setTrigger(!trigger);
    });
  };

  ////////////profile update
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mailing, setMailing] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // Add state for profile image

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      await _axios
        .put(`users/${currentUser._id}`, {
          firstname: firstname || userInfo.firstname,
          lastname: lastname || userInfo.lastname,
          bio: bio || userInfo.bio,
          birthdate: birthdate || userInfo.birthdate,
          country: country || userInfo.country,
          mailing: mailing,
          title: title || userInfo.title,
          company: company || userInfo.company,
          profileImage: profileImage || userInfo.profileImage,
        })
        .then((response) => {
          setTrigger(!trigger);
          switchEditMode();
        });
    } catch (err) {
      console.log(err);
    }
  };
  /////////////////////////
  const updateJobActive = async (jobId, newActiveStatus) => {
    try {
      const response = await _axios.put(`/jobs/${jobId}/job-active`, {
        active: newActiveStatus,
      });

      if (response.status === 200) {
        setTrigger(!trigger);
        console.log("Job post updated successfully");
      } else {
        console.log("Job post not found or an error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  /////////////LIKE//////////////
  const likeJob = async (jobId) => {
    try {
      const response = await _axios.post(`/jobs/${jobId}/like-job`, {
        userId: currentUser._id,
      });
      if (response.status === 200) {
        console.log("Job LIKED successfully");
        setTrigger(!trigger);
      } else {
        console.log("Job not found or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeLike = async (jobId) => {
    try {
      const response = await _axios.post(`/jobs/${jobId}/like-job/remove`, {
        userId: currentUser._id,
      });
      if (response.status === 200) {
        setTrigger(!trigger);
        console.log("Job unLIKED successfully");
      } else {
        console.log("Job not found or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  /////////////////////////////
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Set the base64 representation of the image
        setProfileImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };
  ////////////////////////
  const [showMore, setShowMore] = useState({});
  const handleShowMore = (jobId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };
  /////////////////////////////////
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {currentUser ? (
        <>
          {" "}
          {userInfo === "" && (
            <div className="max-w-3xl mx-auto text-center">
              <CircularProgress />
            </div>
          )}
          {editMode ? (
            <>
              <div className="max-w-4xl mx-auto bg-white rounded-3xl px-14 py-1">
                <DoneIcon
                  fontSize="medium"
                  className="cursor-pointer hover:text-blue-800"
                  onClick={updateProfile}
                />
                <CloseIcon
                  fontSize="medium"
                  className="cursor-pointer hover:text-red-800"
                  onClick={switchEditMode}
                />
                <div className="text-center justify-center">
                  <img
                    src={
                      userInfo.profileImage ||
                      "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                    }
                    alt="Profile Picture"
                    className="mx-auto h-24 w-24 rounded-full"
                  />

                  {/* Input for choosing an image */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <input
                    required
                    name="title"
                    type="text"
                    placeholder="Title"
                    defaultValue={userInfo.title}
                    className="block max-w-3xl mx-auto text-center  mt-3 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <h2 className="mt-1 text-base justify-center font-extrabold flex text-gray-900">
                    <input
                      required
                      name="firstname"
                      type="text"
                      placeholder="First Name"
                      defaultValue={userInfo.firstname}
                      className="block  px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                    <input
                      required
                      name="lastname"
                      type="text"
                      placeholder="Last Name"
                      defaultValue={userInfo.lastname}
                      className="block px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </h2>
                  {currentUser.type === "Employer" ? (
                    <>
                      <h2 className="text-base font-bold text-gray-900">
                        <input
                          required
                          name="company"
                          type="text"
                          placeholder="Company"
                          defaultValue={userInfo.company}
                          className="block max-w-3xl mx-auto text-center  mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </h2>
                    </>
                  ) : (
                    <></>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    @{currentUser.username}
                  </p>
                </div>
                <select
                  className="w-fit border rounded-lg shadow-md"
                  value={userInfo.mailing ? "true" : "false"}
                  onChange={(e) => {
                    setMailing(e.target.value === "true");
                  }}
                >
                  <option value="true">I want to Receive Emails</option>
                  <option value="false">No emails</option>
                </select>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Profile Information
                  </h3>
                  <dl className="mt-2 border-t border-b border-gray-200 grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="py-1">Birthdate</div>
                    <div className="py-1">Country</div>
                    <div className="text-sm text-gray-500">
                      <input
                        required
                        name="birthdate"
                        type="date"
                        placeholder="Your Birthdate"
                        defaultValue={userInfo.birthdate}
                        className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => setBirthdate(e.target.value)}
                      />
                    </div>
                    <div className="text-sm text-gray-500">
                      <select
                        required // use a <select> element instead of <input> for gender
                        name="nationality"
                        className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="">-- Select Country --</option>
                        {nationalities.map((nationality) => (
                          <option key={nationality} value={nationality}>
                            {nationality}
                          </option>
                        ))}
                      </select>
                    </div>
                  </dl>
                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      <input
                        required
                        name="bio"
                        placeholder="Bio..."
                        defaultValue={userInfo.bio}
                        type="text"
                        className="block w-full px-4 py-2 mt-2 text-slate-700 bg-white border rounded-md focus:border-slate-700 focus:ring-slate-700 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => setBio(e.target.value)}
                      />
                    </p>
                  </div>
                  {currentUser.type == "Job Seeker" ? (
                    <>
                      <div className="mt-5">
                        <h3 className="text-lg font-medium text-gray-900">
                          Education
                        </h3>
                      </div>
                      <div className="mt-5">
                        <h3 className="text-lg font-medium text-gray-900">
                          Experience
                        </h3>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">Jobs</h3>
                  <div className="mt-2 grid grid-cols-1 gap-4">
                    <div className="flex flex-col items-center h-full">
                      <Card
                        variant="outlined"
                        sx={{
                          width: "max(400px, 60%)",
                          borderRadius: "16px", // Adjust the value for the desired border radius
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", // Add shadow properties
                        }}
                        className="w-full max-w-xl mb-4 mx-4 elevation-2" // Use elevation-2 for the desired elevation level
                      ></Card>
                      <Card
                        variant="outlined"
                        sx={{
                          width: "max(400px, 60%)",
                          borderRadius: "16px", // Adjust the value for the desired border radius
                          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", // Add shadow properties
                        }}
                        className="w-full max-w-xl mb-4 mx-4 elevation-2" // Use elevation-2 for the desired elevation level
                      ></Card>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="max-w-4xl mx-auto bg-white rounded-3xl px-14 py-1">
                {userInfo.firstname === "" &&
                  userInfo.lastname === "" &&
                  userInfo.birthdate === "" &&
                  userInfo.country === "" && (
                    <Button
                      color="success"
                      onClick={switchEditMode}
                      size="md"
                      variant="solid"
                    >
                      Complete Your Profile
                    </Button>
                  )}
                <Edit
                  fontSize="medium"
                  className="cursor-pointer hover:text-blue-800"
                  onClick={switchEditMode}
                />
                <div className="text-center">
                  <img
                    src={
                      userInfo.profileImage ||
                      "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                    }
                    alt="Profile Picture"
                    className="mx-auto h-24 w-24 rounded-full"
                  />
                  <p className="mt-2 text-sm text-gray-500">{userInfo.title}</p>
                  <h2 className="mt-1 text-3xl font-extrabold text-gray-900">
                    {userInfo.firstname + " " + userInfo.lastname}
                  </h2>
                  {currentUser.type === "Employer" ? (
                    <>
                      <h2 className="text-base font-bold text-gray-900">
                        {userInfo.company}
                      </h2>
                    </>
                  ) : (
                    <></>
                  )}

                  <p className="mt-2 text-sm text-gray-500">
                    @{currentUser.username}
                  </p>
                </div>
                <div className="mt-5">
                  <h3 className="text-lg font-medium text-gray-900">
                    Profile Information
                  </h3>
                  <dl className="mt-2 border-t border-b border-gray-200 grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="py-1">Birthdate</div>
                    <div className="py-1">Country</div>
                    <div className="text-sm text-gray-500">
                      {userInfo.birthdate}
                    </div>
                    <div className="text-sm text-gray-500">
                      {userInfo.country}
                    </div>
                  </dl>
                  <div className="mt-5">
                    <h3 className="text-lg font-medium text-gray-900">Bio</h3>
                    <p className="mt-2 text-sm text-gray-500">{userInfo.bio}</p>
                  </div>
                  {currentUser.type === "Job Seeker" ? (
                    <>
                      <div className="mt-5">
                        <h3 className="text-lg font-medium text-gray-900">
                          Education
                        </h3>

                        <div className="border text-xs rounded-lg p-2 bg-slate-100 mb-1">
                          <div className="flex justify-end">
                            <DeleteIcon fontSize="small" />
                          </div>
                          <div className="grid grid-cols-2 mb-1 gap-1">
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                Level:
                              </h3>
                              <p>Masters</p>
                            </div>
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                Field:
                              </h3>
                              <p>Software Engineering</p>
                            </div>
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                University:
                              </h3>
                              <p>Bogazici University</p>
                            </div>
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                Country:
                              </h3>
                              <p>Turkey</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <h3 className="text-lg font-medium text-gray-900">
                          Experience
                        </h3>
                        <div className="border text-xs rounded-lg p-2 bg-slate-100 mb-1">
                          <div className="flex justify-end">
                            <DeleteIcon fontSize="small" />
                          </div>
                          <div className="grid grid-cols-2 mb-1 gap-1">
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                Job Title:
                              </h3>
                              <p>Software Engineer</p>
                            </div>
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                Company:
                              </h3>
                              <p>Google</p>
                            </div>
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                Currently Working:
                              </h3>
                              <p>No</p>
                            </div>
                            <div className="mb-1">
                              <h3 className="text-gray-500 mb-1 font-bold">
                                Description:
                              </h3>
                              <p>dasdasdasd</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {currentUser.type === "Job Seeker" ? (
                  <>
                    <div className="mt-5">
                      <h3 className="text-lg font-medium text-gray-900">
                        Saved Jobs
                      </h3>
                      <div className="flex flex-col items-center h-full">
                        {savedJobs &&
                          savedJobs.map((job) => (
                            <>
                              {" "}
                              <div
                                className=" transition w-full h-fit duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-5 bg-gradient-to-b  text-gray-900 from-blue-50 to-blue-100  p-6 rounded-lg shadow-xl  max-w-xl mx-auto mt-8 border-solid border-black"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                  borderRadius: "16px", // Adjust the value for the desired border radius
                                }}
                              >
                                {" "}
                                <Link to={`/job/${job._id}`}>
                                  <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-lg font-medium">
                                      {job?.title}
                                    </h1>
                                    <div className="flex text-sm items-center space-x-2">
                                      <img
                                        src={
                                          job?.user?.[0].profileImage ||
                                          "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                                        }
                                        alt="User Avatar"
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                        }}
                                      />
                                      {job?.user?.[0]?.username || "Unknown"}
                                    </div>
                                  </div>
                                  <div className="text-xs font-medium mb-2">
                                    {job?.position}
                                  </div>
                                  <div
                                    className="mb-4 text-xs text-black"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        job.description.slice(0, 85) + "...",
                                    }}
                                  ></div>
                                </Link>
                                <div className="flex flex-wrap items-center space-x-4">
                                  <div className="flex text-xs items-center space-x-2">
                                    <LocationOnIcon fontSize="medium" />
                                    {job?.location}
                                  </div>
                                  <div className="flex text-xs items-center space-x-2">
                                    <AccessTimeIcon fontSize="medium" />
                                    {moment(job.postdate).fromNow()}
                                  </div>
                                  <div className="flex items-center text-xs space-x-2">
                                    {job.likes &&
                                    job.likes.includes(currentUser._id) ? (
                                      <>
                                        {" "}
                                        <ThumbUpIcon
                                          fontSize="large"
                                          onClick={() => removeLike(job._id)}
                                          className=" cursor-pointer hover:text-red-800"
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <ThumbUpOffAlt
                                          fontSize="large"
                                          onClick={() => likeJob(job._id)}
                                          className=" cursor-pointer hover:text-blue-800"
                                        />
                                      </>
                                    )}
                                    {job?.likes.length}
                                  </div>{" "}
                                  {savedJobs && savedJobs.includes(job._id) ? (
                                    <>
                                      {" "}
                                      <BookmarkRemoveIcon
                                        fontSize="medium"
                                        onClick={() => removeSavedJob(job._id)}
                                        className=" cursor-pointer hover:text-red-800"
                                      />
                                    </>
                                  ) : (
                                    <>
                                      <BookmarkRemoveIcon
                                        fontSize="medium"
                                        onClick={() => removeSavedJob(job._id)}
                                        className=" cursor-pointer hover:text-red-800"
                                      />
                                    </>
                                  )}
                                </div>
                                <div className="mt-3">
                                  <div className="text-xs font-semibold">
                                    Tags
                                  </div>
                                  <div className="flex space-x-2">
                                    {job.tags && job.tags.length > 0 ? (
                                      <div>
                                        {job.tags
                                          .slice(0, 5)
                                          .map((tag, index) => (
                                            <Chip
                                              className="w-fit text-xs feed-chip mt-2 mr-2"
                                              key={tag}
                                              label={tag}
                                              size="small"
                                              color="primary"
                                            />
                                          ))}
                                        {job.tags.length > 5 &&
                                          job.tags.slice(5).length > 0 && (
                                            <button
                                              className="text-blue-500 text-xs float-right font-semibold mt-2 focus:outline-none"
                                              onClick={() =>
                                                handleShowMore(job._id)
                                              }
                                            >
                                              {showMore[job.id]
                                                ? "Show Less"
                                                : `+${
                                                    job.tags.slice(5).length
                                                  } more`}
                                            </button>
                                          )}
                                        {showMore[job._id] &&
                                          job.tags
                                            .slice(5)
                                            .map((tag, index) => (
                                              <Chip
                                                className="w-fit text-xs feed-chip mt-2 mr-2"
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                color="primary"
                                              />
                                            ))}
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                                <FormControl className="w-fit border   cursor-pointer">
                                  <InputLabel
                                    variant="standard"
                                    htmlFor="uncontrolled-native"
                                  >
                                    Mark
                                  </InputLabel>
                                  <NativeSelect
                                    defaultValue={30}
                                    inputProps={{
                                      name: "mark",
                                      id: "uncontrolled-native",
                                    }}
                                    className="rounded-lg shadow-md "
                                  >
                                    <option value=""></option>
                                    <option value="Applied">Applied</option>
                                    <option value="Want to Apply">
                                      Want to Apply
                                    </option>
                                  </NativeSelect>
                                </FormControl>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="mt-5">
                      <h3 className="text-lg font-medium text-gray-900">
                        Posted Jobs
                      </h3>
                      <div className="flex flex-col items-center h-full">
                        {postedJobs &&
                          postedJobs.map((job) => (
                            <>
                              <div
                                className=" transition w-full h-fit duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-5 bg-gradient-to-b  text-gray-900 from-blue-50 to-blue-100  p-6 rounded-lg shadow-xl  max-w-xl mx-auto mt-8 border-solid border-black"
                                style={{
                                  fontFamily: "Montserrat, sans-serif",
                                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                                  borderRadius: "16px", // Adjust the value for the desired border radius
                                }}
                              >
                                {" "}
                                <Link to={`/job/${job._id}`}>
                                  <div className="flex items-center justify-between mb-4">
                                    <h1 className="text-lg font-medium">
                                      {job?.title}
                                    </h1>
                                    <div className="flex text-sm items-center space-x-2">
                                      <img
                                        src={
                                          job?.user?.[0].profileImage ||
                                          "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                                        }
                                        alt="User Avatar"
                                        style={{
                                          width: "40px",
                                          height: "40px",
                                          borderRadius: "50%",
                                        }}
                                      />
                                      {job?.user?.[0]?.username || "Unknown"}
                                    </div>
                                  </div>
                                  <div className="text-xs font-medium mb-2">
                                    {job?.position}
                                  </div>
                                  <div
                                    className="mb-4 text-xs text-black"
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        job.description.slice(0, 85) + "...",
                                    }}
                                  ></div>
                                </Link>
                                <div className="flex flex-wrap items-center space-x-4">
                                  <div className="flex text-xs items-center space-x-2">
                                    <LocationOnIcon fontSize="medium" />
                                    {job?.location}
                                  </div>
                                  <div className="flex text-xs items-center space-x-2">
                                    <AccessTimeIcon fontSize="medium" />
                                    {moment(job.postdate).fromNow()}
                                  </div>
                                  <div className="flex items-center text-xs space-x-2">
                                    {job.likes && (
                                      <>
                                        <ThumbUpOffAlt
                                          onClick={() => {
                                            setOpen(!open);
                                          }}
                                        />
                                      </>
                                    )}
                                    {job?.likes.length}
                                  </div>{" "}
                                  <DeleteIcon
                                    onClick={() => deleteJob(job._id)}
                                    className="cursor-pointer hover:text-red-800"
                                  />
                                </div>
                                {open && job?.likes?.length>0 ? (
                                  <>
                                    {" "}
                                    <div className="my-1 rounded-xl shadow-2xl p-4 max-h-40 overflow-y-scroll overflow-x-hidden bg-white">
                                      {allUsers.map(
                                        (user) =>
                                          job.likes.includes(user._id) && (
                                            <Link
                                            key={user._id}
                                            to={`/otherprofile/${user._id}`}
                                          >
                                              <div
                                                key={user._id}
                                                className="flex items-center space-x-2 mb-2 w-fit p-1 border-solid border-black"
                                              >
                                                <img
                                                  src={
                                                    user?.profileImage ||
                                                    "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                                                  }
                                                  alt="User Avatar"
                                                  style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    borderRadius: "50%",
                                                    marginRight: 4,
                                                  }}
                                                />

                                                {user.username}
                                              </div>
                                            </Link>
                                          )
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <div className="mt-3">
                                  <div className="text-xs font-semibold">
                                    Tags
                                  </div>
                                  <div className="flex space-x-2">
                                    {job.tags && job.tags.length > 0 ? (
                                      <div>
                                        {job.tags
                                          .slice(0, 5)
                                          .map((tag, index) => (
                                            <Chip
                                              className="w-fit text-xs feed-chip mt-2 mr-2"
                                              key={tag}
                                              label={tag}
                                              size="small"
                                              color="primary"
                                            />
                                          ))}
                                        {job.tags.length > 5 &&
                                          job.tags.slice(5).length > 0 && (
                                            <button
                                              className="text-blue-500 text-xs float-right font-semibold mt-2 focus:outline-none"
                                              onClick={() =>
                                                handleShowMore(job._id)
                                              }
                                            >
                                              {showMore[job.id]
                                                ? "Show Less"
                                                : `+${
                                                    job.tags.slice(5).length
                                                  } more`}
                                            </button>
                                          )}
                                        {showMore[job._id] &&
                                          job.tags
                                            .slice(5)
                                            .map((tag, index) => (
                                              <Chip
                                                className="w-fit text-xs feed-chip mt-2 mr-2"
                                                key={tag}
                                                label={tag}
                                                size="small"
                                                color="primary"
                                              />
                                            ))}
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                </div>
                                <select
                                  className="w-fit border rounded-lg shadow-md"
                                  value={job.active ? "true" : "false"}
                                  onChange={(e) =>
                                    updateJobActive(
                                      job._id,
                                      e.target.value === "true"
                                    )
                                  }
                                >
                                  <option value="true">Public</option>
                                  <option value="false">Draft</option>
                                </select>
                              </div>
                            </>
                          ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          <div>
            {" "}
            <button className="w-full px-4 py-2 tracking-wide bg-blue-950 text-white transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-300 submit-btn">
              <a href="/login">Login or Register</a>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
