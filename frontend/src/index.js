import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

const root = ReactDOM.createRoot(document.getElementById('root'));


// axios.defaults.baseURL = 'http://localhost:9000/';

// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';

// const [refreshTokenRender, setRefreshTokenRender] = useState('');
// console.log('check',refreshTokenRender);


// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (config) {
//   // console.log('hello',config)
//   const token = localStorage.getItem('accessToken');
//   config.headers.Authorization = token ? `Bearer ${token}` : '';

//   return config;
// }, null, { synchronous: true });




// useEffect(() => {
//   async function post() {
//     try {
//       const response = await axios.post('/api/refresh-token');

//       // Update the access token in your application state or local storage
//       const { accessToken } = response.data;
//       localStorage.setItem('accessToken', accessToken);

//       // Return the new access token
//       return accessToken;
//     } catch (error) {
//       console.error('Error refreshing access token:', error);
//       throw error;
//     }
//   }
//   post();
// }, [refreshTokenRender])



// axios.interceptors.response.use((response) => {
//   return response;

//   console.log('hello2', response)
// }, (error) => {
//   console.log('Response error:', error.response.status);
//   if (error.response.status == 401) {
//     setRefreshTokenRender(res.data)
//   }

// })





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
