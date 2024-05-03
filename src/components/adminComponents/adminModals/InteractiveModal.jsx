import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCloseCircleOutline } from "react-icons/io5";

const InteractiveModal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef();

  // seems unnecessary
  // const handleOutsideClick = (e) => {
  //   if (modalRef.current && !modalRef.current.contains(e.target)) {
  //     onClose();
  //   }
  // };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-30 backdrop-blur-sm items-center justify-center flex"
          // onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="relative p-8 max-h-[90%] overflow-y-auto bg-white w-[30rem] rounded-xl shadow-lg"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <button
              className="absolute top-5 right-5 focus:outline-none rounded-full flex items-center justify-center w-9 h-9 text-xl bg-red-100 text-red-600"
              onClick={onClose}
            >
              <IoCloseCircleOutline />
            </button>
            <div className="mt-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InteractiveModal;
