import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

export function Dropdown({
  options,
  onSelect,
  initialValue,
  id,
  onClickOutside,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const dropdownRef = useRef(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
      if (onClickOutside) onClickOutside();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        id={id}
        className={`${
          selectedOption ===
            "e.g. Training and Research Development Building" ||
          selectedOption === "Select your level" ||
          selectedOption === "Select duration"
            ? "text-neutral-400"
            : "text-black"
        } w-full md:text-sm text-xs border border-gray-300 whitespace-nowrap justify-between md:px-4 px-2 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption}
        <FiChevronDown
          className={`${
            isOpen
              ? "transform rotate-180 transition-all duration-300 ease-in-out"
              : "transform rotate-0 transition-all duration-300 ease-in-out"
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 top-full left-0 mt-1 bg-white shadow-md border border-gray-300 rounded-lg w-full"
          >
            {options.map((option, index) => (
              <motion.div
                key={index}
                onClick={() => handleOptionSelect(option.name)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="cursor-pointer px-4 py-3 hover:bg-gray-100 border-b-2 border-gray-300 border-opacity-30"
              >
                {option.name}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
