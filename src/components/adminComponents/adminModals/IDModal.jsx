import React, { useEffect, useRef, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css"; // Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

const IDModal = ({ imageUrl, onClose }) => {
  const modalRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [onClose]);

  const openInNewTab = () => {
    window.open(imageUrl, "_blank");
  };

  const handleImageLoaded = () => {
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm bg-gray-800 bg-opacity-50">
      <div className="overflow-hidden" ref={modalRef}>
        {loading && (
          <Skeleton
            width={"90vw"}
            height={"90vh"}
            style={{ maxWidth: "30vw", maxHeight: "90vh" }}
          />
        )}
        <img
          onClick={openInNewTab}
          src={imageUrl}
          alt="modal"
          style={{
            display: loading ? "none" : "block",
            maxWidth: "90vw",
            maxHeight: "90vh",
          }}
          className="cursor-zoom-in"
          onLoad={handleImageLoaded}
        />
      </div>
    </div>
  );
};

export default IDModal;
