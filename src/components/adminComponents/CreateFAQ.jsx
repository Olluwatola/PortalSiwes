import { useState } from "react";
import { createNewFAQ } from "./../../controllers/UIUpdateControllers";

const CreateFAQ = ({
  faqArray,
  setFaqArray,
  setConditionGood,
  setStatusBarMessage,
}) => {
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  async function handleCreateNewFAQ(e) {
    e.preventDefault();
    await createNewFAQ(
      newQuestion,
      newAnswer,
      setConditionGood,
      setStatusBarMessage,
      faqArray,
      setFaqArray
    );
    setNewQuestion("");
    setNewAnswer("");
  }

  return (
    <>
      <form onSubmit={handleCreateNewFAQ}>
        <input
          value={newQuestion}
          onChange={(e) => {
            setNewQuestion(e.target.value);
          }}
        />
        <input
          value={newAnswer}
          onChange={(e) => {
            setNewAnswer(e.target.value);
          }}
        />
        <button
          className="bg-primary w-fit  text-white  hover:bg-white hover:text-primary hover:border-primary border border-primary px-4 py-3 rounded-lg text-sm transition-all duration-300 ease-in-out mt-5"
          type="submit"
        >
          Create new FAQ
        </button>
      </form>
    </>
  );
};

export default CreateFAQ;
