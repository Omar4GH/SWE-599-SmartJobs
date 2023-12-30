import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_URL

let config = {
  baseURL: baseURL,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(function (config) {
 
  return config;
});

export default _axios;