import React, { useState } from "react";
import Modal from "./InteractiveModal";
import CreateInvitation from "./../adminModalContents/CreateInvitation";

function InvitationModal({ userObjectArray, isOpen, onClose }) {
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
      />
    </Modal>
  );
}

export default InvitationModal;
