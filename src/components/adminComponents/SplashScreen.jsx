import { motion } from "framer-motion";

const SplashScreen = () => {
  return (
    <motion.div
      transition={{ duration: 0.5 }}
      exit={{ opacity: 0 }}
      className="w-screen h-screen flex items-center justify-center absolute bg-white text-primary"
    >
      <motion.span
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        exit={{ opacity: 0, x: -200 }}
        className="font-secondary -tracking-wider md:text-3xl text-xl flex"
      >
        IT
        <div className="font-primary -rotate-45 font-semibold">e</div>
        Ms
      </motion.span>
    </motion.div>
  );
};

export default SplashScreen;
