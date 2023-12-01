import React, { useContext, useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Skeleton from "@mui/joy/Skeleton";
import Typography from "@mui/material/Typography";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TextField from "@mui/material/TextField";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "react-datepicker/dist/react-datepicker.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@material-ui/icons/Search";
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
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import TagIcon from "@mui/icons-material/Tag";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import AlarmIcon from "@mui/icons-material/Alarm";
import Autocomplete from "@mui/material/Autocomplete";
import PaidIcon from "@mui/icons-material/Paid";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Accordion from "@mui/material/Accordion";
import DatePicker from "react-datepicker";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const Feed = () => {
  const { currentUser } = useContext(AuthContext);

  const [jobs, setJobs] = useState(null);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [contractFilter, setContractFilter] = useState("");

  const fetchData = async () => {
    try {
      const res = await _axios.get(
        `jobs?title=${encodeURIComponent(
          titleFilter
        )}&location=${encodeURIComponent(
          selectedCountry
        )}&tags=${encodeURIComponent(tagFilter)}&contract=${encodeURIComponent(
          contractFilter
        )}`
      );
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
    getUsers();
  }, [trigger, titleFilter, selectedCountry, tagFilter, contractFilter]);

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
  const getUsers = async () => {
    try {
      const res = await _axios.get(`users/`);

      setAllUsers(res.data);
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

  ///////////////// SEARCH ///////////////////////////

  const [yearFilter, setYearFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userFilter, setUserFilter] = useState("");
  const [usernameFilter, setUsernameFilter] = useState("");
  const handleCountryChange = (event, value) => {
    setSelectedCountry(value || ""); // Set the selected country value or an empty string if no country is selected
  };
  const handleYearChange = (date) => {};
  const handleClearYear = () => {
    setYearFilter("");
  };

  const handleUserChange = (e, value) => {
    if (value) {
      setSelectedUser(value);
      setUserFilter(value.id);
      setUsernameFilter(value.username);
    } else {
      setSelectedUser(null);
      setUserFilter("");
      setUsernameFilter("");
    }
  };
  const handleTagChange = (e) => {
    setTagFilter(e.target.value);
  };
  const handleContractChange = (e) => {
    setContractFilter(e.target.value);
  };
  const handleTitleChange = (e) => {
    setTitleFilter(e.target.value);
  };

  const handleClearFilters = (e) => {
    setTitleFilter("");
    setContractFilter("");
    setTagFilter("");
    setSelectedCountry("");
  };
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data); // Log the response data
        setCountries(data.data.map((country) => country.country));
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  const saveSubscribedPreset = async () => {
    try {
      const response = await _axios.post(
        `/users/${currentUser._id}/subscribe-search`,
        {
          subscribed: [
            {
              title: titleFilter,
              tags: tagFilter,
              location: selectedCountry,
              contract: contractFilter,
            },
          ],
        }
      );
      if (response.status === 200) {
        console.log("Subscribed successfully");
        setTrigger(!trigger);
      } else {
        console.log("User not found or error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //////////////////// SEARCH END  /////////////////////

  const getGradientColors = (category) => {
    const categoryColors = {
      Technology: "from-blue-100 to-green-100",
      Education: "from-purple-300 to-purple-100",
      Marketing: "from-red-300 to-blue-50",
      Design: "from-green-300 to-green-100",
      Healthcare: "from-orange-300 to-orange-100",
      Finance: "from-yellow-300 to-yellow-100",
      Sales: "from-turquoise-300 to-turquoise-100",
      Writing: "from-maroon-300 to-maroon-100",
      Engineering: "from-teal-300 to-teal-100",
      CustomerService: "from-rust-300 to-rust-100",
      Administration: "from-gray-300 to-gray-100",
      Science: "from-emerald-300 to-emerald-100",
      Arts: "from-violet-300 to-violet-100",
      HumanResources: "from-darkblue-300 to-darkblue-100",
      Hospitality: "from-goldenrod-300 to-goldenrod-100",
      Legal: "from-steelgray-300 to-steelgray-100",
    };

    return categoryColors[category] || "from-blue-50 to-gray-50"; // Default to gray if category not found
  };

  const [searchChipToggles, setSearchChipToggles] = useState({
    contract: false,
    country: false,
    tags: false,
  });

  const chipSearch = (filter, label) => {
    if (searchChipToggles[filter]) {
      switch (filter) {
        case "contract":
          setContractFilter("");
          break;
        case "country":
          setSelectedCountry("");
          break;
        case "tags":
          setTagFilter("");
          break;
        default:
          break;
      }
    } else {
      switch (filter) {
        case "contract":
          setContractFilter(label);
          break;
        case "country":
          setSelectedCountry(label);
          break;
        case "tags":
          setTagFilter(label);
          break;
        default:
          break;
      }
    }

    setSearchChipToggles((prevToggles) => ({
      ...prevToggles,
      [filter]: !prevToggles[filter],
    }));
  };

  return (
    <div className="flex flex-col items-center h-full bg-slate-100">
      <div className="text-2xl mb-4"></div>
      <div>
        <Accordion
          sx={{ backgroundColor: "transparent", boxShadow: "none", margin: 0 }}
          className="w-fit"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            className="w-fit"
          >
            <SearchIcon fontSize="large" className="hover:text-green-600" />
          </AccordionSummary>
          <AccordionDetails className="bg-white p-6 w-full rounded-lg shadow-xl border-solid border-black">
            Search Still under Development
            <div className="flex items-center">
              <div className="relative mr-4">
                <input
                  type="text"
                  className="pl-8 pr-3 py-2 w-72 border rounded-md"
                  placeholder="Search by title"
                  value={titleFilter}
                  onChange={handleTitleChange}
                />
                <SearchIcon className="w-4 h-4 absolute top-3 left-2 text-gray-400" />
              </div>

              <div className="relative mr-4">
                <input
                  type="text"
                  className="pl-8 pr-3 py-2 w-72 border rounded-md"
                  placeholder="Search by tags"
                  value={tagFilter}
                  onChange={handleTagChange}
                />
                <TagIcon className="w-4 h-4 absolute top-3 left-2 text-gray-400" />
              </div>
            </div>
            <div className="mb-4 mt-8 flex">
              <div className="flex items-center mr-16 ">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={countries}
                  sx={{ width: 250 }}
                  className="bg-white mt-2"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Countries" />
                  )}
                />
              </div>
              <div>
                <label
                  htmlFor="jobPosition"
                  className="block font-semibold mb-2"
                >
                  Contract Type
                </label>
                <select
                  name="contract"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={contractFilter}
                  required
                  onChange={handleContractChange}
                >
                  <option value="" disabled>
                    search by Contract Type
                  </option>
                  <option value="">none</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Permanent Contract">Permanent Contract</option>
                  <option value="Fixed-term">Fixed-term</option>
                  <option value="Zero hour contract">Zero hour contract</option>
                  <option value="Casual contract">Casual contract</option>
                  <option value="Permanent contract">Permanent contract</option>
                  <option value="Freelance contract">Freelance contract</option>
                  <option value="Implied contracts">Implied contracts</option>
                  <option value="Agency contracts">Agency contracts</option>
                  <option value="Agency staff">Agency staff</option>
                  <option value="Oral contracts">Oral contracts</option>
                  <option value="Consulting agreement">
                    Consulting agreement
                  </option>
                  <option value="Employing family">Employing family</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Severance agreements">
                    Severance agreements
                  </option>
                </select>
              </div>
            </div>
            <button
              onClick={handleClearFilters}
              className=" px-4 py-2 mt-2 mr-5 bg-red-800 text-white transition-colors duration-200 transform rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-300"
            >
              Clear Search
            </button>
            <button
              onClick={saveSubscribedPreset}
              className=" px-4 py-2 mt-2 bg-blue-950 text-white transition-colors duration-200 transform rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-300"
            >
              Save Preset
            </button>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="w-2/4 flex flex-row justify-between">
        <Chip
          className="w-fit feed-chip mt-2 mr-2"
          label="Full Time"
          variant={`${searchChipToggles.contract ? "filled" : "outlined"}`}
          size="medium"
          color="success"
          onClick={() => chipSearch("contract", "Full Time")}
        />

        <Chip
          className="w-fit feed-chip mt-2 mr-2"
          label="Turkey"
          variant={`${searchChipToggles.country ? "filled" : "outlined"}`}
          size="medium"
          color="success"
          onClick={() => chipSearch("country", "Turkey")}
        />

        <Chip
          className="w-fit feed-chip mt-2 mr-2"
          label="Junior"
          variant={`${searchChipToggles.tags ? "filled" : "outlined"}`}
          size="medium"
          color="success"
          onClick={() => chipSearch("tags", "Junior")}
        />
      </div>

      {jobs ? (
        <>
          {jobs.map((job) => (
            <>
              <>
                {" "}
                <div
                  className={`transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl mb-10 bg-gradient-to-b h-full text-gray-900 ${getGradientColors(
                    job.category
                  )}  p-6 rounded-lg shadow-xl w-1/2 max-w-xl mx-auto mt-8 border-solid border-black`}
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    borderRadius: "16px", // Adjust the value for the desired border radius
                  }}
                >
                  {" "}
                  <Link to={`/job/${job._id}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-3/5">
                        <h1 className="text-3xl font-medium">{job?.title}</h1>
                      </div>
                      <div className="flex items-center space-x-2 w-2/5">
                        <img
                          src={
                            job?.user?.[0].profileImage ||
                            "https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg"
                          }
                          alt="User Avatar"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                        <p className="text-sm">
                          {job?.user?.[0]?.company || "Unknown"}
                          <br />
                          <p className="text-xs">
                            Posted by : {job?.user?.[0]?.username || "Unknown"}
                          </p>
                        </p>
                      </div>
                    </div>
                    <div className="text-base font-medium mb-2">
                      {job?.contract} - {job?.position}
                    </div>
                    <div
                      className="mb-4 text-base text-black"
                      dangerouslySetInnerHTML={{
                        __html: job.description.slice(0, 90) + "...",
                      }}
                    ></div>
                    <div className="flex text-sm items-center space-x-2">
                      <PaidIcon className="text-green-800 mr-1" />
                      {job.salary === "other"
                        ? job.specificSalary + " $/year"
                        : job.salary}
                    </div>
                  </Link>
                  <div className="flex flex-wrap items-center space-x-4">
                    <div className="flex text-sm items-center space-x-2">
                      <LocationOnIcon />
                      {job?.location}
                    </div>
                    <div
                      className="flex text-sm items-center space-x-2 "
                      style={{ textShadow: "0 0 5px white" }}
                    >
                      <AccessTimeIcon className="mr-1" />
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
                              className=" cursor-pointer hover:text-red-800 text-blue-800 mr-1"
                            />
                          </>
                        ) : (
                          <>
                            <ThumbUpOffAlt
                              fontSize="large"
                              onClick={() => likeJob(job._id)}
                              className=" cursor-pointer hover:text-blue-800 text-blue-500"
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
                    <div className="flex text-sm items-center space-x-2">
                      <AlarmIcon className="text-red-800 mr-1" />
                      {job?.deadline}
                    </div>
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
