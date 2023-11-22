import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const AdminStatusBar = ({
  conditionGood,
  statusBarMessage,
  setStatusBarMessage,
}) => {
  const [showStatusBar, setShowStatusBar] = useState(false);

  useEffect(() => {
    if (statusBarMessage) {
      setShowStatusBar(true);

      const timer = setTimeout(() => {
        setStatusBarMessage(null);
        setShowStatusBar(false);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [statusBarMessage]);

  return (
    <AnimatePresence>
      {showStatusBar && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            ${conditionGood === "good" ? "bg-green-500" : ""}
            ${conditionGood === "loading" ? "bg-yellow-500" : ""}
            ${conditionGood === "error" ? "bg-red-500" : ""}
            ${conditionGood === "info" ? "bg-blue-500" : ""}
            text-white text-sm text-center py-1 px-4 w-full fixed top-0 left-0 z-50
          `}
        >
          {statusBarMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdminStatusBar;
