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
  const [trigger, setTrigger] = useState(false);

  const location = useLocation();

  const jobId = location.pathname.split("/")[2];
  const [job, setJob] = useState({});

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

  return (
    <div className="w-full bg-slate-100  ">
      <div className="flex items-center h-full w-4/5 mx-auto">
        <div
          className="w-2/3 p-4 bg-white rounded-lg my-6 shadow-md"
          style={{ overflowY: "auto" }}
        >
          <h1 className="text-2xl font-semibold mb-16">{job.title}</h1>
          <p
            className="text-lg text-gray-700"
            dangerouslySetInnerHTML={{ __html: job.description }}
          ></p>
        </div>

        <div className="w-1/4 p-4 bg-gray-50 rounded-lg shadow-md ml-4 justify-center">
          <div className="flex items-center mb-2 mt-5 border rounded-md border-gray-300 p-3 bg-white">
            <Avatar
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              sx={{ width: 55, height: 55 }}
            />
            <Link to={`/otherprofile/${job?.user?.[0]?._id}`}>
              <span className="text-gray-700 text-base">
                &nbsp;&nbsp;{job?.user?.[0]?.username || "Unknown"}
              </span>
            </Link>
          </div>
          <div className="mt-5 border rounded-md border-gray-300 p-3 bg-white">
            <p className="text-sm text-gray-600 ">
              <AccessTimeIcon /> {moment(job.postdate).format("MMMM DD, YYYY")}
            </p>
          </div>
          <div className="flex place-content-between">
            <div className="flex mt-5 border w-fit rounded-md justify-end border-gray-300 p-3 bg-white">
              <div className="flex">
                <p className="text-lg text-blue-600 font-semibold mr-2">
                  0{job?.likes?.length}
                </p>{" "}
                <ThumbUpIcon fontSize="large" />
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
              href="#as-link"
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
