import { FiTrash2 } from "react-icons/fi";
import {
  approveTestimonial,
  unapproveTestimonial,
  deleteTestimony,
} from "./../../../controllers/testimonialControllers";

const TestimonialsListItem = ({
  returnedTestimonials,
  setReturnedTestimonials,
  index,
  testimony,
  setConditionGood,
  setStatusBarMessage,
}) => {
  async function handleApprove() {
    await approveTestimonial(
      index,
      testimony.id,
      setConditionGood,
      setStatusBarMessage,
      returnedTestimonials,
      setReturnedTestimonials
    );
  }

  async function handleUnapprove() {
    await unapproveTestimonial(
      index,
      testimony.id,
      setConditionGood,
      setStatusBarMessage,
      returnedTestimonials,
      setReturnedTestimonials
    );
  }

  async function handleDeleteTestimony() {
    await deleteTestimony(
      index,
      testimony.id,
      setConditionGood,
      setStatusBarMessage,
      returnedTestimonials,
      setReturnedTestimonials
    );
  }

  return (
    <div className="border border-gray-300 rounded-lg p-4 mb-4 flex flex-col">
      <span>{testimony?.quote}</span>
      <span className="text-sm text-neutral-600">
        {testimony?.testifier} | {testimony?.testifierRole}
      </span>
      <div className="mt-2 flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg bg-green-500 text-white text-sm focus:outline-none ${
            testimony.hasBeenDisplayApproved
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600"
          } transition-all duration-200 ease-in-out`}
          onClick={handleApprove}
          disabled={testimony.hasBeenDisplayApproved}
        >
          Approve
        </button>
        <button
          className={`px-4 py-2 rounded-lg bg-red-500 text-white text-sm focus:outline-none ${
            testimony.hasBeenDisplayApproved === false
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-400"
          } transition-all duration-200 ease-in-out`}
          onClick={handleUnapprove}
          disabled={testimony.hasBeenDisplayApproved === false}
        >
          Unapprove
        </button>
        <button
          className="px-3 rounded-lg bg-red-500 text-white text-sm focus:outline-none hover:bg-red-600"
          onClick={handleDeleteTestimony}
        >
          <FiTrash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialsListItem;
