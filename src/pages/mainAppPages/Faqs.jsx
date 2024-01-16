import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import FaqForm from "./../../components/mainAppComponents/FaqForm";
import Accordion from "./../../components/mainAppComponents/Accordion";
import AdminStatusBar from "../../components/adminComponents/adminStatusBar/AdminStatusBar";
import { getFaqs } from "../../controllers/fetchMainAppDetails";
import { motion, AnimatePresence } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";
import faq from "../../assets/faq.svg";

function Faq() {
  const [faqArray, setFaqArray] = useState([]);
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleAccordionToggle = (index) => {
    setIsOpen((prevIndex) => (prevIndex === index ? null : index));
  };

  // const getFaqs = async () => {
  //   try {
  //     const faqAskedQuestionRef = collection(db, "faqs");
  //     const data = await getDocs(faqAskedQuestionRef);
  //     const mappedFaqs = data.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setFaqArray(mappedFaqs);
  //     console.log(mappedFaqs);
  //   } catch (error) {

  //   }
  // };

  useEffect(() => {
    getFaqs(setFaqArray, setConditionGood, setStatusBarMessage);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="md:py-36 pt-20 pb-5 gap-5 bg md:gap-7 md:px-16 px-6 flex flex-col "
    >
      <AdminStatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      <div className="flex md:flex-row flex-col justify-between">
        <div className="flex flex-col gap-2 md:gap-4 text-darkBlue">
          <span className="font-medium text-4xl md:text-6xl -tracking-widest">
            Frequently <br />
            asked Questions
          </span>
          <span className="tracking-tighter">
            Still Need help? Click the button below
          </span>
          <Link to="/contactus" className="bg-primary w-fit hover:bg-transparent border md:mt-5 text-xs mt-2 md:text-sm text-white md:px-7 px-4 md:py-3.5 py-2 hover:text-primary rounded-lg border-primary transition-all ease-in-out duration-300">
            I have a Question
          </Link>
          <img src={faq} alt="faq" className="md:w-full w-3/4 self-center" />
        </div>
        <div className="flex flex-col md:gap-5 gap-3 md:w-1/2">
          <AnimatePresence>
            {faqArray.length > 0 ? (
              faqArray.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Accordion
                    question={faq.question}
                    answer={faq.answer}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen === index}
                    handleAccordionToggle={() => handleAccordionToggle(index)}
                  />
                </motion.div>
              ))
            ) : (
              <Skeleton count={6} className="h-20 rounded-lg md:mb-5 mb-3" />
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col md:gap-5 gap-1 items-center mt-16 text-darkBlue">
        <span className="font-medium text-lg tracking-tighter md:text-5xl md:mb-2 md:-tracking-[0.25rem] text-center md:leading-[3.5rem]">
          Ready to Kickstart Your IT Journey? <br /> Apply Now for the
          Internship Program!
        </span>
        <span className="md:text-base text-sm md:mb-0 mb-3">
          Click the button below to apply
        </span>
        <Link to="/" className="bg-primary w-fit md:text-sm hover:bg-transparent border text-xs text-white md:px-7 px-4 md:py-3.5 py-2 hover:text-primary rounded-lg border-primary transition-all ease-in-out duration-300">
          Apply Now!
        </Link>
      </div>
      {/* <FaqForm /> */}
    </motion.div>
  );
}

export default Faq;
