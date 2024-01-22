import { useState } from "react";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";

import { updateDoc, doc } from "firebase/firestore";

const ApplicationListItem = ({
  index,
  lastIndex,
  application,
  arrayOfApplication,
  setArrayOfApplication,
}) => {
  const [putUnderReviewIsLoading, setPutUnderReviewIsLoading] = useState(false);

  function removeObjectById(arr, idToRemove) {
    // Use the filter method to create a new array with objects that do not have the specified ID.
    const filteredArray = arr?.filter((obj) => obj.id !== idToRemove);

    return filteredArray;
  }

  async function handlePutApplicationUnderReview(id) {
    const applicationDocumentRef = doc(db, "studentApplication", id);
    try {
      setPutUnderReviewIsLoading(true);
      await updateDoc(applicationDocumentRef, {
        isReviewed: true,
      }).then(() => {
        const filteredArray = removeObjectById(
          arrayOfApplication,
          application.id
        );
        setArrayOfApplication(filteredArray);
      });

      setPutUnderReviewIsLoading(false);
    } catch (error) {
      console.log(error);
      setPutUnderReviewIsLoading(false);
    } finally {
      setPutUnderReviewIsLoading(false);
    }
  }
  return (
    <Link
      className={`${
        index === lastIndex ? "" : "border-b border-neutral-200"
      } text-neutral-800 text-sm w-full items-center flex justify-between py-5`}
      to={`/admin/applications/${application.id}`}
    >
      <span className="w-4 text-neutral-500">{index + 1}.</span>
      <span className="w-36">
        {application.studentLastName} {application.studentOtherNames}
      </span>
      <span className="w-36">{application.studentPhoneNumber}</span>
      <span className="w-32">{application.durationOfInternship} Months</span>
      <span className="w-32">{application.studentCourse}</span>
    </Link>
    // <span>
    //   {application.isAccepted
    //     ? "Accepted"
    //     : application.isRejected
    //     ? "Rejected"
    //     : application.isReviewed
    //     ? "Under review"
    //     : "Not Reviewed"}
    // </span>

    //  {putUnderReviewIsLoading ? (
    //   "..."
    // ) : (
    //   <button
    //     onClick={() => {
    //       handlePutApplicationUnderReview(application.id);
    //     }}
    //     disabled={application.isReviewed ? true : false}
    //   >
    //     Put Under Review
    //   </button>
    // )}
  );
};

export default ApplicationListItem;
