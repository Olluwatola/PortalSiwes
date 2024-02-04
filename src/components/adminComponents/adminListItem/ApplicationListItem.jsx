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

  const getStatusColor = () => {
    const {
      isAccepted,
      isRejected,
      isReviewed,
      placedTo,
      hasWrittenApplicationTest,
    } = application;
    if (isAccepted) {
      return "bg-green-500";
    } else if (isRejected) {
      return "bg-red-500";
    } else if (isReviewed) {
      return "bg-teal-500";
    } else if (hasWrittenApplicationTest && placedTo === "yetToBePlaced") {
      return "bg-gray-500";
    } else if (!isReviewed) {
      return "bg-indigo-600";
    }

    return "bg-gray-500";
  };

  const getStatusText = () => {
    const {
      isAccepted,
      isRejected,
      isReviewed,
      placedTo,
      hasWrittenApplicationTest,
    } = application;

    if (isAccepted) {
      return "Accepted";
    } else if (isRejected) {
      return "Rejected";
    } else if (isReviewed) {
      return "Reviewed";
    } else if (hasWrittenApplicationTest && placedTo === "yetToBePlaced") {
      return "Yet to be Placed";
    } else if (!isReviewed) {
      return "Not Reviewed";
    }

    return "Unknown Status"; // Default text if none of the conditions match
  };

  return (
    <Link
      className={`${index === lastIndex ? "" : "border-b border-neutral-200"}
       text-neutral-800 text-sm w-full items-center flex justify-between py-5`}
      to={`/admin/applications/${application.id}`}
    >
      <span className="w-4 bg- text-neutral-500">{index + 1}.</span>
      <span className="w-40 bg-cyan-100">
        {application.studentLastName} {application.studentOtherNames}
      </span>{" "}
      <span className="w-64 bg-fuchsia-500">{application.studentEmail}</span>
      <span className="w-32 bg-red-400">
        {application.durationOfInternship} Months
      </span>{" "}
      <span className="w-32 bg-yellow-200">{application.studentCourse}</span>
      <span className="w-36 bg-yellow-300">
        {application.studentPhoneNumber}
      </span>
      <span className={`w-32 ${getStatusColor()}`}>{getStatusText()}</span>
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
