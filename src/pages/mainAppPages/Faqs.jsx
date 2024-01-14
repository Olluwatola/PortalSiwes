import { useState, useEffect } from "react";
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
      className="md:py-36 py-20 gap-5 md:gap-7 md:px-16 px-6 flex flex-col "
    >
      <AdminStatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      <div className="flex justify-between">
        <div className="flex flex-col gap-4 text-darkBlue">
          <span className="font-medium text-6xl -tracking-widest">
            Frequently <br />
            asked Questions
          </span>
          {/* <span className="tracking-tighter">
            Still Need help? Click the button below
          </span>
          <button className="bg-primary w-fit hover:bg-transparent border mt-5 text-sm text-white md:px-7 px-4 md:py-3.5 py-2 hover:text-primary rounded-lg border-primary transition-all ease-in-out duration-300">
            I have a Question
          </button> */}
          <img src={faq} alt="faq" className="w-full" />
        </div>
        <div className="flex flex-col gap-5 w-1/2">
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
              <Skeleton count={6} className="h-20 rounded-lg mb-5" />
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex flex-col gap-5 items-center mt-16 text-darkBlue">
        <span className="font-medium text-5xl mb-2 -tracking-[0.25rem] text-center leading-[3.5rem]">
          Ready to Kickstart Your IT Journey? <br /> Apply Now for the
          Internship Program!
        </span>
        <span>Click the button below to apply</span>
        <button className="bg-primary w-fit hover:bg-transparent border text-sm text-white md:px-7 px-4 md:py-3.5 py-2 hover:text-primary rounded-lg border-primary transition-all ease-in-out duration-300">
          Apply Now!
        </button>
      </div>
      {/* <FaqForm /> */}
    </motion.div>
  );
}

export default Faq;
