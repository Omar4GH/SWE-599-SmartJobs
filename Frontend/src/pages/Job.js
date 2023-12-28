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
import Edit from "@mui/icons-material/Edit";
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
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [wantToApply, setWantToApply] = useState([]);
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
  useEffect(() => {
    if (currentUser) {
      try {
        const response = _axios.post(`/activity/`, {
          action: "visited",
          userid: currentUser._id,
          jobid: jobId,
        });

        if (response.status === 200) {
          console.log("Activity recorded successfully");
        } else {
          console.log("User not found or error occurred.");
        }
      } catch (error) {
        console.error("Error recording activity:", error);
      }
    }
    return () => {
      // Cleanup code if needed
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await _axios.get(`jobs/${jobId}`);
      setJob(res.data);
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
      setAppliedJobs(res.data.applied);
      setWantToApply(res.data.wantToApply);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    getUser();
    return () => {
      // Cleanup code if needed
    };
  }, [jobId, trigger]);

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

  /////////////////////////////////////////////////

  const handleMarkChange = (event, jobId) => {
    const selectedValue = event;

    if (selectedValue === "Applied") {
      updateAppliedJobs(jobId);
    } else if (selectedValue === "Want to Apply") {
      updateWantToApplyJobs(jobId);
    }
    else if (selectedValue === "Clear") {
      removeAppliedJobs(jobId);
      removeWantToApplyJobs(jobId);
    }
  };

  /////////////////////////////////////////////////
  const updateAppliedJobs = async (jobId) => {
    try {
      const response = await _axios.post(`/users/${currentUser._id}/applied`, {
        jobId,
      });
      if (response.status === 200) {
        console.log("Job Marked Applied successfully");
        removeWantToApplyJobs(jobId);
      } else {
        console.log("User not found or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeAppliedJobs = async (jobId) => {
    try {
      const response = await _axios.delete(
        `/users/${currentUser._id}/applied/remove`,
        {
          data: { jobId },
        }
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
  ///////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////
  const updateWantToApplyJobs = async (jobId) => {
    try {
      const response = await _axios.post(
        `/users/${currentUser._id}/wanttoapply`,
        { jobId }
      );
      if (response.status === 200) {
        removeAppliedJobs(jobId);
        console.log("Job Marked Applied successfully");
      } else {
        console.log("User not found or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const removeWantToApplyJobs = async (jobId) => {
    try {
      const response = await _axios.delete(
        `/users/${currentUser._id}/wanttoapply/remove`,
        {
          data: { jobId },
        }
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
  ///////////////////////////////////////////////////////////////

  return (
    <div className="w-full bg-slate-100  ">
      <div className="flex items-center h-screen w-4/5 mx-auto">
        <div
          className="w-2/3 p-4 bg-white rounded-lg my-6 shadow-md"
          style={{ overflowY: "auto" }}
        >
          <h1 className="text-2xl font-semibold mb-2">{job.title}</h1>
          <h1 className="text-sm mb-10">
            {job.contract} - {job.position}
          </h1>
          <p
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></p>
        </div>

        <div className="w-1/4 p-4 bg-gray-50 rounded-lg shadow-md ml-4 justify-center">
          {currentUser && currentUser._id === job.uid && (
            <div className="edit">
              <Link to={`/postjob?edit=2`} state={job}>
                <Edit />
              </Link>
            </div>
          )}
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
          </div><div className="flex flex-row justify-between">
            {currentUser && (
              <div
                className={`mt-5 w-fit border rounded-md place-content-between cursor-pointer border-gray-300 p-3 bg-white ${
                  appliedJobs && appliedJobs.includes(job._id)
                    ? "text-white font-semibold cursor-not-allowed bg-blue-600"
                    : ""
                }`}
                onClick={() => {
                  if (!(appliedJobs && appliedJobs.includes(job._id))) {
                    handleMarkChange("Applied", job._id);
                  }
                }}
              >
                Applied
              </div>
            )}

            {currentUser && (
              <div
                className={`mt-5 w-fit border rounded-md place-content-between cursor-pointer border-gray-300 p-3 bg-white ${
                  wantToApply && wantToApply.includes(job._id)
                    ? "text-white font-semibold cursor-not-allowed bg-blue-600"
                    : ""
                }`}
                onClick={() => {
                  if (!(wantToApply && wantToApply.includes(job._id))) {
                    handleMarkChange("Want to Apply", job._id);
                  }
                }}
              >
                Want to Apply
              </div>
            )}

            <div
              className="mt-5 w-fit border rounded-md cursor-pointer place-content-between border-gray-300 p-3 bg-white"
              onClick={() => handleMarkChange("Clear", job._id)}
            >
              Clear
            </div></div>
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
