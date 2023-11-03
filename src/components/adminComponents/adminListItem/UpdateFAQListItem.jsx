import { useState } from "react";
import {
  updateFAQ,
  deleteFaq,
} from "./../../../controllers/UIUpdateControllers";

const UpdateFAQListItem = ({
  FAQDoc,
  setConditionGood,
  setStatusBarMessage,
  faqArray,
  setFaqArray
}) => {
  const [faqQuestion, setFaqQuestion] = useState(FAQDoc.question);
  const [faqAnswer, setFaqQAnswer] = useState(FAQDoc.answer);

  async function handleOnUpdateFAQ(e) {
    e.preventDefault();
    await updateFAQ(
      FAQDoc.id,
      setConditionGood,
      setStatusBarMessage,
      faqQuestion,
      faqAnswer
    );
  }

  async function handleDeleteFaq() {
    await deleteFaq(FAQDoc.id, setConditionGood, setStatusBarMessage,faqArray,setFaqArray);
  }
  return (
    <>
      <form onSubmit={handleOnUpdateFAQ}>
        Question:
        <input
          value={faqQuestion}
          onChange={(e) => {
            setFaqQuestion(e.target.value);
          }}
        />
        Answer:
        <input
          value={faqAnswer}
          onChange={(e) => {
            setFaqQAnswer(e.target.value);
          }}
        />
        <button type="submit">Update</button>
      </form>
      <button onClick={handleDeleteFaq}>Delete</button>
    </>
  );
};

export default UpdateFAQListItem;
