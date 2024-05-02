import React, { useRef } from "react";

const InteractiveModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
      onClick={handleOutsideClick}
    >
      <div
        ref={modalRef}
        className="relative p-8 bg-white w-full max-w-md m-auto rounded-lg shadow-lg"
      >
        <button
          className="absolute top-0 right-0 m-3 text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default InteractiveModal;
