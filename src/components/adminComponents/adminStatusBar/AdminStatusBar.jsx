import { useState, useEffect } from "react";

const AdminStatusBar = ({ conditionGood, statusBarMessage }) => {
  const [showStatusBar, setShowStatusBar] = useState(false);

  useEffect(() => {
    if (statusBarMessage) {
      setShowStatusBar(true);

      const timer = setTimeout(() => {
        setShowStatusBar(false);
      }, 10000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [statusBarMessage]);

  const statusBarStyle = {
    backgroundColor:
      conditionGood === "good"
        ? "green"
        : conditionGood === "loading"
        ? "coral"
        : conditionGood === "error"
        ? "red"
        : "blue",
  };

  return showStatusBar ? (
    <div style={statusBarStyle}>{statusBarMessage}</div>
  ) : null;
};

export default AdminStatusBar;
