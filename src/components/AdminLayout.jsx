// AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; 
import {Navbar} from './Navbar';

export const AdminLayout = () => {
  const handleLogout = () => {
    console.log('Cerrar sesión');
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Navbar isAdmin={true} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Contenido Principal */}
        <main className="flex-1 bg-gray-100 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
