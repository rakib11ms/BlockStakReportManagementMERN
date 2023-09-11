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

// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('auth_token');
//   config.headers.Authorization = token ? `Bearer ${token}` : '';

//   return config;
// }, null, { synchronous: true });


// Function to refresh the access token using the refresh token
const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      // Handle the case where there is no refresh token
      throw new Error('No refresh token available');
    }

    // Make an API request to refresh the access token
    const response = await axios.post('/refresh-token-endpoint', {
      refreshToken: refreshToken,
    });

    // Store the new access token
    const newAccessToken = response.data.access_token;
    localStorage.setItem('auth_token', newAccessToken);

    // Retry the original request with the new access token
    const originalRequest = response.config;
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return axios(originalRequest);
  } catch (error) {
    // Handle errors related to token refresh
    // For example, you might want to log the user out or show an error message
    console.error('Token refresh failed:', error);
    throw error;
  }
};




// Axios interceptor to add the access token to requests
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Axios interceptor to handle token expiration and refresh
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');

    if (error.response.status === 401 && !originalRequest._retry && refreshToken) {
      originalRequest._retry = true;
      try {
        const newResponse = await refreshToken();
        return newResponse;
      } catch (refreshError) {
        // Handle the case where token refresh fails
        // You might want to log the user out or show an error message
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);











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
