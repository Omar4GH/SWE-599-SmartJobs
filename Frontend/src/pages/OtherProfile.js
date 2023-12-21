import React, { useContext, useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { AuthContext } from "../context/authContext";
import _axios from "../api/_axios";
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
import AlarmIcon from "@mui/icons-material/Alarm";
import PaidIcon from "@mui/icons-material/Paid";
import CardContent from "@mui/joy/CardContent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { Link, useLocation } from "react-router-dom";
import defaultAvatar from "../assets/default-avatar.jpg"

const OtherProfile = () => {
  const { currentUser } = useContext(AuthContext);

  const location = useLocation();

  const userId = location.pathname.split("/")[2];

  const [userInfo, setUserInfo] = useState("");
  const [trigger, setTrigger] = useState(false);

  const [postedJobs, setPostedJobs] = useState([]);

  useEffect(() => {
    getOtherUser();
    getUser();
    getUserJobs();
  }, [trigger]);

  useEffect(() => {
    if (userInfo && postedJobs && userInfo.type === "Employer") {
      getUserJobs();
    }
  }, [trigger]);

  const getOtherUser = async () => {
    try {
      const res = await _axios.get(`users/${userId}`);
      setUserInfo(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getUserJobs = async () => {
    try {
      const res = await _axios.get(`jobs/user/${userId}`);
      setPostedJobs(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [savedPosts, setSavedPosts] = useState([]);
  const getUser = async () => {
    try {
      const res = await _axios.get(`users/${currentUser._id}`);

      setSavedPosts(res.data.saved_posts);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateSavedJobs = async (jobId) => {
    try {
      const response = await _axios.post(
        `/users/${currentUser._id}/saved-jobs`,
        { jobId }
      );
      if (response.status === 200) {
        console.log("Job saved successfully");
        setTrigger(!trigger);
      } else {
        console.log("User not found or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
  ////////////////////////////////////
  const likeJob = async (jobId) => {
    try {
      const response = await _axios.post(
        `/jobs/${jobId}/like-job`,
        { userId: currentUser._id }
      );
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
      const response = await _axios.post(
        `/jobs/${jobId}/like-job/remove`,
        { userId: currentUser._id }
      );
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
  ///////////////////////////////////

  const [showMore, setShowMore] = useState({});
  const handleShowMore = (jobId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      {userInfo ? (
        <>
          {" "}
          {userInfo === "" && (
            <div className="max-w-3xl mx-auto text-center">
              <CircularProgress />
            </div>
          )}
          <>
            <div className="max-w-4xl mx-auto bg-white rounded-3xl px-14 py-1">
              <div className="text-center">
                <img
                    src={
                      userInfo.profileImage ||
                      defaultAvatar
                    } alt="Profile Picture"
                  className="mx-auto h-24 w-24 rounded-full"
                />
                <p className="mt-2 text-sm text-gray-500">{userInfo.title}</p>
                <h2 className="mt-1 text-3xl font-extrabold text-gray-900">
                  {userInfo.firstname + " " + userInfo.lastname}
                </h2>
                {userInfo.type === "Employer" ? (
                  <>
                    <h2 className="text-base font-bold text-gray-900">
                      {userInfo.company}
                    </h2>
                  </>
                ) : (
                  <></>
                )}

                <p className="mt-2 text-sm text-gray-500">
                  @{userInfo.username}
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
                {userInfo.type === "Job Seeker" ? (
                  <>
                    <div className="mt-5">
                      <h3 className="text-lg font-medium text-gray-900">
                        Education
                      </h3>

                      <div className="border text-xs rounded-lg p-2 bg-slate-100 mb-1">
                        <div className="flex justify-end"></div>
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
                        <div className="flex justify-end"></div>
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
              {userInfo.type === "Job Seeker" ? (
                <></>
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
                            {" "}
                            <div
                              className=" transition w-full h-fit duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-5 bg-gradient-to-b  text-gray-900 from-white to-blue-50  p-6 rounded-lg shadow-xl  max-w-xl mx-auto mt-8 border-solid border-black"
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
                                          defaultAvatar
                                        } alt="User Avatar"
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
                                    <div className="flex text-xs items-center space-x-2">
                                    <PaidIcon className="text-green-800 mr-1" />
                                    {job.salary === "other"
                                      ? job.specificSalary + " $/year"
                                      : job.salary}
                                  </div>
                              </Link>
                              <div className="flex flex-wrap items-center space-x-4">
                                <div className="flex text-xs items-center space-x-2">
                                  <LocationOnIcon fontSize="medium" />
                                  {job?.location}
                                </div>
                                <div className="flex text-xs items-center space-x-2">
                                  <AccessTimeIcon fontSize="medium"/>
                                  {moment(job.postdate).fromNow()}
                                </div>
                                <div className="flex text-xs items-center space-x-2">
                                    <AlarmIcon className="text-red-800 mr-1" />
                                    {job?.deadline}
                                  </div>
                                <div className="flex items-center text-xs space-x-2">
                                {job.likes && job.likes.includes(currentUser._id) ? (
                  <>
                    {" "}
                    <ThumbUpIcon
                      fontSize="medium"
                      onClick={() => removeLike(job._id)}
                      className=" cursor-pointer hover:text-red-800"
                    />
                  </>
                ) : (
                  <>
                    <ThumbUpOffAlt
                      fontSize="medium"
                      onClick={() => likeJob(job._id)}
                      className=" cursor-pointer hover:text-blue-800"
                    />
                  </>
                )}
                                  {job?.likes.length}
                                </div>{" "}
                                {savedPosts && savedPosts.includes(job._id) ? (
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
                                    <BookmarkBorderIcon
                                      fontSize="medium"
                                      onClick={() => updateSavedJobs(job._id)}
                                      className=" cursor-pointer hover:text-blue-800"
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
              )}
            </div>
          </>
        </>
      ) : (
        <>
          <CircularProgress />
        </>
      )}
    </div>
  );
};

export default OtherProfile;
