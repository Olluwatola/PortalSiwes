import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Accordion = ({ question, answer, isOpen, handleAccordionToggle }) => {
  return (
    <div className="bg-gray-100 bg-opacity-70 rounded-lg px-4 md:pl-5 md:pr-12 py-5">
      <div
        className="flex md:gap-10 gap-4 items-center cursor-pointer"
        onClick={handleAccordionToggle}
      >
        <div className="transform transition-transform">
          <FiChevronDown
            className={`md:text-xl transition-all duration-300 ease-in-out
          ${isOpen ? "rotate-180 text-primary" : "text-gray-400"}
          `}
          />
        </div>
        <div className="text-darkBlue md:text-base text-sm">{question}</div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="pl-[3.75rem] mt-3"
          >
            <div className="text-gray-700 md:text-sm text-xs font-light">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
