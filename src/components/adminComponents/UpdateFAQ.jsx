import { useEffect, useState } from "react";
import { getFaqs } from "./../../controllers/fetchMainAppDetails";
import UpdateFAQListItem from "./adminListItem/UpdateFAQListItem";
import CreateFAQ from "./CreateFAQ";

const UpdateFAQ = ({ setConditionGood, setStatusBarMessage }) => {
  const [faqArray, setFaqArray] = useState(null);

  useEffect(() => {
    getFaqs(setFaqArray, setConditionGood, setStatusBarMessage);
    //   return () => {
    //     second
    //   }
  }, []);
  return (
    <>
      {faqArray?.map((item) => (
        <>
          <UpdateFAQListItem
            setConditionGood={setConditionGood}
            setStatusBarMessage={setStatusBarMessage}
            FAQDoc={item}
            key={item.id}
            faqArray={faqArray}
            setFaqArray={setFaqArray}
          />
          <br />
        </>
      ))}
      <CreateFAQ
        faqArray={faqArray}
        setFaqArray={setFaqArray}
        setConditionGood={setConditionGood}
        setStatusBarMessage={setStatusBarMessage}
      />
    </>
  );
};

export default UpdateFAQ;
