// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../api/Home';
import  Login  from '../api/Login'
import  {Signup}  from '../api/Signup'
import { AdminLayout } from '../components/AdminLayout';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adminLayout" element={<AdminLayout />} />
        </Routes>
    );
};

export default AppRoutes;
