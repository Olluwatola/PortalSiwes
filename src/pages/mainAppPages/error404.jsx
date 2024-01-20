import { motion } from "framer-motion";

const error404 = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="flex flex-col items-center justify-center h-[85vh]"
    >
      <span className="font-black text-9xl text-primary">404</span>
      <span className="text-sm font-medium text-neutral-700">
        Sorry, Page not found
      </span>
    </motion.div>
  );
};

export default error404;
