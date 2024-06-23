import { useState } from "react";
import { updateFAQ, deleteFaq } from "./../../../controllers/UIUpdateControllers";
import { FiEdit, FiTrash2, FiUpload } from "react-icons/fi"; // Import icons from react-icons library

const UpdateFAQListItem = ({
  FAQDoc,
  setConditionGood,
  setStatusBarMessage,
  faqArray,
  setFaqArray,
}) => {
  const [faqQuestion, setFaqQuestion] = useState(FAQDoc.question);
  const [faqAnswer, setFaqAnswer] = useState(FAQDoc.answer);

  async function handleOnUpdateFAQ(e) {
    e.preventDefault();
    await updateFAQ(FAQDoc.id, setConditionGood, setStatusBarMessage, faqQuestion, faqAnswer);
  }

  async function handleDeleteFaq() {
    await deleteFaq(FAQDoc.id, setConditionGood, setStatusBarMessage, faqArray, setFaqArray);
  }

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleOnUpdateFAQ}>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Question</label>
          <input
            className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-emerald-500 outline-none"
            value={faqQuestion}
            onChange={(e) => {
              setFaqQuestion(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Answer</label>
          <input
            className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-emerald-500 outline-none"
            value={faqAnswer}
            onChange={(e) => {
              setFaqAnswer(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-2 w-1/2 mt-2">
          <button
            type="submit"
            className="flex w-12 h-12 items-center justify-center bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 hover:border-emerald-500 border border-emerald-500 rounded-lg text-sm transition-all duration-300 ease-in-out"
          >
            <FiUpload className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handleDeleteFaq}
            className="flex w-12 h-12 items-center justify-center bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border-red-500 border border-red-500 rounded-lg text-sm transition-all duration-300 ease-in-out"
          >
            <FiTrash2 className="w-5 h-5" />
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateFAQListItem;
