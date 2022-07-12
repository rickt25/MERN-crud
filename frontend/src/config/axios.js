import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'http://localhost:5001/',
  headers: {
    'Content-Type': 'application/json'
  }
});

const refreshAccessToken = async () => {
  try{
    const response = await axiosApi.get("token");
    return response;
  }catch(error){
    console.log("error nich: " + error);
  }
}

axiosApi.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
    }
    return config;
  },
  error => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => {
    return response
  }, async function (error) {
  const originalRequest = error.config;
  if (error.response.status === 403 && !originalRequest._retry) {
    console.log("retrying");
    originalRequest._retry = true;
    const access_token = await refreshAccessToken();
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    return axiosApi(originalRequest);
  }
  if(error.response.status === 401){
    localStorage.clear();
    window.location.href = "/";
  }
  return Promise.reject(error);
});

export default axiosApi;