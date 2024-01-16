import { useState, useEffect } from "react";
import LoginForm from "./../../components/adminComponents/LoginForm";
import StatusBar from "../../components/adminComponents/adminStatusBar/AdminStatusBar";
import SplashScreen from "../../components/adminComponents/SplashScreen";
import { AnimatePresence } from "framer-motion";

function Admin() {
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  const [splashScreen, setSplashScreen] = useState(true);

  const hideSplashScreen = () => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 2000);
  };

  useEffect(() => {
    hideSplashScreen();
  }, []);

  return (
    <>
      <AnimatePresence>{splashScreen && <SplashScreen />}</AnimatePresence>
      <StatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      <LoginForm
        setConditionGood={setConditionGood}
        setStatusBarMessage={setStatusBarMessage}
      />
    </>
  );
}

export default Admin;
