import { useState, useEffect } from "react";
import CheckboxItem from "./CheckboxItem"; // Import the CheckboxItem component

function InviteeItem({ application, invitees, setInvitees }) {
  const [objectExistsInArray, setObjectExistsInArray] = useState(false);

  useEffect(() => {
    function checkExisting(invitee) {
      const existingObject = invitees.find((obj) => obj.id === invitee.id);
      setObjectExistsInArray(existingObject !== undefined);
    }
    checkExisting(application);
  }, [application, invitees]);

  function handleAddOrRemoveItems(invitee) {
    if (!objectExistsInArray) {
      setInvitees((invitees) => [...invitees, invitee]);
    } else {
      setInvitees((invitees) =>
        invitees.filter((inviteeObject) => inviteeObject.id !== invitee.id)
      );
    }
  }

  return (
    <>
      <CheckboxItem
        label={`${application.studentLastName} ${application.studentOtherNames}`}
        checked={objectExistsInArray}
        onChange={() => handleAddOrRemoveItems(application)}
        size={4}
      />
    </>
  );
}

export default InviteeItem;
