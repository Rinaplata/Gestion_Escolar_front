// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../api/Home';
import  Login  from '../api/Login'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;
