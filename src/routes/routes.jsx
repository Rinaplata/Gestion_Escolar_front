// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../api/Home';
import  Login  from '../api/Login'
import  {Signup}  from '../api/Signup'
import { AdminLayout } from '../components/AdminLayout';
import UserStudents from '../components/students/UserStudents'
import GradesStudents from '../components/students/GradesStudents'
import ScheduleAssignment from '../components/students/ScheduleAssignment'
/* import Report from '../components/students/Report' */


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/adminLayout" element={<AdminLayout />}>
              <Route path="students" element={<UserStudents />} />
              <Route path="grades" element={<GradesStudents />} />
              <Route path="schedule" element={<ScheduleAssignment />} />
{/*               <Route path="report" element={<Report />} />
 */}            {/* Puedes agregar más rutas hijas aquí */}
            </Route>
        </Routes>
    );
};

export default AppRoutes;
