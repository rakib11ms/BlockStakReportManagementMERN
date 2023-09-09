import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link, Navigate, useNavigate, Routes, Route } from "react-router-dom";
import axios from 'axios';
import MasterDashboardLayout from './Components/MasterDashboardLayout';
import Dashbaord from './Page/Dashbaord';
import ViewUser from './Page/Users/ViewUser';
function App() {
  return (
    <div className="App">
          <Routes>
          <Route path='/dashboard' element={<Dashbaord/>}></Route>
          <Route path='/view-user' element={<ViewUser/>}></Route>
            </Routes>

    </div>
  );
}

export default App;
