import {
  approveTestimonial,
  unapproveTestimonial,
  deleteTestimony
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
    <>
      <b>{testimony?.quote}</b> | {testimony?.testifier} |{" "}
      {testimony?.testifierRole} |
      <button
        onClick={handleApprove}
        disabled={testimony.hasBeenDisplayApproved}
      >
        approve
      </button>{" "}
      |
      <button
        onClick={handleUnapprove}
        disabled={testimony.hasBeenDisplayApproved === false}
      >
        unapprove
      </button>{" "}
      |<button onClick={handleDeleteTestimony}>delete</button>
    </>
  );
};

export default TestimonialsListItem;
