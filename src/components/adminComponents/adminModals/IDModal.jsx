import React from "react";

const IDModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <img
          src={imageUrl}
          alt="modal"
          style={{ maxWidth: "90vw", maxHeight: "90vh" }}
        />
        <button
          className="bg-primary text-white px-4 py-2 rounded-lg mt-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default IDModal;
