import ApplicationSelectItem from "./adminListItem/ApplicationSelectItem";
import NoInfoImg from "./../../assets/noInfo.svg";
import { placeToUnit } from "./../../controllers/placementControllers";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ApplicationSelect = ({
  arrayOfApplication,
  setArrayOfApplicantsToBePosted,
  arrayOfApplicantsToBePosted,
}) => {
  const { unit } = useParams();

  const [successMessage, setSuccessMessage] = useState(undefined);
  const [placingError, setPlacingError] = useState(undefined);

  return (
    <div className="flex flex-col gap-10">
      {arrayOfApplication.length > 0 && (
        <span className="text-neutral-500">
          Select Applicant(s) you want to place to {unit?.toUpperCase()}
        </span>
      )}
      {arrayOfApplication.length > 0 ? (
        arrayOfApplication.map((application, index) => (
          <ApplicationSelectItem
            index={index}
            application={application}
            arrayOfApplicantsToBePosted={arrayOfApplicantsToBePosted}
            setArrayOfApplicantsToBePosted={setArrayOfApplicantsToBePosted}
            key={application.id}
          />
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <img src={NoInfoImg} alt="No Info" className="w-52 h-52 mt-24" />
          <p className="text-neutral-400 text-lg mt-5">
            No applications available
          </p>
        </div>
      )}
      {arrayOfApplication.length > 0 && (
        <button
          disabled={arrayOfApplicantsToBePosted.length === 0}
          className={`bg-primary h-11 flex justify-center items-center w-80 rounded-lg text-white
            ${
              arrayOfApplicantsToBePosted.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }
            `}
          onClick={() => {
            placeToUnit(
              unit,
              arrayOfApplicantsToBePosted,
              setSuccessMessage,
              setPlacingError
            );
          }}
        >
          Place to {unit.toUpperCase()}
        </button>
      )}
      <br />
      {successMessage && <p>{successMessage}</p>}
      <br />
      {placingError && <p>{placingError}</p>}
    </div>
  );
};

export default ApplicationSelect;
