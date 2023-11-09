import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import _axios from "../api/_axios";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import moment from "moment";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import {
  Avatar,
  Chip,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
const Job = () => {
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
  }, [jobId]);
  const [showMore, setShowMore] = useState({});
  const handleShowMore = (jobId) => {
    setShowMore((prevState) => ({
      ...prevState,
      [jobId]: !prevState[jobId],
    }));
  };
  return (
    <div className="h-screen w-full bg-slate-50">
      <div className="flex items-center h-screen w-4/5 mx-auto">
      <div className="w-2/3 p-4 bg-white rounded-lg shadow-md" style={{ overflowY: "auto" }}>
  <h1 className="text-2xl font-semibold mb-16">{job.title}</h1>
  <p className="text-lg text-gray-700" dangerouslySetInnerHTML={{ __html: job.description }}></p>
</div>


        <div className="w-1/4 p-4 bg-gray-100 rounded-lg shadow-md ml-4">
          <div className="flex items-center mb-2">
            <Avatar
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              sx={{ width: 50, height: 50 }}
            />
            <span className="text-gray-700 text-sm">
              &nbsp;&nbsp;{job?.user?.[0]?.username || "Unknown"}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Posted on: {moment(job.postdate).format("MMMM DD, YYYY")}
          </p>
          <p className="text-lg text-blue-600 font-semibold mb-4">
            0{job?.likes?.length} Likes
          </p>
          <p className="text-lg mb-2 text-gray-700">Location: {job.location}</p>
          {job.tags && job.tags.length > 0 ? (
            <>
              {job?.tags?.map((tag, index) => (
                <Chip
                  className="w-fit feed-chip mt-2 mr-2"
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
      </div>
    </div>
  );
};
export default Job;
