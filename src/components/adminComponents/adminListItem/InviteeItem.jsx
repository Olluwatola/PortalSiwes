import { useState,useEffect } from "react";

function InviteeItem({ application,invitees,setInvitees }) {
    const [objectExistsInArray, setObjectExistsInArray] = useState(false);

    useEffect(() => {
      function checkExisting(invitee) {
        console.log(`checking check`)
        console.log(invitees)
        console.log(invitee)
        const existingObject = invitees.find((obj) => obj.id === invitee.id);
        console.log(existingObject)
        console.log(existingObject !== undefined)
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
  }

export default InviteeItem;
