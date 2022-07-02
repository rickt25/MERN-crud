import axios from "axios";

const axiosApi = axios.create({
  baseURL: 'http://localhost:5001/'
});

// instance.interceptors.request.use(
//   config => {
//     if (!config.headers.Authorization) {
//       const user = JSON.parse(localStorage.getItem("user"));
//       if (user.token) {
//         config.headers.Authorization = `Bearer ${user.token}`;
//       }
//     }

//     return config;
//   },
//   error => Promise.reject(error)
// );

// instance.interceptors.response.use(
//   (response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();            
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });

export default axiosApi;