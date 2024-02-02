import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Auth } from "./../../components/mainAppComponents/Auth";
import { auth } from "./../../config/firebase";
import { useEffect } from "react";
import { ApplicationForm } from "./../../components/mainAppComponents/ApplicationForm";
import { Testimonials } from "./../../components/mainAppComponents/Testimonials";
import AdminStatusBar from "../../components/adminComponents/adminStatusBar/AdminStatusBar";
import slidea from "../../assets/slide1.svg";
import slideb from "../../assets/slide2.svg";
import FormSuccessModal from "../../components/mainAppComponents/FormSuccessModal";

const Home = ({ applyModal, setapplyModal }) => {
  const [studentEmail, setStudentEmail] = useState("");
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);

  useEffect(() => {
    async function loadEmailToEmailState() {
      if (auth.currentUser.email) {
        setStudentEmail(auth.currentUser.email);
      }
    }
    loadEmailToEmailState();
  });

  return (
    <div className="py-20 bg-primary h-screen md:px-16 px-6 bg overflow-hidden 2xl:container 2xl:mx-auto">
      <AdminStatusBar
        conditionGood={conditionGood}
        setStatusBarMessage={setStatusBarMessage}
        statusBarMessage={statusBarMessage}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex w-full md:justify-between justify-center h-[85vh] md:h-auto items-start md:items-center md:py-4 py-7"
      >
        <div className="md:w-1/2 w-full flex flex-col gap-3 md:gap-7 text-white">
          <AnimatePresence>
            {applyModal ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-start text-start"
              >
                <span className="md:text-[3.7rem] text-3xl md:leading-[4.2rem] tracking-tight md:tracking-tighter">
                  Discover your path <br /> to success as an
                  <div className="flex items-baseline gap-4">
                    intern at
                    <span className="font-secondary md:text-5xl text-4xl flex">
                      IT
                      <div className="font-primary -rotate-45 font-semibold">
                        e
                      </div>
                      Ms
                    </span>
                  </div>
                </span>
              </motion.div>
            ) : (
              <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={10000}
                showArrows={false}
                swipeable={false}
                stopOnHover={false}
                showIndicators={false}
              >
                <div className="flex justify-start text-start">
                  <span className="md:text-[3.7rem] text-3xl md:leading-[4.2rem] tracking-tight md:tracking-tighter">
                    Welcome to the <br /> SIWES Application
                    <div className="flex items-baseline gap-3 md:gap-4">
                      Portal for
                      <span className="font-secondary md:text-5xl text-4xl flex">
                        IT
                        <div className="font-primary -rotate-45 font-semibold">
                          e
                        </div>
                        Ms
                      </span>
                    </div>
                  </span>
                </div>
                <div className="flex justify-start text-start">
                  <span className="md:text-[3.7rem] text-3xl md:leading-[4.2rem] tracking-tight md:tracking-tighter">
                    Discover your path <br /> to success as an
                    <div className="flex items-baseline gap-3 md:gap-4">
                      intern at
                      <span className="font-secondary md:text-5xl text-4xl flex">
                        IT
                        <div className="font-primary -rotate-45 font-semibold">
                          e
                        </div>
                        Ms
                      </span>
                    </div>
                  </span>
                </div>
              </Carousel>
            )}
          </AnimatePresence>
          <div className="flex flex-col gap-4">
            <span className="text-lg font-light w-3/4">
              <AnimatePresence>
                {" "}
                {applyModal ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-start text-start"
                  >
                    <span className="md:text-base text-sm">
                      Unleash your potential, shape your future
                    </span>
                  </motion.div>
                ) : (
                  <Carousel
                    showThumbs={false}
                    showStatus={false}
                    autoPlay={true}
                    infiniteLoop={true}
                    interval={10000}
                    showArrows={false}
                    swipeable={false}
                    stopOnHover={false}
                    showIndicators={false}
                  >
                    <div className="flex justify-start text-start md:text-base text-sm">
                      <span>
                        <span className="font-semibold">ITeMS -</span> The
                        Directorate for Information Technology and media
                        services of the University of Ibadan
                      </span>
                    </div>
                    <div className="flex justify-start text-start md:text-base text-sm">
                      <span>Unleash your potential, shape your future</span>
                    </div>
                  </Carousel>
                )}
              </AnimatePresence>
            </span>

            <button
              className="border md:mt-0 mt-2 outline-none border-white text-sm rounded-lg md:px-10 px-7 md:py-3 py-2 w-fit transition-all duration-300 ease-in-out hover:bg-white hover:text-primary"
              onClick={() => setapplyModal(true)}
            >
              Apply Now
            </button>
          </div>
          <Testimonials />
        </div>
        <div className="md:w-1/2 hidden md:flex items-center justify-center">
          <div className="w-[38vw] max-w-[80%]">
            {applyModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img src={slideb} alt="slide2" />
              </motion.div>
            )}
            {!applyModal && (
              <Carousel
                showThumbs={false}
                showStatus={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={10000}
                showArrows={false}
                swipeable={false}
                stopOnHover={false}
                showIndicators={false}
              >
                <div>
                  <img src={slidea} alt="slide1" />
                </div>
                <div>
                  <img src={slideb} alt="slide2" />
                </div>
              </Carousel>
            )}
          </div>
        </div>
        <div className="w-screen fixed top-0 right-0">
          <AnimatePresence>
            {applyModal && (
              <motion.div
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                exit={{ x: "100vw" }}
                transition={{ type: "spring", stiffness: 90, duration: 0.4 }}
                className="bg-white z-50 overflow-y-scroll overflow-x-hidden flex-col absolute top-0 h-[100vh] w-full md:w-1/2 right-0 items-center"
              >
                {conditionGood === "good" ? (
                  <FormSuccessModal
                    conditionGood={conditionGood}
                    setApplyModal={setapplyModal}
                    setConditionGood={setConditionGood}
                  />
                ) : (
                  <>
                    <Auth
                      setApplyModal={setapplyModal}
                      studentEmail={studentEmail}
                      setStudentEmail={setStudentEmail}
                    />
                    <ApplicationForm
                      setConditionGood={setConditionGood}
                      setStatusBarMessage={setStatusBarMessage}
                      studentEmail={studentEmail}
                      setStudentEmail={setStudentEmail}
                    />
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
