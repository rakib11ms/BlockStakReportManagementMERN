import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));


axios.defaults.baseURL = 'http://localhost:9000/';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
// axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
}, null, { synchronous: true });


// Function to refresh the access token
// async function refreshAccessToken() {
//   try {
//     // Make a request to your server to refresh the access token
//     const response = await axios.post('/api/refresh-token');
    
//     // Update the access token in your application state or local storage
//     const { accessToken } = response.data;
//     localStorage.setItem('accessToken', accessToken);

//     // Return the new access token
//     return accessToken;
//   } catch (error) {
//     console.error('Error refreshing access token:', error);
//     throw error;
//   }
// }

// // Axios interceptor to handle token expiration and refresh the token
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error status is 401 (Unauthorized) and the request is not a token refresh request
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         // Refresh the access token
//         const newAccessToken = await refreshAccessToken();
        
//         // Update the request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
//         // Retry the original request
//         return axios(originalRequest);
//       } catch (refreshError) {
//         // Handle refresh token error (e.g., redirect to login)
//         console.error('Error refreshing access token:', refreshError);
//         // You can handle the error here, e.g., redirect to login page
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // Set up a timer to periodically refresh the access token
// const refreshTokenInterval = setInterval(async () => {
//   try {
//     await refreshAccessToken();
//     console.log('Access token refreshed');
//   } catch (error) {
//     console.error('Error refreshing access token:', error);
//   }
// }, 10000); // Refresh the token every 60 seconds (adjust as needed)




root.render(
  <React.StrictMode>
    <BrowserRouter>

      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
