import { useEffect, useState } from "react";

const ApplicationSelectItem = ({
  application,
  setArrayOfApplicantsToBePosted,
  arrayOfApplicantsToBePosted,
}) => {
  const [objectExistsInArray, setObjectExistsInArray] = useState(false);

  useEffect(() => {
    function checkExisting(applicant) {
      const existingObject = arrayOfApplicantsToBePosted?.find(
        (obj) => obj.id === applicant?.id
      );
      setObjectExistsInArray(existingObject !== undefined);
    }

    checkExisting(application);
  }, [application, arrayOfApplicantsToBePosted]);

  function handleAddOrRemoveItems(applicant) {
    if (!objectExistsInArray) {
      setArrayOfApplicantsToBePosted((arrayOfApplicantsToBePosted) => [
        ...arrayOfApplicantsToBePosted,
        applicant,
      ]);
    } else {
      setArrayOfApplicantsToBePosted((arrayOfApplicantsToBePosted) =>
        arrayOfApplicantsToBePosted.filter(
          (applicantObject) => applicantObject.id !== applicant.id
        )
      );
    }
  }

  return (
    <div
      className={`flex items-center gap-5 border-b border-neutral-200 pb-3 cursor-pointer ${
        objectExistsInArray ? "text-black" : "text-neutral-500"
      }`}
      onClick={() => handleAddOrRemoveItems(application)}
    >
      <div
        className={`w-5 h-5 flex items-center justify-center border rounded-full p-[0.21rem] cursor-pointer
        ${objectExistsInArray ? "border-primary/40" : "border-neutral-300"}
        `}
        onClick={() => {
          handleAddOrRemoveItems(application);
        }}
      >
        {objectExistsInArray ? (
          <div className="w-full h-full bg-primary rounded-full"></div>
        ) : null}
      </div>
      <span>
        {application.studentLastName} {application.studentOtherNames}
      </span>
    </div>
  );
};

export default ApplicationSelectItem;
