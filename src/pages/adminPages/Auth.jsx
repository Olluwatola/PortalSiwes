import { useState, useEffect } from "react";
import LoginForm from "./../../components/adminComponents/LoginForm";
import AdminStatusBar from "../../components/adminComponents/adminStatusBar/AdminStatusBar";
import SplashScreen from "../../components/adminComponents/SplashScreen";
import { AnimatePresence, motion } from "framer-motion";
import Welcome from "../../assets/welcome.svg";
import Modal from "../../components/adminComponents/adminModals/Modal";

function Admin() {
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  const [resetActive, setResetActive] = useState(false);
  const [splashScreen, setSplashScreen] = useState(true);
  const [year, setYear] = useState();

  const [modalTitle, setModalTitle] = useState(null);
  const [modalMessage, setModalMessage] = useState(null);

  const hideSplashScreen = () => {
    setTimeout(() => {
      setSplashScreen(false);
    }, 2000);
  };

  useEffect(() => {
    hideSplashScreen();
    getYear();
  }, []);

  const getYear = () => {
    setYear(new Date().getFullYear());
  };

  const closeModal = () => {
    setModalTitle(null);
    setModalMessage(null);
  };

  return (
    <>
      <Modal
        title={modalTitle}
        message={modalMessage}
        closeModal={closeModal}
      />
      <AnimatePresence>{splashScreen && <SplashScreen />}</AnimatePresence>
      <AdminStatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
        setStatusBarMessage={setStatusBarMessage}
      />
      <div className="w-screen h-screen flex">
        <div className="w-[43%] h-screen bg-primary flex flex-col px-12 py-8 justify-between">
          <span className="font-secondary -tracking-wider md:text-xl text-white text-xl flex">
            IT
            <div className="font-primary -rotate-45 font-semibold">e</div>
            Ms
          </span>
          <div className="w-full h-[75%] flex">
            <img
              src={Welcome}
              className={`${resetActive ? "opacity-0" : ""}
              w-full h-full object-contain transition-all duration-300 ease-in-out`}
            />
          </div>
          <div className="text-sm text-white">
            <span className="flex items-center gap-2">
              <span>©️ {year}</span>
              <span>
                <span className="font-semibold">ITeMS</span>, University of
                Ibadan.
              </span>
            </span>
          </div>
        </div>
        <LoginForm
          setModalTitle={setModalTitle}
          setModalMessage={setModalMessage}
          setConditionGood={setConditionGood}
          setStatusBarMessage={setStatusBarMessage}
          setResetActive={setResetActive}
          resetActive={resetActive}
        />
      </div>
    </>
  );
}

export default Admin;
