import React, { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Chip } from "@mui/material";
import _axios from "../api/_axios";
import moment from "moment";
import ThumbUpOffAlt from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CircularProgress from "@mui/material/CircularProgress";

const Feed = () => {
  const [jobs, setJobs] = useState(null);

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
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="text-2xl mb-4"></div>

      {jobs ? (
        <>
          {jobs.map((job) => (
            <>
              <Card
                variant="outlined"
                sx={{
                  width: "max(400px, 60%)",
                  borderRadius: "16px", // Adjust the value for the desired border radius
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)", // Add shadow properties
                }}
                className="w-full max-w-xl mb-4 elevation-2" // Use elevation-2 for the desired elevation level
              >
                <div className="flex justify-between">
                  <span className="text-xs text-gray-500">
                    <LocationOnIcon fontSize="small" />
                    {job.location}
                  </span>
                  <span className="text-xs text-gray-500">
                    {moment(job.postdate).fromNow()}{" "}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex-grow"></div>
                  <span className="text-xs text-gray-500">
                    {job.likes.length - 1} <ThumbUpOffAlt />
                    {/*<ThumbUpIcon/>*/}
                  </span>
                </div>

                <div className="flex items-center">
                  <Avatar
                    src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
                    sx={{ width: 75, height: 75 }}
                  />
                  <span className="text-gray-700 text-sm">
                    {job?.user?.[0]?.username}
                  </span>
                </div>

                <CardContent orientation="horizontal">
                  <Typography variant="h5" gutterBottom>
                    {job.title}
                  </Typography>
                </CardContent>
                <div className="text-sm text-gray-600 ">{job.position}</div>
                <CardContent sx={{ gap: 0.5, mt: 1 }}>
                  <Typography variant="body1" gutterBottom>
                    {job.description}
                  </Typography>
                </CardContent>
                {job.tags && (
                  <div>
                    {job.tags.slice(0, 8).map((tag, index) => (
                      <Chip
                        className="w-fit feed-chip mt-2 mr-2"
                        key={tag}
                        label={tag}
                        size="small"
                      />
                    ))}
                    {job.tags.length > 6 && job.tags.slice(8).length > 0 && (
                      <button
                        className="text-blue-500 text-sm float-right font-semibold mt-2 focus:outline-none"
                        onClick={() => handleShowMore(job._id)}
                      >
                        {showMore[job.id]
                          ? "Show Less"
                          : `+${job.tags.slice(8).length} more`}
                      </button>
                    )}
                    {showMore[job._id] &&
                      job.tags
                        .slice(8)
                        .map((tag, index) => (
                          <Chip
                            className="w-fit feed-chip mt-2 mr-2"
                            key={tag}
                            label={tag}
                            size="small"
                          />
                        ))}
                  </div>
                )}
              </Card>
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
