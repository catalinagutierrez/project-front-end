import axios from "axios";

let count = 0;

let axiosInstance = axios.create({
  baseURL: `https://api.petfinder.com/v2/`,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

// Request interceptor gets executed before every request
axiosInstance.interceptors.request.use(
  async (config) => {
    // do not execute interceptor body if the request comes from refreshToken
    if (config.url === "oauth2/token") {
      return config;
    }

    let token = JSON.parse(localStorage.getItem("token"));

    //if current token doesn't exist, get a new one
    if (!token) {
      token = await refreshToken();
    }

    config.headers[
      "Authorization"
    ] = `${token.token_type} ${token.access_token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor get executed whenever a response comes in
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);

    // if it was unauthorized, try refreshing the token again
    // mark the retry to avoid infinite loops
    await refreshToken();

    return Promise.reject(error);
  }
);

// returns a promise that gets the bearer token
const refreshToken = async () => {
  const token = await axiosInstance.post(
    "oauth2/token",
    `grant_type=client_credentials&client_id=${process.env.REACT_APP_API_KEY}&client_secret=${process.env.REACT_APP_API_SECRET}`
  );
  localStorage.setItem("token", JSON.stringify(token.data));
};

const getPetData = async (params) => {
  return axiosInstance.get("animals", {
    params: {
      type: `${params.type}`,
      age: `${params.age}`,
    },
  });
};

const PetService = {
  getPetData,
};

export default PetService;

// source https://www.bezkoder.com/axios-interceptors-refresh-token/
