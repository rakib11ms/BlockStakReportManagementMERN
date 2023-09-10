import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect} from 'react';
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import axios from 'axios';
import MasterDashboardLayout from './Components/MasterDashboardLayout';
import Dashbaord from './Page/Dashbaord';
import ViewUser from './Page/Users/ViewUser';
import Login from './Page/Login/Login';
import Register from './Page/Register/Register';
function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    // Load access token and refresh token from local storage if available
    const storedAccessToken = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');
    if (storedAccessToken) setAccessToken(storedAccessToken);
    if (storedRefreshToken) setRefreshToken(storedRefreshToken);
  }, []);

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      // Store access token and refresh token in local storage
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setAccessToken(response.data.accessToken);
      setRefreshToken(response.data.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };






  return (
    <div className="App">
      <Routes>
        <Route path='/dashboard' element={<Dashbaord />}></Route>
        <Route path='/view-user' element={<ViewUser />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>

    </div>
  );
}

export default App;
