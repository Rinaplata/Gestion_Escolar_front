// src/routes/index.js
import { Routes, Route } from "react-router-dom";
import { Home } from "../api/Home";
import Login from "../api/Login";
import { Signup } from "../api/Signup";
import { AdminLayout } from "../components/AdminLayout";
import UserStudents from "../components/students/UserStudents";
import GradesStudents from "../components/students/GradesStudents";
import ScheduleAssignment from "../components/students/ScheduleAssignment";
import CourseManagement from "../components/courses/Courses";
import UsersTeachers from "../components/teachers/UsersTeachers";
import { Unauthorized } from "../components/Unauthorized";
import { ProtectedRoute } from "../components/security/ProtectedRoute";
// import StudentReport from '../components/students/Report'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/menu"
        element={
          <ProtectedRoute requiredRole={[1, 2]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route
          path="students"
          element={
            <ProtectedRoute requiredRole={[1, 2]}>
              <UserStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="grades"
          element={
            <ProtectedRoute requiredRole={[1]}>
              <GradesStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="schedule"
          element={
            <ProtectedRoute requiredRole={[1]}>
              <ScheduleAssignment />
            </ProtectedRoute>
          }
        />
        <Route
          path="courses"
          element={
            <ProtectedRoute requiredRole={[1]}>
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="teachers"
          element={
            <ProtectedRoute requiredRole={[1]}>
              <UsersTeachers />
            </ProtectedRoute>
          }
        />
        {/* <Route path="report" element={<Report />} /> */}
        {/* Puedes agregar más rutas hijas aquí */}
      </Route>
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  );
};

export default AppRoutes;
