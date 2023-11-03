import { collection, getDocs } from "firebase/firestore";
import { db } from "./../config/firebase";

export const getFaqs = async (
  setFaqArray,
  setConditionGood,
  setStatusBarMessage
) => {
  try {
    const faqAskedQuestionRef = collection(db, "faqs");
    const data = await getDocs(faqAskedQuestionRef);
    const mappedFaqs = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFaqArray(mappedFaqs);
    console.log(mappedFaqs);
  } catch (error) {
    setConditionGood("error");
    setStatusBarMessage(`500 error, failed to fetch `);
  }
};
