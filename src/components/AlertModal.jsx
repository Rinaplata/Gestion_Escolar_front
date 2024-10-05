import React from "react";

const AlertModal = ({ isOpen, onClose, type = 'info', title, message }) => {
  const alertStyles = {
    info: 'bg-blue-100 border-t border-b border-blue-500 text-blue-700',
    success: 'bg-green-100 border-t border-b border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-t border-b border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-t border-b border-red-500 text-red-700',
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
        <div className={`${alertStyles[type]} p-4`} role="alert">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none text-2xl"
            >
              &times;
            </button>
          </div>
          <p className="mt-2 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
