import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-gray-100 bg-opacity-70 rounded-lg pl-5 pr-12 py-5">
      <div
        className="flex gap-10 items-center cursor-pointer"
        onClick={handleAccordionToggle}
      >
        <div className="transform transition-transform">
          <FiChevronDown
            className={`text-xl transition-all duration-300 ease-in-out
          ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}
          `}
          />
        </div>
        <div className="text-darkBlue">{question}</div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
          
          className="pl-[3.75rem] mt-3">
            <div className="text-gray-700 text-sm font-light">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
