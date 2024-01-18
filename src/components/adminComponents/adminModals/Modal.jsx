import React, { useEffect } from "react";
import success from "../../../assets/success.svg";
import ConfettiExplosion from "react-confetti-explosion";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ title, message, closeModal }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      closeModal();
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [closeModal]);

  return (
    <AnimatePresence>
      {title && message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-screen h-screen bg-black bg-opacity-40 absolute flex items-center justify-center z-10 cursor-pointer"
        >
          <div className="shadow-md border border-neutral-300 rounded-lg md:p-10 md:w-[30vw] w-[80vw] h-[80vw] md:h-[30vw] absolute bg-white flex flex-col justify-center items-center gap-3 z-20">
            <div className="w-full absolute h-full flex justify-center z-30">
              <ConfettiExplosion
                force={0.7}
                duration={4000}
                particleCount={300}
                width={700}
                height={800}
                colors={["#0071BC", "#DBE5FF", "#8A8A8A"]}
                zIndex={100}
              />
            </div>
            <img src={success} alt="success" className="md:w-48 w-32" />
            <span className="font-medium text-lg text-center md:text-xl">
              {title}
            </span>
            <span className="font-normal text-center text-[0.8rem]">
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
