import React, { useState } from "react";
import Modal from "./InteractiveModal";
import CreateInvitation from "./../adminModalContents/CreateInvitation";

function InvitationModal({
  arrayOfApplication,
  isLoading,
  getApplicationsError,
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError,
  userObjectArray,
  isOpen,
  onClose,
}) {
  const [addParticipantToggle, setAddParticipantToggle] = useState(false);

  function handleAddParticipantToggle() {
    setAddParticipantToggle(!addParticipantToggle);
    //console.log('i don change o')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <CreateInvitation
        userObjectArray={userObjectArray}
        isOpen={isOpen}
        onRequestClose={onClose}
        handleAddParticipantToggle={handleAddParticipantToggle}
        addParticipantToggle={addParticipantToggle}
        arrayOfApplication={arrayOfApplication}
        isLoading={isLoading}
        getApplicationsError={getApplicationsError}
        setArrayOfApplication={setArrayOfApplication}
        setIsLoading={setIsLoading}
        returnedApplications={returnedApplications}
        setGetApplicationsError={setGetApplicationsError}
      />
    </Modal>
  );
}

export default InvitationModal;
