import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import _axios from "../api/_axios";
import moment from "moment";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Feed = () => {
  const { currentUser } = useContext(AuthContext);

  const [jobs, setJobs] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const fetchData = async () => {
    try {
      const res = await _axios.get(`jobs`);
      setJobs(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const [showMore, setShowMore] = useState({});
  const handleShowMore = (jobId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };

  useEffect(() => {
    fetchData();
    getUser();
  }, [trigger]);

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

  return (
    <div className="flex flex-col items-center h-full bg-slate-100">
      <div className="text-2xl mb-4"></div>

      {jobs ? (
        <>
          {jobs.map((job) => (
            <>
              <>
                {" "}
                <div
                  className=" transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-10 bg-gradient-to-b h-full text-gray-900 from-white to-blue-50  p-6 rounded-lg shadow-xl w-1/2 max-w-xl mx-auto mt-8 border-solid border-black"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "16px", // Adjust the value for the desired border radius
                  }}
                >
                  {" "}
                  <Link to={`/job/${job._id}`}>
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-3xl font-medium">{job?.title}</h1>
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                          alt="User Avatar"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />

                        {job?.user?.[0]?.username || "Unknown"}
                      </div>
                    </div>
                    <div className="text-base font-medium mb-2">
                      {job?.position}
                    </div>
                    <div
                      className="mb-4 text-base text-black"
                      dangerouslySetInnerHTML={{
                        __html: job.description.slice(0, 90) + "...",
                      }}
                    ></div>
                  </Link>
                  <div className="flex flex-wrap items-center space-x-4">
                    <div className="flex text-sm items-center space-x-2">
                      <LocationOnIcon />
                      {job?.location}
                    </div>
                    <div className="flex text-sm items-center space-x-2">
                      <AccessTimeIcon />
                      {moment(job.postdate).fromNow()}
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      {currentUser ? (
                        job.likes && job.likes.includes(currentUser?._id) ? (
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
                        )
                      ) : (
                        <>
                          <ThumbUpOffAlt
                            fontSize="large"
                            className=" cursor-pointer hover:text-gray-700"
                          />
                        </>
                      )}

                      {job?.likes.length}
                    </div>{" "}
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
                  <div className="mt-3">
                    <div className="text-lg font-semibold">Tags</div>
                    <div className="flex space-x-2">
                      {job.tags && job.tags.length > 0 ? (
                        <div>
                          {job.tags.slice(0, 5).map((tag, index) => (
                            <Chip
                              className="w-fit feed-chip mt-2 mr-2"
                              key={tag}
                              label={tag}
                              size="medium"
                              color="primary"
                            />
                          ))}
                          {job.tags.length > 5 &&
                            job.tags.slice(5).length > 0 && (
                              <button
                                className="text-blue-500 text-sm float-right font-semibold mt-2 focus:outline-none"
                                onClick={() => handleShowMore(job._id)}
                              >
                                {showMore[job.id]
                                  ? "Show Less"
                                  : `+${job.tags.slice(5).length} more`}
                              </button>
                            )}
                          {showMore[job._id] &&
                            job.tags
                              .slice(5)
                              .map((tag, index) => (
                                <Chip
                                  className="w-fit feed-chip mt-2 mr-2"
                                  key={tag}
                                  label={tag}
                                  size="medium"
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
                      <option value="Want to Apply">Want to Apply</option>
                    </NativeSelect>
                  </FormControl>
                </div>
              </>
            </>
          ))}
        </>
      ) : (
        <>
          <CircularProgress />
          <Card
            variant="outlined"
            sx={{
              width: "max(400px, 60%)",
              borderRadius: 0,
              "--Card-radius": 0,
            }}
            className="w-full max-w-xl mb-4"
          >
            <CardContent orientation="horizontal">
              <Skeleton variant="rectangular" width={44} height={44} />
              <div>
                <Skeleton variant="text" width={100} />
                <Skeleton level="body-sm" variant="text" width={200} />
              </div>
            </CardContent>
            <CardContent sx={{ gap: 0.5, mt: 1 }}>
              <Skeleton level="body-xs" variant="text" width="92%" />
              <Skeleton level="body-xs" variant="text" width="99%" />
              <Skeleton level="body-xs" variant="text" width="96%" />
            </CardContent>
          </Card>

          <Card
            variant="outlined"
            sx={{
              width: "max(400px, 60%)",
              borderRadius: 0,
              "--Card-radius": 0,
            }}
            className="w-full max-w-xl mb-4"
          >
            <CardContent orientation="horizontal">
              <Skeleton variant="rectangular" width={44} height={44} />
              <div>
                <Skeleton variant="text" width={100} />
                <Skeleton level="body-sm" variant="text" width={200} />
              </div>
            </CardContent>
            <CardContent sx={{ gap: 0.5, mt: 1 }}>
              <Skeleton level="body-xs" variant="text" width="92%" />
              <Skeleton level="body-xs" variant="text" width="99%" />
              <Skeleton level="body-xs" variant="text" width="96%" />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default Feed;
