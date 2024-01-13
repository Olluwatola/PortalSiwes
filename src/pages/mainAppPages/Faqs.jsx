import { useState, useEffect } from "react";
import FaqForm from "./../../components/mainAppComponents/FaqForm";
import Accordion from "./../../components/mainAppComponents/Accordion";
import AdminStatusBar from "../../components/adminComponents/adminStatusBar/AdminStatusBar";
import { getFaqs } from "../../controllers/fetchMainAppDetails";
import { motion } from "framer-motion";

function Faq() {
  const [faqArray, setFaqArray] = useState([]);
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);

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
      <div className="flex flex-col gap-4 text-darkBlue">
        <span className="font-medium text-6xl -tracking-widest">
          Frequently <br />
          asked Questions
        </span>
        <span className="tracking-tighter">
          Still Need help? Click the button below
        </span>
      </div>
      {faqArray.map((faq, index) => (
        <Accordion key={index} question={faq.question} answer={faq.answer} />
      ))}
      <FaqForm />
    </motion.div>
  );
}

export default Faq;
