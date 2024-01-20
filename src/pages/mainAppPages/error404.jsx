import { motion } from "framer-motion";

const error404 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-[85vh] bg"
    >
      <span className="font-black text-6xl md:text-9xl text-primary">404</span>
      <span className="text-sm font-medium text-neutral-700">
        Sorry, Page not found
      </span>
      <button
        className="bg-primary py-2 md:mt-7 mt-5 px-3 md:px-5 rounded-lg text-xs md:text-sm transition-all duration-300 ease-in-out  text-white  hover:bg-white hover:text-primary hover:border-primary border border-primary"
        onClick={() => window.location.replace("/")}
      >
        Go back home
      </button>
    </motion.div>
  );
};

export default error404;
