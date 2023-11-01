import { useState, useEffect } from "react";
import { db } from "./../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import FaqForm from "./../../components/mainAppComponents/FaqForm";
import Accordion from "./../../components/mainAppComponents/Accordion";

function Faq() {
  const [faqArray, setFaqArray] = useState([]);

  const getFaqs = async () => {
    try {
      const faqAskedQuestionRef = collection(db, "faqs");
      const data = await getDocs(faqAskedQuestionRef);
      const mappedFaqs = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFaqArray(mappedFaqs);
      console.log(mappedFaqs)
    } catch (error) {}
  };

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <>
      {faqArray.map((faq, index) => (
        <Accordion key={index} question={faq.question} answer={faq.answer} />
      ))}
      <FaqForm />
    </>
  );
}

export default Faq;
