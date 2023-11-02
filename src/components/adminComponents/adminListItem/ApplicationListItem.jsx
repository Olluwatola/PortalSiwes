import { useState } from "react";
import {
  db
} from "../../../config/firebase";
import { Link } from "react-router-dom";

import { updateDoc, doc } from "firebase/firestore";

const ApplicationListItem = ({
  index,
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
    <li>
      <Link to={`/admin/applications/${application.id}`}>
        <span>{index}</span> |
        <span>
          {application.studentLastName} {application.studentOtherNames}
        </span>{" "}
        |<span>{application.durationOfInternship} Months</span> |
        <span>{application.studentCourse}</span> |
        <span>{application.studentPhoneNumber}</span> |
        <span>
          {application.isAccepted
            ? "Accepted"
            : application.isRejected
            ? "Rejected"
            : application.isReviewed
            ? "Under review"
            : "Not Reviewed"}
        </span>{" "}
      </Link>
      |
      {putUnderReviewIsLoading ? (
        "..."
      ) : (
        <button
          onClick={() => {
            handlePutApplicationUnderReview(application.id);
          }}
          disabled={application.isReviewed ? true : false}
        >
          Put Under Review
        </button>
      )}
      <hr />
    </li>
  );
};

export default ApplicationListItem;
