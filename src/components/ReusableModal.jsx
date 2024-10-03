import React from "react";

const ReusableModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-full max-w-2xl p-8 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out scale-100 sm:scale-105">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl">
            &times;
          </button>
        </div>
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
};

export default ReusableModal;
