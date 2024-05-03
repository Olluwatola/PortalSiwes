import { useEffect, useState } from "react";
import CheckboxItem from "./CheckboxItem";

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
    <CheckboxItem
      label={`${application.studentLastName} ${application.studentOtherNames}`}
      checked={objectExistsInArray}
      onChange={() => handleAddOrRemoveItems(application)}
    />
  );
};

export default ApplicationSelectItem;
