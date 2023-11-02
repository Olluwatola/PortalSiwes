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
    // return () => {
    //   second;
    // };
  }, [application, arrayOfApplicantsToBePosted]);

  function handleAddOrRemoveItems(applicant) {
    if (!objectExistsInArray) {
      setArrayOfApplicantsToBePosted((arrayOfApplicantsToBePosted) => [
        ...arrayOfApplicantsToBePosted,
        applicant,
      ]);
      console.log(arrayOfApplicantsToBePosted);
    } else {
      setArrayOfApplicantsToBePosted((arrayOfApplicantsToBePosted) =>
        arrayOfApplicantsToBePosted.filter(
          (applicantObject) => applicantObject.id !== applicant.id
        )
      );
      console.log(arrayOfApplicantsToBePosted);
    }
  }
  return (
    <>
      <input
        type="checkbox"
        checked={objectExistsInArray}
        onChange={() => {
          handleAddOrRemoveItems(application);
        }}
      />
      <span>
        {application.studentLastName} {application.studentOtherNames}
      </span>
      <br />
      <hr />
      <br />
    </>
  );
};

export default ApplicationSelectItem;
