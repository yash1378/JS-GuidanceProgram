// Modal.js
import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
      <div className="bg-white rounded-lg p-4 max-w-md w-full">
        {children}
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 absolute top-3 right-2.5"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
