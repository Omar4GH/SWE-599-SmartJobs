import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import _axios from "../api/_axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import OpenInNew from "@mui/icons-material/OpenInNew";
import AlarmIcon from "@mui/icons-material/Alarm";
import PaidIcon from "@mui/icons-material/Paid";
import {
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { AuthContext } from "../context/authContext";
const Job = () => {
  const { currentUser } = useContext(AuthContext);
  const { handleTokenLogin } = useContext(AuthContext);
  const [trigger, setTrigger] = useState(false);

  const location = useLocation();

  const jobId = location.pathname.split("/")[2];
  const [job, setJob] = useState({});

  useEffect(() => {
    // Extract the token from the URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    console.log("Got TOKEN");
    // Call handleTokenLogin with the extracted token
    if (token) {
      console.log("Looging TOKEN");
      handleTokenLogin(token);
    }

    // Your existing code...
    // ...
  }, []);
  console.log("Looging TOKEN");
  useEffect(async () => {
    if (currentUser) {
      try {
        const response = await _axios.post(
          `/activity/`,
          {
            action: "visited",
            userid: currentUser._id,
            jobid: jobId,
          }
        );
  
        if (response.status === 200) {
          console.log("Activity recorded successfully");
          
        } else {
          console.log("User not found or error occurred.");
        }
      } catch (error) {
        console.error("Error recording activity:", error);
      }
    }
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await _axios.get(`jobs/${jobId}`);
        setJob(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    getUser();
  }, [jobId, trigger]);

  const [showMore, setShowMore] = useState({});
  const handleShowMore = (jobId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  /////////////////////////////////////////////////////////////
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
  /////////////////////////////////////////////////////////////
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

  ////////////////////////
  return (
    <div className="w-full bg-slate-100  ">
      <div className="flex items-center h-screen w-4/5 mx-auto">
        <div
          className="w-2/3 p-4 bg-white rounded-lg my-6 shadow-md"
          style={{ overflowY: "auto" }}
        >
          <h1 className="text-2xl font-semibold mb-2">{job.title}</h1>
          <h1 className="text-sm mb-10">{job.contract} - {job.position}</h1>
          <p
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></p>
        </div>

        <div className="w-1/4 p-4 bg-gray-50 rounded-lg shadow-md ml-4 justify-center">
          <div className="flex items-center mb-2 mt-5 border rounded-md border-gray-300 p-3 bg-white">
            <Avatar
              src={
                job?.user?.[0].profileImage ||
                "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
              }
              sx={{ width: 55, height: 55 }}
            />
            <Link to={`/otherprofile/${job?.user?.[0]?._id}`}>
              <span className="text-gray-700 text-base">
                &nbsp;&nbsp;
                {job?.user?.[0]?.company || "Unknown"}
                <br />
                <p className="text-sm">
                  &nbsp;&nbsp; Posted by :{" "}
                  {job?.user?.[0]?.username || "Unknown"}
                </p>
              </span>
            </Link>
          </div>
          <div className="mt-5 border rounded-md border-gray-300 p-3 bg-white">
            <p className="text-sm text-gray-600 mb-2">
              <AccessTimeIcon /> {moment(job.postdate).format("MMMM DD, YYYY")}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <AlarmIcon className="text-red-800 mr-1" />
              {job?.deadline}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <PaidIcon className="text-green-800 mr-1" />
              {job.salary === "other"
                ? job.specificSalary + " $/year"
                : job.salary}
            </p>
          </div>
          <div className="flex place-content-between">
            <div className="flex mt-5 border w-fit rounded-md justify-end border-gray-300 p-3 bg-white">
              <div className="flex">
                <p className="text-lg text-blue-600 font-semibold mr-2">
                  {job?.likes?.length}
                </p>{" "}
                {job.likes && job.likes.includes(currentUser?._id) ? (
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
              </div>
              {savedPosts && savedPosts.includes(job._id) ? (
                <>
                  {" "}
                  <BookmarkRemoveIcon
                    fontSize="large"
                    onClick={() => removeSavedJob(job._id)}
                    className=" cursor-pointer hover:text-red-800"
                  />
                </>
              ) : (
                <>
                  <BookmarkBorderIcon
                    fontSize="large"
                    onClick={() => updateSavedJobs(job._id)}
                    className=" cursor-pointer hover:text-blue-800"
                  />
                </>
              )}
            </div>
            <div className="mt-5 border h-fit w-fit rounded-md place-content-between border-gray-300 p-3 bg-white">
              <p className="text-base text-gray-700">
                <LocationOnIcon /> {job.location}
              </p>
            </div>
          </div>
          <div className="mt-5 border w-fit rounded-md place-content-between border-gray-300 p-3 bg-white">
            <FormControl className="w-fit border   cursor-pointer">
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Mark
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "mark",
                  id: "uncontrolled-native",
                }}
                className=" "
              >
                <option value=""></option>
                <option value="Applied">Applied</option>
                <option value="Want to Apply">Want to Apply</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div className="mt-5 border rounded-md place-content-between border-gray-300 p-3 bg-white">
            {job.tags && job.tags.length > 0 ? (
              <>
                {job?.tags?.map((tag, index) => (
                  <Chip
                    className="w-fit feed-chip mt-1 mr-2"
                    key={tag}
                    label={tag}
                    size="small"
                    color="primary"
                  />
                ))}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="mt-5 text-center">
            {" "}
            <Button
              component="a"
              target="_blank"
              href={job.url}
              startDecorator={<OpenInNew />}
            >
              Open in new tab
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Job;
