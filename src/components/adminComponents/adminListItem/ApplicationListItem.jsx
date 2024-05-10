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
  showStatusState,
  showNumberState,
}) => {
  const [putUnderReviewIsLoading, setPutUnderReviewIsLoading] = useState(false);
  const [showStatus, setShowStatus] = useState(showStatusState);
  const [showNumber, setShowNumber] = useState(showNumberState);

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
      return "bg-green-300 text-green-800";
    } else if (isRejected) {
      return "bg-red-400 text-white";
    } else if (isReviewed) {
      return "bg-primary text-white";
    } else if (hasWrittenApplicationTest && placedTo === "yetToBePlaced") {
      return "bg-amber-500 bg-opacity-70 text-lime-950";
    } else if (!isReviewed) {
      return "bg-blue-500 text-white";
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
      return "Approved";
    } else if (isRejected) {
      return "Declined";
    } else if (isReviewed) {
      return "Under Review";
    } else if (hasWrittenApplicationTest && placedTo === "yetToBePlaced") {
      return "Pending";
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
      <span className="w-4 text-neutral-500">{index + 1}.</span>
      <span className="w-52">
        {application.studentLastName} {application.studentOtherNames}
      </span>{" "}
      <span className="w-64">{application.studentEmail}</span>
      <span className="w-32">{application.durationOfInternship}</span>{" "}
      <span className="w-36">{application.studentCourse}</span>
      <span
        className={`      ${
          showStatus || showNumber ? "block" : "hidden"
        } w-36`}
      >
        {application.studentPhoneNumber}
      </span>
      <div
        className={`
      ${showStatus ? "block" : "hidden"}
      flex items-center justify-start w-40
      `}
      >
        <span
          className={`px-4 py-1.5 rounded-lg text-center ${getStatusColor()}`}
        >
          {getStatusText()}
        </span>
      </div>
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
