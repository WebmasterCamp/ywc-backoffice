import axios from "axios";
import qs from "qs";

import {API_ENDPOINT} from "../config";

const localStorage = window.localStorage;

// request data
export const fetch = async (route, data, method = "GET") => {
  const authOptions = {
    method: method,
    url: `${API_ENDPOINT}/${route}`,
    data: qs.stringify(data),
  };
  // do http request
  return axios(authOptions).then(res => res.data);
};

// request data from token in localStorage
export const fetchWithToken = async (route, data, method = "POST", token) => {
  const authOptions = {
    method: method,
    url: `${API_ENDPOINT}/${route}`,
    data: qs.stringify(data),
    headers: {
      "x-access-token": token || localStorage.getItem("token"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    json: true,
  };
  // do http request
  try {
    const response = await axios(authOptions).then(res => res.data);
    // check error, if error = true and message = invalid access token
    // remove token from localStorage
    if (response.error && response.message === "Authentication Error") {
      localStorage.removeItem("token");
    }
    // return response data
    return response;
  } catch (e) {
    return e;
  }
};
